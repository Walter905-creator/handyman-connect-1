const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// Initialize Stripe with validation
let stripe = null;
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY not found - payment features will be disabled');
} else {
  try {
    stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    console.log('✅ Stripe client initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Stripe:', err.message);
  }
}

router.post("/create-checkout-session", async (req, res) => {
  // Check if Stripe is configured
  if (!stripe) {
    return res.status(503).json({ 
      error: 'Payment service unavailable', 
      message: 'Stripe not configured' 
    });
  }

  // Validate required environment variables
  if (!process.env.STRIPE_FIRST_MONTH_PRICE_ID || !process.env.STRIPE_MONTHLY_PRICE_ID || !process.env.CLIENT_URL) {
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Missing required Stripe or client configuration' 
    });
  }

  try {
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "subscription",
  line_items: [
    {
      price: process.env.STRIPE_FIRST_MONTH_PRICE_ID,
      quantity: 1,
    },
    {
      price: process.env.STRIPE_MONTHLY_PRICE_ID,
      quantity: 1,
    }
  ],
  subscription_data: {
    trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
    billing_cycle_anchor: 'now',
    proration_behavior: 'none'
  },
  success_url: `${process.env.CLIENT_URL}/success`,
  cancel_url: `${process.env.CLIENT_URL}/cancel`,
});

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error details:", {
      message: err.message,
      type: err.type,
      code: err.code,
      statusCode: err.statusCode
    });
    
    // Handle specific Stripe errors
    if (err.type === 'StripeInvalidRequestError') {
      res.status(400).json({ 
        error: 'Invalid payment request',
        message: 'Payment configuration error'
      });
    } else if (err.type === 'StripeAuthenticationError') {
      res.status(500).json({ 
        error: 'Payment service authentication failed',
        message: 'Invalid Stripe API key'
      });
    } else {
      res.status(500).json({ 
        error: 'Payment processing failed',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      });
    }
  }
});

module.exports = router;
