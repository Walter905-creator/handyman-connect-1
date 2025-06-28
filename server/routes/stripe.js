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

// Health check endpoint for Stripe configuration
router.get("/health", (req, res) => {
  res.json({
    stripeConfigured: !!stripe,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasMonthlyPriceId: !!process.env.STRIPE_MONTHLY_PRICE_ID,
    hasClientUrl: !!process.env.CLIENT_URL,
    secretKeyPrefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 7) + '...' : 'none'
  });
});

router.post("/create-checkout-session", async (req, res) => {
  // Check if Stripe is configured
  if (!stripe) {
    return res.status(503).json({ 
      error: 'Payment service unavailable', 
      message: 'Stripe not configured' 
    });
  }

  // Validate required environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Stripe secret key not configured' 
    });
  }

  if (!process.env.STRIPE_MONTHLY_PRICE_ID) {
    console.error('❌ Missing STRIPE_MONTHLY_PRICE_ID');
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Stripe price ID not configured' 
    });
  }

  if (!process.env.CLIENT_URL) {
    console.error('❌ Missing CLIENT_URL');
    return res.status(500).json({ 
      error: 'Payment configuration error', 
      message: 'Client URL not configured' 
    });
  }

  try {
    console.log('🔄 Creating Stripe checkout session...');
    console.log('Price ID:', process.env.STRIPE_MONTHLY_PRICE_ID);
    console.log('Client URL:', process.env.CLIENT_URL);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        }
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log('✅ Stripe checkout session created:', session.id);
    res.json({ url: session.url, sessionId: session.id });
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

// Simple one-time payment as fallback
router.post("/create-payment-session", async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ 
      error: 'Payment service unavailable', 
      message: 'Stripe not configured' 
    });
  }

  try {
    console.log('🔄 Creating simple payment session...');
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Handyman Connect Pro Membership',
              description: 'Monthly access to handyman professional features'
            },
            unit_amount: 2900, // $29.00 in cents
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log('✅ Payment session created:', session.id);
    res.json({ url: session.url, sessionId: session.id });
    
  } catch (err) {
    console.error("❌ Payment session error:", err.message);
    res.status(500).json({ 
      error: 'Payment processing failed',
      message: err.message
    });
  }
});

module.exports = router;
