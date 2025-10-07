const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
//it prevents an expected cost for a repetitive function excuted
setGlobalOptions({ maxInstances: 10 });
//import important module
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//set express
const app = express();
//cors for sharing
app.use(cors({ origin: true }));
app.use(express.json());
//test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully loaded!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    // console.log("payment received", total);
    // res.send(total)

    //create payment intention
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // console.log(paymentIntent);
    // res.status(201).send(paymentIntent)

    //     res.set("Access-Control-Allow-Origin", "*");
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res
      .status(403)
      .json({ message: "Total payment must be greater than zero" });
  }
});

//app treated by firebase
exports.api = onRequest(app);
