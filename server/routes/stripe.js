const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-subscription', async (req, res) => {
  try {
    const { email, paymentMethodId, priceId } = req.body;

    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.send(subscription);
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
