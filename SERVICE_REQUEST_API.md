# Fixlo Service Request Workflow API Documentation

## Overview

This implementation adds a complete service request workflow to the Fixlo app, enabling customers to submit service requests that are automatically matched with nearby professionals and notifications sent via SMS.

## Core Features

### 1. Service Request Management
- Complete tracking from submission to completion
- Automatic professional matching within 30-mile radius
- SMS notifications to professionals and customers
- Status tracking (pending → assigned → in_progress → completed)

### 2. Professional Dashboard
- View available job opportunities
- Accept/decline job requests
- Update job status and progress
- Track earnings and ratings

### 3. SMS Notification System
- Automated notifications to professionals about new jobs
- Customer confirmations and updates
- Job assignment notifications
- Configurable notification preferences

## API Endpoints

### Service Request Endpoints

#### Submit Service Request
```http
POST /api/requests
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com", // optional
  "customerPhone": "555-123-4567",
  "serviceType": "plumbing", // see supported types below
  "description": "Kitchen sink is leaking",
  "address": "123 Main St, New York, NY",
  "priority": "medium", // low, medium, high, urgent
  "preferredSchedule": {
    "date": "2025-01-20",
    "timeSlot": "morning" // morning, afternoon, evening
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service request submitted successfully! We've notified 3 professionals in your area.",
  "data": {
    "requestId": "64f8a12b...",
    "customerName": "John Doe",
    "serviceType": "plumbing",
    "location": "123 Main St, New York, NY 10001",
    "status": "pending",
    "matchedProfessionals": 3,
    "notificationsSent": 3
  }
}
```

#### List Service Requests
```http
GET /api/requests?status=pending&serviceType=plumbing&page=1&limit=20
```

#### Get Specific Request
```http
GET /api/requests/:requestId
```

#### Update Request Status
```http
PUT /api/requests/:requestId/status
Content-Type: application/json

{
  "status": "completed",
  "professionalResponse": "accepted", // for professional responses
  "professionalId": "64f8a12b..." // required with professionalResponse
}
```

### Professional Dashboard Endpoints

#### Get Dashboard Data
```http
GET /api/pro/dashboard/:professionalId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "professional": {
      "id": "64f8a12b...",
      "name": "John Smith",
      "trade": "plumbing",
      "rating": 4.8,
      "completedJobs": 45
    },
    "stats": {
      "pendingOpportunities": 5,
      "activeJobs": 2,
      "completedJobs": 45,
      "totalEarnings": 15600,
      "averageRating": "4.8"
    },
    "pendingRequests": [...],
    "assignedRequests": [...],
    "completedRequests": [...]
  }
}
```

#### Respond to Job Opportunity
```http
POST /api/pro/respond/:professionalId
Content-Type: application/json

{
  "requestId": "64f8a12b...",
  "response": "accepted" // or "declined"
}
```

#### Update Job Status
```http
PUT /api/pro/job/:professionalId/:requestId/status
Content-Type: application/json

{
  "status": "in_progress", // assigned, in_progress, completed
  "scheduledDate": "2025-01-21T10:00:00Z",
  "finalCost": 150.00,
  "notes": "Replaced faucet and fixed leak"
}
```

#### Get Professional's Jobs
```http
GET /api/pro/jobs/:professionalId?status=available&page=1&limit=20
```

### Statistics Endpoint
```http
GET /api/requests/stats/overview
```

## Supported Service Types

- `plumbing`
- `electrical`
- `landscaping`
- `cleaning`
- `junk_removal`
- `handyman`
- `hvac`
- `painting`
- `roofing`
- `flooring`
- `carpentry`
- `appliance_repair`

## Database Models

### ServiceRequest Model
```javascript
{
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  serviceType: String,
  description: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude],
    address: String
  },
  status: String, // pending, matched, assigned, in_progress, completed, cancelled
  priority: String,
  notifiedProfessionals: [{
    professionalId: ObjectId,
    notifiedAt: Date,
    response: String, // pending, accepted, declined
    responseAt: Date
  }],
  assignedProfessional: ObjectId,
  // ... additional fields
}
```

## SMS Notification Flow

1. **Customer submits request** → System finds nearby professionals → SMS sent to top 5 professionals
2. **Professional accepts** → SMS sent to customer with professional details → SMS sent to professional with job details
3. **Job completed** → SMS confirmation sent to customer

## Environment Variables Required

```env
# MongoDB
MONGO_URI=mongodb+srv://your-connection-string

# Twilio SMS
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE=+1234567890

# Stripe (already configured)
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=https://www.fixloapp.com
```

## Integration with Existing Features

This implementation integrates seamlessly with existing features:

- **Professional Model**: Uses existing professional data with subscription status
- **Stripe Integration**: Only active professionals receive job notifications
- **Geolocation**: Uses existing geocoding service for location matching
- **CORS & Security**: Uses existing middleware and security measures

## Testing

The API includes comprehensive error handling and works in environments without database/SMS configuration by providing appropriate fallbacks and mock responses.

Example test:
```bash
curl -X POST "http://localhost:10000/api/requests" \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "customerPhone": "555-123-4567",
    "serviceType": "plumbing",
    "description": "Emergency leak repair",
    "address": "New York, NY"
  }'
```

## Next Steps for Full Deployment

1. Configure environment variables (MongoDB, Twilio, Stripe)
2. Set up MongoDB indexes for geospatial queries
3. Configure Twilio SMS service
4. Test end-to-end workflow with real professionals
5. Add frontend integration for professional dashboard
6. Set up monitoring and analytics

The core infrastructure is now in place and ready for production deployment!