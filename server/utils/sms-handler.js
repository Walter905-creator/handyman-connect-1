const twilio = require('twilio');

// SMS notification handler using Twilio
class SMSHandler {
  constructor() {
    this.client = null;
    this.fromNumber = process.env.TWILIO_PHONE;
    
    // Initialize Twilio client if credentials are available
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      console.log('✅ SMS Handler initialized with Twilio');
    } else {
      console.log('⚠️ SMS Handler: Twilio credentials not found, SMS notifications disabled');
    }
  }
  
  // Check if SMS service is available
  isAvailable() {
    return this.client !== null && this.fromNumber;
  }
  
  // Send SMS to a single recipient
  async sendSMS(to, message) {
    if (!this.isAvailable()) {
      console.log('⚠️ SMS service not available, skipping SMS to:', to);
      return { success: false, error: 'SMS service not configured' };
    }
    
    try {
      console.log(`📱 Sending SMS to ${to}: ${message.substring(0, 50)}...`);
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: to
      });
      
      console.log(`✅ SMS sent successfully to ${to}, SID: ${result.sid}`);
      
      return {
        success: true,
        sid: result.sid,
        to: to,
        status: result.status
      };
      
    } catch (error) {
      console.error(`❌ Failed to send SMS to ${to}:`, error.message);
      
      return {
        success: false,
        error: error.message,
        to: to
      };
    }
  }
  
  // Send new job notification to a professional
  async notifyProfessionalNewJob(professional, serviceRequest) {
    const message = `New ${serviceRequest.serviceType} job available in ${serviceRequest.location.address}! 
Customer: ${serviceRequest.customerName}
Description: ${serviceRequest.description.substring(0, 100)}...
Respond quickly to secure this job!`;

    return await this.sendSMS(professional.phone, message);
  }
  
  // Send job assignment confirmation to professional
  async notifyJobAssigned(professional, serviceRequest) {
    const message = `Congratulations! You've been assigned a ${serviceRequest.serviceType} job.
Customer: ${serviceRequest.customerName} - ${serviceRequest.customerPhone}
Address: ${serviceRequest.location.address}
Description: ${serviceRequest.description}`;

    return await this.sendSMS(professional.phone, message);
  }
  
  // Send service request confirmation to customer
  async notifyCustomerRequestReceived(serviceRequest) {
    if (!serviceRequest.customerPhone) {
      return { success: false, error: 'No customer phone number' };
    }
    
    const message = `Thank you ${serviceRequest.customerName}! Your ${serviceRequest.serviceType} service request has been received. We're finding the best professionals in your area and will contact you soon.`;

    return await this.sendSMS(serviceRequest.customerPhone, message);
  }
  
  // Send customer notification when professional is assigned
  async notifyCustomerProfessionalAssigned(serviceRequest, professional) {
    if (!serviceRequest.customerPhone) {
      return { success: false, error: 'No customer phone number' };
    }
    
    const message = `Great news ${serviceRequest.customerName}! ${professional.name} has been assigned to your ${serviceRequest.serviceType} job. They'll contact you soon at this number to schedule the service.`;

    return await this.sendSMS(serviceRequest.customerPhone, message);
  }
  
  // Bulk SMS to multiple professionals about a new job
  async notifyMultipleProfessionals(professionals, serviceRequest) {
    const results = [];
    
    for (const professional of professionals) {
      const result = await this.notifyProfessionalNewJob(professional, serviceRequest);
      results.push({
        professionalId: professional._id,
        professionalName: professional.name,
        phone: professional.phone,
        ...result
      });
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`📊 SMS notifications: ${successCount}/${results.length} sent successfully`);
    
    return {
      total: results.length,
      successful: successCount,
      failed: results.length - successCount,
      details: results
    };
  }
}

// Create and export singleton instance
const smsHandler = new SMSHandler();
module.exports = smsHandler;