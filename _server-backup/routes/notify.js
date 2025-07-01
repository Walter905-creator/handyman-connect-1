const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pro = require('../models/Pro');

// ✅ Route: Save Expo Push Token for a Pro
router.post('/register-token', async (req, res) => {
  const { proId, token, name, trade } = req.body;
  
  try {
    console.log('📱 Registering push token:', { proId, token: token?.substring(0, 20) + '...', name, trade });
    
    // For now, since we don't have full Pro authentication yet,
    // we'll store this as a simple document or update existing
    let pro = await Pro.findOne({ tempId: proId });
    
    if (!pro) {
      // Create a temporary pro record
      pro = new Pro({
        tempId: proId,
        name: name || 'Test Pro',
        trade: trade || 'General',
        expoPushToken: token,
        wantsNotifications: true,
        createdAt: new Date()
      });
    } else {
      // Update existing pro's token
      pro.expoPushToken = token;
      pro.wantsNotifications = true;
    }
    
    await pro.save();
    
    console.log('✅ Push token saved for pro:', pro.name);
    res.json({ success: true, message: 'Push token registered successfully' });
    
  } catch (err) {
    console.error('❌ Error saving push token:', err);
    res.status(500).json({ error: 'Server error saving push token' });
  }
});

// ✅ Route: Send Test Notification
router.post('/test', async (req, res) => {
  const { token } = req.body;
  
  try {
    console.log('🧪 Sending test notification to token:', token?.substring(0, 20) + '...');
    
    const response = await axios.post('https://exp.host/--/api/v2/push/send', {
      to: token,
      sound: 'default',
      title: '🔔 Test Notification',
      body: 'Your Fixlo Pro notifications are working!',
      data: { type: 'test' }
    });
    
    console.log('✅ Test notification sent successfully');
    res.json({ success: true, message: 'Test notification sent' });
    
  } catch (err) {
    console.error('❌ Error sending test notification:', err);
    res.status(500).json({ error: 'Failed to send test notification' });
  }
});

// ✅ Function: Send Push Notifications to All Pros
async function sendJobNotificationToAllPros(jobRequest) {
  try {
    console.log('📢 Sending job notifications for:', jobRequest.trade);
    
    // Get all pros who want notifications and have push tokens
    const pros = await Pro.find({ 
      wantsNotifications: true, 
      expoPushToken: { $exists: true, $ne: null } 
    });
    
    console.log(`📱 Found ${pros.length} pros to notify`);
    
    const notifications = pros.map(pro => ({
      to: pro.expoPushToken,
      sound: 'default',
      title: '🔔 New Job Alert!',
      body: `New ${jobRequest.trade} project in your area from ${jobRequest.name}`,
      data: { 
        type: 'job_request',
        jobId: jobRequest._id,
        trade: jobRequest.trade,
        location: jobRequest.address
      }
    }));
    
    // Send all notifications
    for (let notification of notifications) {
      try {
        await axios.post('https://exp.host/--/api/v2/push/send', notification);
        console.log('✅ Notification sent to pro');
      } catch (err) {
        console.error('❌ Failed to send to one pro:', err.message);
      }
    }
    
    return { success: true, notificationsSent: notifications.length };
    
  } catch (err) {
    console.error('❌ Error sending job notifications:', err);
    return { success: false, error: err.message };
  }
}

// ✅ Route: Handle Job Request with Notifications
router.post('/', async (req, res) => {
  const { name, phone, address, trade, description } = req.body;
  
  try {
    // Save the job request (assuming you have a JobRequest model)
    const jobRequest = {
      name,
      phone,
      address,
      trade,
      description,
      createdAt: new Date(),
      _id: Date.now().toString() // Simple ID for now
    };
    
    console.log('💼 New job request received:', { name, trade, address });
    
    // Send push notifications to all pros
    const notificationResult = await sendJobNotificationToAllPros(jobRequest);
    
    // You can also send SMS here if you have that set up
    // await sendSMSToAllPros(jobRequest);
    
    res.json({ 
      success: true, 
      message: 'Job request submitted and pros notified!',
      notificationsSent: notificationResult.notificationsSent 
    });
    
  } catch (err) {
    console.error('❌ Error processing job request:', err);
    res.status(500).json({ error: 'Server error processing request' });
  }
});

module.exports = router;
