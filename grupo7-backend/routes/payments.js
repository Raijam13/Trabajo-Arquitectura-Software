const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency } = req.body; // Recibes el monto y la moneda desde el frontend
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Monto en la moneda mínima (por ejemplo, centavos para USD)
        currency,
        payment_method_types: ['card'], // Métodos de pago habilitados
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  