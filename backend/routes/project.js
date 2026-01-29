const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');


// ============================================
// PROJECTS SEARCH ENDPOINT
// Assignment Requirement: GET /projects?skill=python
// ============================================

router.get('/', async (req, res) => {
    try {
        const { skill } = req.query;

        if (!skill) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a skill parameter'
            });
        }

        const projects = await Profile.searchProjectsBySkill(skill);

        res.json({
            success: true,
            count: projects.length,
            query: skill,
            data: projects
        });
    } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching projects',
            error: error.message
        });
    }
});

module.exports = router;