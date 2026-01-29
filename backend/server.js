require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const profileRoutes = require("./routes/profileRoutes");
const projectsRoutes = require("./routes/project");

// Import database (this will initialize tables)
require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (add your Vercel URL here)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://me-api-playground-jet.vercel.app", // your frontend vercel url
];

// ✅ CORS config (Render backend + Vercel frontend)
app.use(
    cors({
        origin: function (origin, callback) {
            // allow server-to-server / Postman / curl (no origin)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("CORS blocked for origin: " + origin), false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Preflight
app.options("*", cors());

// ============================================
// MIDDLEWARE
// ============================================

// Body parsing (better than body-parser)
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ============================================
// HEALTH CHECK
// ============================================
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Me-API Playground is running",
        timestamp: new Date().toISOString(),
    });
});

// ============================================
// API ROUTES
// ============================================

// Root endpoint
app.get("/api/v1", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Me-API Playground API",
        version: "1.0.0",
        endpoints: {
            profile: "/api/v1/profile",
            projects: "/api/v1/projects",
            health: "/health",
            docs: "/api/v1/docs",
        },
    });
});

// Profile routes
app.use("/api/v1/profile", profileRoutes);

// Projects search route
app.use("/api/v1/projects", projectsRoutes);

// API Documentation
app.get("/api/v1/docs", (req, res) => {
    res.json({
        success: true,
        apiDocumentation: {
            profile: {
                "GET /api/v1/profile": "Get complete profile",
                "POST /api/v1/profile": "Create new profile",
                "PUT /api/v1/profile": "Update profile",
            },
            skills: {
                "POST /api/v1/profile/skill": "Add skill",
                "DELETE /api/v1/profile/skill/:id": "Delete skill",
            },
            projects: {
                "POST /api/v1/profile/project": "Add project",
                "DELETE /api/v1/profile/project/:id": "Delete project",
                "GET /api/v1/projects?skill=python":
                    "Search projects by skill (ASSIGNMENT REQUIREMENT)",
            },
            experience: {
                "POST /api/v1/profile/experience": "Add work experience",
                "DELETE /api/v1/profile/experience/:id": "Delete work experience",
            },
            resume: {
                "POST /api/v1/profile/resume": "Add/Update resume",
            },
        },
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        requestedUrl: req.originalUrl,
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log("\n🚀 ========================================");
    console.log(`   Me-API Playground Backend Running`);
    console.log(`   PORT: ${PORT}`);
    console.log(`   Health: /health`);
    console.log(`   API: /api/v1`);
    console.log(`   Docs: /api/v1/docs`);
    console.log("======================================== 🚀\n");
});

module.exports = app;
