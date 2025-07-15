# 🔐 Environment Variables for Stripe Integration

## Required Environment Variables

### Backend (server/.env)
```
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-connection-string

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id_here

# Frontend URL (for payment redirects)
CLIENT_URL=https://www.fixloapp.com

# Optional: For development
NODE_ENV=development
```

## Setting Up Stripe

### 1. Create Stripe Account
- Go to https://dashboard.stripe.com/register
- Complete business verification
- Get your API keys from the Developers section

### 2. Create Product and Pricing
1. Go to Products in Stripe Dashboard
2. Create a new product called "Fixlo Professional Monthly"
3. Set price to $29.99/month (or your desired amount)
4. Copy the Price ID (starts with `price_`)

### 3. Create Webhook Endpoint
1. Go to Developers > Webhooks in Stripe Dashboard
2. Add endpoint: `https://fixloapp.onrender.com/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the webhook secret (starts with `whsec_`)

### 4. Set Environment Variables in Render
1. Go to your Render dashboard
2. Select your backend service
3. Go to Environment tab
4. Add the variables above

## Testing Stripe Integration

### Test Credit Card Numbers
```
# Visa (Success)
4242 4242 4242 4242

# Visa (Declined)
4000 0000 0000 0002

# Mastercard (Success)
5555 5555 5555 4444

# American Express (Success)
3782 8224 6310 005
```

### Test Expiry and CVC
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3-digit number (e.g., 123)
- ZIP: Any 5-digit number (e.g., 12345)

## Payment Flow
1. User fills out professional signup form
2. Backend creates professional record (inactive)
3. Backend creates Stripe checkout session
4. User redirected to Stripe payment page
5. User completes payment
6. Stripe webhook activates professional account
7. User redirected to success page

## Troubleshooting

### Common Issues
1. **Webhook not firing**: Check webhook endpoint URL and events
2. **Payment fails**: Verify API keys and price ID
3. **Redirect fails**: Check CLIENT_URL environment variable
4. **Professional not activated**: Check webhook secret and endpoint

### Debug Logs
- Backend logs all Stripe operations with emojis
- Check Render logs for webhook events
- Check Stripe dashboard for payment status

## Security Notes
- Never expose secret keys in frontend code
- Use webhook secrets to verify webhook authenticity
- Store customer data securely in MongoDB
- Implement proper error handling for failed payments
