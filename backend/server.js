require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const profileRoutes = require('./routes/profileRoutes');
const projectsRoutes = require('./routes/project');


// Import database (this will initialize tables)
require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 5000;
// Is array mein apna Vercel wala link add karein (bina '/' ke end mein)
const allowedOrigins = [
    "http://localhost:5173",                     // Local testing ke liye
    "https://me-api-playground-jet.vercel.app"       // 👈 Yahan apna Vercel link paste karein
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow frontend to connect
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ============================================
// HEALTH CHECK (ASSIGNMENT REQUIREMENT!)
// ============================================

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Me-API Playground is running',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// API ROUTES
// ============================================

// Root endpoint
app.get('/api/v1', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Me-API Playground API',
        version: '1.0.0',
        endpoints: {
            profile: '/api/v1/profile',
            projects: '/api/v1/projects',
            health: '/health',
            docs: '/api/v1/docs'
        }
    });
});

// Profile routes
app.use('/api/v1/profile', profileRoutes);

// Projects search route (Assignment requirement)
app.use('/api/v1/projects', projectsRoutes);

// API Documentation
app.get('/api/v1/docs', (req, res) => {
    res.json({
        success: true,
        apiDocumentation: {
            profile: {
                'GET /api/v1/profile': 'Get complete profile',
                'POST /api/v1/profile': 'Create new profile',
                'PUT /api/v1/profile': 'Update profile'
            },
            skills: {
                'POST /api/v1/profile/skill': 'Add skill',
                'DELETE /api/v1/profile/skill/:id': 'Delete skill'
            },
            projects: {
                'POST /api/v1/profile/project': 'Add project',
                'DELETE /api/v1/profile/project/:id': 'Delete project',
                'GET /api/v1/projects?skill=python': 'Search projects by skill (ASSIGNMENT REQUIREMENT)'
            },
            experience: {
                'POST /api/v1/profile/experience': 'Add work experience',
                'DELETE /api/v1/profile/experience/:id': 'Delete work experience'
            },
            resume: {
                'POST /api/v1/profile/resume': 'Add/Update resume'
            }
        }
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        requestedUrl: req.originalUrl
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log(`   Me-API Playground Backend Running`);
    console.log(`   PORT: ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
    console.log(`   API: http://localhost:${PORT}/api/v1`);
    console.log(`   Docs: http://localhost:${PORT}/api/v1/docs`);
    console.log('======================================== 🚀\n');
});

module.exports = app;