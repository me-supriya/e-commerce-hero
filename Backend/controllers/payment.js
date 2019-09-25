const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config();

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

exports.processPayment = (req, res) => {
  const razorPayId = req.body.razorpay_payment_id;
  const currentCharges = Math.round(req.body.amount * 100);

  instance.payments
    .capture(razorPayId, currentCharges)

    .then(captureResponse => {
      if (captureResponse.status === "captured") {
        console.log(`Payment #${captureResponse.id} Captured`);
      }
    })

    .catch(error => {
      console.log(`Error capturing payment #${razorPayId}`);
      console.log(error);
      res.status(400).json({
        success: false,
        message: `Order Failed. Error processing payment #${razorPayId}`,
        error
      });
    });
};
