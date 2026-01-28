require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Connect to Database (SQLite)
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api', profileRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Welcome to Me-API Playground!',
        database: 'SQLite',
        endpoints: {
            health: '/api/health',
            profile: {
                get: 'GET /api/profile',
                create: 'POST /api/profile',
                update: 'PUT /api/profile'
            },
            projects: {
                getAll: 'GET /api/projects',
                getBySkill: 'GET /api/projects?skill=python',
                add: 'POST /api/profile/project',
                delete: 'DELETE /api/profile/project/:id'
            },
            experience: {
                add: 'POST /api/profile/experience',
                delete: 'DELETE /api/profile/experience/:id'
            },
            skills: {
                add: 'POST /api/profile/skill',
                topSkills: 'GET /api/skills/top?limit=5'
            },
            education: {
                add: 'POST /api/profile/education'
            },
            search: {
                universal: 'GET /api/search?q=keyword'
            }
        }
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Database: SQLite (file-based, no installation needed!)`);
});