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
  const priceId = process.env.STRIPE_PRICE_ID || process.env.STRIPE_MONTHLY_PRICE_ID;
  
  res.json({
    stripeConfigured: !!stripe,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasPriceId: !!process.env.STRIPE_PRICE_ID,
    hasMonthlyPriceId: !!process.env.STRIPE_MONTHLY_PRICE_ID,
    hasClientUrl: !!process.env.CLIENT_URL,
    resolvedPriceId: priceId ? priceId.substring(0, 8) + '...' : 'none',
    clientUrl: process.env.CLIENT_URL,
    version: "3.3-debug-deployment",
    timestamp: new Date().toISOString()
  });
});

router.post("/create-checkout-session", async (req, res) => {
  if (!stripe) return res.status(503).json({ error: "Stripe not configured" });

  // Support both price ID and product ID for flexibility
  const priceId = process.env.STRIPE_PRICE_ID || process.env.STRIPE_MONTHLY_PRICE_ID;
  const productId = process.env.STRIPE_PRODUCT_ID; // prod_SaAyX0rd1VWGE0
  
  if (!priceId && !productId) {
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Missing STRIPE_PRICE_ID, STRIPE_MONTHLY_PRICE_ID, or STRIPE_PRODUCT_ID' 
    });
  }
  if (!process.env.CLIENT_URL) {
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Missing CLIENT_URL' 
    });
  }

  try {
    let lineItems;
    
    if (priceId) {
      // Use existing price ID
      lineItems = [{ price: priceId, quantity: 1 }];
    } else {
      // Create price data dynamically from product ID
      lineItems = [{
        price_data: {
          currency: 'usd',
          product: productId,
          unit_amount: 5999, // $59.99 in cents
          recurring: { interval: 'month' }
        },
        quantity: 1
      }];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe subscription error:", err);
    res.status(500).json({ error: "Stripe subscription creation failed", details: err.message });
  }
});

module.exports = router;
