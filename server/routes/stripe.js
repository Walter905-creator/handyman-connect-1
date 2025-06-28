// server/routes/stripe.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// Initialize Stripe
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

// ✅ Stripe Health Check
router.get("/health", (req, res) => {
  res.json({
    stripeConfigured: !!stripe,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasFirstMonthPriceId: !!process.env.STRIPE_FIRST_MONTH_PRICE_ID,
    hasMonthlyPriceId: !!process.env.STRIPE_MONTHLY_PRICE_ID,
    hasClientUrl: !!process.env.CLIENT_URL,
    secretKeyStart: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 7) + '...' : 'none'
  });
});

// ✅ Main Checkout - First Month + Monthly Subscription
router.post("/create-checkout-session", async (req, res) => {
  if (!stripe) return res.status(503).json({ error: "Stripe not configured" });

  const requiredVars = [
    'STRIPE_FIRST_MONTH_PRICE_ID',
    'STRIPE_MONTHLY_PRICE_ID',
    'CLIENT_URL'
  ];

  for (let v of requiredVars) {
    if (!process.env[v]) {
      console.error(`❌ Missing env var: ${v}`);
      return res.status(500).json({ error: `Missing ${v}` });
    }
  }

  try {
    console.log('✅ Creating subscription checkout session...');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        { price: process.env.STRIPE_FIRST_MONTH_PRICE_ID, quantity: 1 },
        { price: process.env.STRIPE_MONTHLY_PRICE_ID, quantity: 1 }
      ],
      subscription_data: {
        billing_cycle_anchor: 'now',
        proration_behavior: 'none'
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log('✅ Stripe session created:', session.id);
    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe subscription error:", err);
    res.status(500).json({ error: "Stripe subscription creation failed" });
  }
});

// ✅ Simple One-Time Payment Fallback
router.post("/create-payment-session", async (req, res) => {
  if (!stripe) return res.status(503).json({ error: "Stripe not configured" });

  try {
    console.log('✅ Creating simple one-time payment session...');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Handyman Connect Pro Membership' },
            unit_amount: 2900, // $29.00 in cents
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ One-time payment error:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
