// sendLeadNotification.js
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

module.exports = async function sendLeadNotification({ toPhone, service, location }) {
  try {
    await client.messages.create({
      to: toPhone,
      from: process.env.TWILIO_NUMBER,
      body: `🚨 New ${service} lead in ${location}! View it now on Fixlo.`,
    });
    console.log(`SMS sent to ${toPhone} for ${service} in ${location}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
};