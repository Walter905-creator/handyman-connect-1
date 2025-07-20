// Main Server for Fixlo Platform
// Handles service requests, professional signup, and SMS notifications

const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Import routes
const smsHandler = require('./sms-handler');
const urlRedirects = require('./url-redirects');

// Use routes
app.use('/api', smsHandler);
app.use('/', urlRedirects);

// In-memory storage (replace with database in production)
const storage = {
    serviceRequests: new Map(),
    professionals: new Map(),
    jobMatches: new Map()
};

// Service request endpoint
app.post('/api/service-request', async (req, res) => {
    try {
        const {
            serviceType,
            name,
            phone,
            email,
            address,
            description,
            urgency,
            budget
        } = req.body;

        // Validate required fields
        if (!serviceType || !name || !phone || !email || !address || !description || !urgency) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Generate unique job ID
        const jobId = uuidv4();
        const timestamp = new Date().toISOString();

        // Store service request
        const serviceRequest = {
            id: jobId,
            serviceType,
            customerName: name,
            customerPhone: phone,
            customerEmail: email,
            serviceAddress: address,
            description,
            urgency,
            budget: budget || 'Not specified',
            status: 'open',
            createdAt: timestamp,
            responses: []
        };

        storage.serviceRequests.set(jobId, serviceRequest);

        // Find matching professionals
        const matchingPros = findMatchingProfessionals(serviceType, address);
        
        console.log(`📋 New Service Request: ${serviceType} in ${address}`);
        console.log(`🔍 Found ${matchingPros.length} matching professionals`);

        // Send SMS notifications to matching professionals
        if (matchingPros.length > 0) {
            await notifyProfessionals(serviceRequest, matchingPros);
        }

        // Log the request
        console.log(`✅ Service request created: ${jobId}`);
        console.log(`   Customer: ${name} (${phone})`);
        console.log(`   Service: ${serviceType}`);
        console.log(`   Location: ${address}`);
        console.log(`   Urgency: ${urgency}`);

        res.json({
            success: true,
            message: 'Service request submitted successfully!',
            jobId: jobId,
            matchingPros: matchingPros.length,
            estimatedResponse: urgency === 'emergency' ? '15-30 minutes' : 
                             urgency === 'urgent' ? '1-4 hours' : 
                             '4-24 hours'
        });

    } catch (error) {
        console.error('Service request error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit service request. Please try again.'
        });
    }
});

// Professional signup endpoint
app.post('/api/pro-signup', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            trade,
            location,
            dob,
            experience,
            description,
            smsConsent
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !trade || !location || !dob || !smsConsent) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided and SMS consent is required'
            });
        }

        // Validate age (18+)
        const birthDate = new Date(dob);
        const today = new Date();
        const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        
        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: 'You must be 18 or older to join as a professional'
            });
        }

        // Generate professional ID
        const proId = uuidv4();
        const timestamp = new Date().toISOString();

        // Store professional profile
        const professional = {
            id: proId,
            name,
            email,
            phone,
            primaryTrade: trade,
            serviceLocation: location,
            dateOfBirth: dob,
            yearsExperience: experience || 0,
            description: description || '',
            smsConsent: true,
            status: 'pending_payment',
            verificationStatus: 'pending',
            createdAt: timestamp,
            subscription: {
                plan: 'professional',
                price: 59.99,
                status: 'pending'
            }
        };

        storage.professionals.set(proId, professional);

        // Send welcome SMS
        const smsModule = require('./sms-handler');
        if (smsModule.sendWelcomeSMS) {
            await smsModule.sendWelcomeSMS(phone, name, email);
        }

        console.log(`👨‍🔧 New Professional Signup: ${name} (${trade})`);
        console.log(`   Location: ${location}`);
        console.log(`   Experience: ${experience} years`);
        console.log(`   Phone: ${phone}`);

        res.json({
            success: true,
            message: 'Professional profile created successfully!',
            proId: proId,
            redirectUrl: `/payment?pro=${proId}`,
            welcomeSMSSent: true
        });

    } catch (error) {
        console.error('Professional signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create professional profile. Please try again.'
        });
    }
});

// Job response endpoint
app.post('/api/job-response', async (req, res) => {
    try {
        const { jobId, proId, responseType, message } = req.body;

        const serviceRequest = storage.serviceRequests.get(jobId);
        const professional = storage.professionals.get(proId);

        if (!serviceRequest || !professional) {
            return res.status(404).json({
                success: false,
                message: 'Job or professional not found'
            });
        }

        // Add response to job
        const response = {
            proId,
            proName: professional.name,
            proPhone: professional.phone,
            responseType, // 'interested', 'accepted', 'declined'
            message: message || '',
            timestamp: new Date().toISOString()
        };

        serviceRequest.responses.push(response);

        // Update job status if accepted
        if (responseType === 'accepted') {
            serviceRequest.status = 'assigned';
            serviceRequest.assignedPro = proId;
        }

        console.log(`📞 Job Response: ${professional.name} ${responseType} job ${jobId}`);

        res.json({
            success: true,
            message: 'Response recorded successfully',
            jobStatus: serviceRequest.status
        });

    } catch (error) {
        console.error('Job response error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to record response'
        });
    }
});

// Get job details endpoint
app.get('/api/job/:jobId', (req, res) => {
    const { jobId } = req.params;
    const serviceRequest = storage.serviceRequests.get(jobId);

    if (!serviceRequest) {
        return res.status(404).json({
            success: false,
            message: 'Job not found'
        });
    }

    res.json({
        success: true,
        job: serviceRequest
    });
});

// Professional dashboard endpoint
app.get('/api/dashboard/:proId', (req, res) => {
    const { proId } = req.params;
    const professional = storage.professionals.get(proId);

    if (!professional) {
        return res.status(404).json({
            success: false,
            message: 'Professional not found'
        });
    }

    // Get jobs for this professional's trade and location
    const availableJobs = Array.from(storage.serviceRequests.values())
        .filter(job => 
            job.status === 'open' && 
            job.serviceType === professional.primaryTrade
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
        success: true,
        professional,
        availableJobs: availableJobs.slice(0, 10) // Latest 10 jobs
    });
});

// Helper functions
function findMatchingProfessionals(serviceType, location) {
    const matchingPros = Array.from(storage.professionals.values())
        .filter(pro => 
            pro.primaryTrade === serviceType && 
            pro.status === 'active' &&
            pro.smsConsent === true
        );

    // In a real implementation, you'd use geocoding to match locations
    // For now, we'll just return all matching trade professionals
    return matchingPros;
}

async function notifyProfessionals(serviceRequest, professionals) {
    const smsModule = require('./sms-handler');
    
    for (const pro of professionals) {
        try {
            if (smsModule.sendJobAlert) {
                await smsModule.sendJobAlert(
                    pro.phone,
                    serviceRequest.customerName,
                    serviceRequest.serviceType,
                    serviceRequest.serviceAddress,
                    serviceRequest.customerPhone,
                    serviceRequest.id
                );
                
                console.log(`📱 SMS sent to ${pro.name} (${pro.phone})`);
            }
        } catch (error) {
            console.error(`Failed to send SMS to ${pro.name}:`, error);
        }
    }
}

// Status endpoint
app.get('/api/status', (req, res) => {
    res.json({
        success: true,
        status: 'operational',
        timestamp: new Date().toISOString(),
        stats: {
            totalServiceRequests: storage.serviceRequests.size,
            totalProfessionals: storage.professionals.size,
            activeJobs: Array.from(storage.serviceRequests.values())
                .filter(job => job.status === 'open').length
        }
    });
});

// Serve static files and handle routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sms-optin', (req, res) => {
    res.sendFile(path.join(__dirname, 'sms-optin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Fixlo Server running on port ${PORT}`);
    console.log(`📱 SMS notifications: ${process.env.TWILIO_ACCOUNT_SID ? 'Enabled' : 'Disabled (missing Twilio config)'}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    
    // Add some sample professionals for testing
    addSampleProfessionals();
});

// Add sample professionals for testing
function addSampleProfessionals() {
    const samplePros = [
        {
            id: 'pro-1',
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1234567890',
            primaryTrade: 'plumbing',
            serviceLocation: 'New York, NY',
            yearsExperience: 8,
            status: 'active',
            smsConsent: true,
            verificationStatus: 'verified'
        },
        {
            id: 'pro-2',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1234567891',
            primaryTrade: 'electrical',
            serviceLocation: 'New York, NY',
            yearsExperience: 5,
            status: 'active',
            smsConsent: true,
            verificationStatus: 'verified'
        },
        {
            id: 'pro-3',
            name: 'Mike Wilson',
            email: 'mike@example.com',
            phone: '+1234567892',
            primaryTrade: 'carpentry',
            serviceLocation: 'New York, NY',
            yearsExperience: 12,
            status: 'active',
            smsConsent: true,
            verificationStatus: 'verified'
        }
    ];

    samplePros.forEach(pro => {
        storage.professionals.set(pro.id, pro);
    });

    console.log(`✅ Added ${samplePros.length} sample professionals for testing`);
}

module.exports = app;
