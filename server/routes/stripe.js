const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

let stripe = null;
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY not found - Stripe features disabled');
} else {
  try {
    stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    console.log('✅ Stripe initialized');
  } catch (err) {
    console.error('❌ Stripe init error:', err.message);
  }
}

router.get("/health", (req, res) => {
  res.json({
    stripeConfigured: !!stripe,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasPriceId: !!process.env.STRIPE_PRICE_ID,
    hasClientUrl: !!process.env.CLIENT_URL
  });
});

router.post("/create-checkout-session", async (req, res) => {
  if (!stripe) return res.status(503).json({ error: "Stripe not configured" });

  if (!process.env.STRIPE_PRICE_ID) {
    return res.status(500).json({ error: 'Payment configuration error', message: 'Missing STRIPE_PRICE_ID' });
  }
  if (!process.env.CLIENT_URL) {
    return res.status(500).json({ error: 'Payment configuration error', message: 'Missing CLIENT_URL' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe subscription error:", err);
    res.status(500).json({ error: "Stripe subscription creation failed" });
  }
});

module.exports = router;
