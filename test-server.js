// Quick test to verify admin route and server setup
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('.'));

// Test route
app.get('/test', (req, res) => {
    res.json({ 
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        adminRoute: '/admin',
        testRoute: '/test'
    });
});

// Admin route
app.get('/admin', (req, res) => {
    const adminPath = path.join(__dirname, 'admin.html');
    console.log('Admin route accessed, serving:', adminPath);
    res.sendFile(adminPath);
});

// Root route
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    console.log('Root route accessed, serving:', indexPath);
    res.sendFile(indexPath);
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.url);
    res.status(404).json({
        error: 'Route not found',
        url: req.url,
        availableRoutes: ['/', '/admin', '/test']
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Test server running on port ${PORT}`);
    console.log(`📱 Available routes:`);
    console.log(`   http://localhost:${PORT}/`);
    console.log(`   http://localhost:${PORT}/admin`);
    console.log(`   http://localhost:${PORT}/test`);
});

module.exports = app;
