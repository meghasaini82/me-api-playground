const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');


// ============================================
// PROFILE ENDPOINTS (Assignment Required)
// ============================================

// GET Profile - Read complete profile
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || 1;
        const profile = await Profile.getProfile(userId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

// POST Profile - Create new profile
router.post('/', async (req, res) => {
    try {
        const profile = await Profile.createProfile(req.body);

        res.status(201).json({
            success: true,
            message: 'Profile created successfully',
            data: profile
        });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating profile',
            error: error.message
        });
    }
});

// PUT Profile - Update profile (DYNAMIC!)
router.put('/', async (req, res) => {
    try {
        const userId = req.query.userId || 1;
        const result = await Profile.updateProfile(userId, req.body);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: result
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// ============================================
// SKILLS ENDPOINTS (Dynamic Add/Delete)
// ============================================

// POST Add Skill
router.post('/skill', async (req, res) => {
    try {
        const userId = req.body.userId || 1;
        const { name } = req.body;

        const skill = await Profile.addSkill(userId, name);

        res.status(201).json({
            success: true,
            message: 'Skill added successfully',
            data: skill
        });
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding skill',
            error: error.message
        });
    }
});

// DELETE Skill
router.delete('/skill/:id', async (req, res) => {
    try {
        const result = await Profile.deleteSkill(req.params.id);

        res.json({
            success: true,
            message: 'Skill deleted successfully',
            data: result
        });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting skill',
            error: error.message
        });
    }
});

// ============================================
// PROJECTS ENDPOINTS (Dynamic Add/Delete)
// ============================================

// POST Add Project
router.post('/project', async (req, res) => {
    try {
        const userId = req.body.userId || 1;
        const project = await Profile.addProject(userId, req.body);

        res.status(201).json({
            success: true,
            message: 'Project added successfully',
            data: project
        });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding project',
            error: error.message
        });
    }
});

// DELETE Project
router.delete('/project/:id', async (req, res) => {
    try {
        const result = await Profile.deleteProject(req.params.id);

        res.json({
            success: true,
            message: 'Project deleted successfully',
            data: result
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting project',
            error: error.message
        });
    }
});

// ============================================
// WORK EXPERIENCE ENDPOINTS (Dynamic Add/Delete)
// ============================================

// POST Add Work Experience
router.post('/experience', async (req, res) => {
    try {
        const userId = req.body.userId || 1;
        const experience = await Profile.addExperience(userId, req.body);

        res.status(201).json({
            success: true,
            message: 'Work experience added successfully',
            data: experience
        });
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding experience',
            error: error.message
        });
    }
});

// DELETE Work Experience
router.delete('/experience/:id', async (req, res) => {
    try {
        const result = await Profile.deleteExperience(req.params.id);

        res.json({
            success: true,
            message: 'Work experience deleted successfully',
            data: result
        });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting experience',
            error: error.message
        });
    }
});

// ============================================
// RESUME ENDPOINT
// ============================================

// POST/PUT Resume
router.post('/resume', async (req, res) => {
    try {
        const userId = req.body.userId || 1;
        const { resumeUrl } = req.body;

        const result = await Profile.updateResume(userId, resumeUrl);

        res.json({
            success: true,
            message: 'Resume updated successfully',
            data: result
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating resume',
            error: error.message
        });
    }
});

module.exports = router;