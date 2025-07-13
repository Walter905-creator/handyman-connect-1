// Vercel Serverless Function for Professional Signup
export default function handler(req, res) {
  // Get the origin from the request
  const origin = req.headers.origin;
  const allowedOrigins = ['https://www.fixloapp.com', 'https://fixloapp.com'];
  
  // Set CORS headers for allowed origins
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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

  console.log("🔧 Professional signup request:", req.body);
  
  const { name, email, phone, role } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, and phone are required" 
    });
  }
  
  // TODO: Save to database and send notifications
  console.log(`📝 New professional signup: ${name} (${email}) - ${phone}`);
  
  res.json({ 
    success: true, 
    message: "Professional signup received successfully!",
    data: { name, email, phone, role }
  });
}
