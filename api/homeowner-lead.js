// Vercel Serverless Function for Homeowner Lead
export default function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', 'https://www.fixloapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  console.log("🏠 Homeowner lead request:", req.body);
  
  const { name, phone, address, service, description } = req.body;
  
  if (!name || !phone || !service) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, phone, and service are required" 
    });
  }
  
  // TODO: Save to database and notify professionals
  console.log(`📞 New homeowner lead: ${name} (${phone}) needs ${service} at ${address}`);
  
  res.json({ 
    success: true, 
    message: "Service request received successfully!",
    data: { name, phone, address, service, description }
  });
}
