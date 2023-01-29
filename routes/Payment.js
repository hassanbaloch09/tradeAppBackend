import express from "express";
import Stripe from "stripe";

const router = express.Router();

const PUBLISHABLE_KEY =
  "pk_test_51Jyiv3A35MqmL7JoKn74Emihnpv3885uOTuNdyRcb7GdInyUeYTwdYSkPINrCi9rDGRb0kICvTxBaJNk5VSbYq0S00awq9kMoq";
const SECRET_KEY =
  "sk_test_51Jyiv3A35MqmL7JolflhCLbd9nDh4kA4Updr7XLEjohZNu6qmM1rvJmXQiABFIvKDFvYe8ZLuzU05bif1C4QDu6w00P6U9fsDT";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

router.post("/create-payment-intent", async (req, res) => {
  try {
    let data = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data?.amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent;
    res.send({ clientSecret: clientSecret });
    res.end();
  } catch (e) {
    console.log(e.message);
    res.send({ error: e.message });
    res.end();
  }
});

router.get("/retrievePayment/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.send({ data: paymentIntent });
    res.end();
  } catch (e) {
    console.log(e.message);
    res.send({ error: e.message });
    res.end();
  }
});

export default router;
