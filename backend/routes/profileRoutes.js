const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// ========== HEALTH CHECK ==========
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running!' });
});

// ========== GET: Fetch Profile ==========
router.get('/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Please create one first.'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ========== POST: Create Profile (First Time) ==========
router.post('/profile', async (req, res) => {
    try {
        const existingProfile = await Profile.findOne();

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: 'Profile already exists. Use PUT /profile to update.'
            });
        }

        const profile = await Profile.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Profile created successfully!',
            data: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== PUT: Update ENTIRE Profile ==========
router.put('/profile', async (req, res) => {
    try {
        let profile = await Profile.findOne();

        if (!profile) {
            // If no profile exists, create new one
            profile = await Profile.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'Profile created successfully!',
                data: profile
            });
        }

        // Update existing profile
        await profile.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully!',
            data: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== POST: Add NEW Project (Dynamic) ==========
router.post('/profile/project', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const projects = profile.projects || [];
        const newProject = {
            id: Date.now(), // Unique ID
            ...req.body
        };
        projects.push(newProject);

        await profile.update({ projects });

        res.status(201).json({
            success: true,
            message: 'Project added successfully!',
            data: newProject
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== POST: Add NEW Work Experience/Internship (Dynamic) ==========
router.post('/profile/experience', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const workExperience = profile.workExperience || [];
        const newExperience = {
            id: Date.now(), // Unique ID
            ...req.body
        };
        workExperience.push(newExperience);

        await profile.update({ workExperience });

        res.status(201).json({
            success: true,
            message: 'Work experience added successfully!',
            data: newExperience
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== POST: Add NEW Skill (Dynamic) ==========
router.post('/profile/skill', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        const { skill } = req.body;

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        if (!skill) {
            return res.status(400).json({
                success: false,
                message: 'Skill name is required'
            });
        }

        const skills = profile.skills || [];

        if (skills.includes(skill)) {
            return res.status(400).json({
                success: false,
                message: 'Skill already exists'
            });
        }

        skills.push(skill);
        await profile.update({ skills });

        res.status(201).json({
            success: true,
            message: 'Skill added successfully!',
            data: { skill }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== POST: Add Education (Dynamic) ==========
router.post('/profile/education', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const education = profile.education || [];
        const newEducation = {
            id: Date.now(), // Unique ID
            ...req.body
        };
        education.push(newEducation);

        await profile.update({ education });

        res.status(201).json({
            success: true,
            message: 'Education added successfully!',
            data: newEducation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== GET: Search Projects by Skill ==========
router.get('/projects', async (req, res) => {
    try {
        const { skill } = req.query;
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        let projects = profile.projects || [];

        // Filter by skill if provided
        if (skill) {
            projects = projects.filter(project =>
                project.technologies &&
                project.technologies.some(tech =>
                    tech.toLowerCase().includes(skill.toLowerCase())
                )
            );
        }

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ========== GET: Get Top Skills ==========
router.get('/skills/top', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const limit = parseInt(req.query.limit) || 5;
        const skills = profile.skills || [];
        const topSkills = skills.slice(0, limit);

        res.status(200).json({
            success: true,
            count: topSkills.length,
            data: topSkills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ========== DELETE: Remove a Project ==========
router.delete('/profile/project/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const projects = profile.projects || [];
        const updatedProjects = projects.filter(
            project => project.id != req.params.id
        );

        await profile.update({ projects: updatedProjects });

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully!',
            data: updatedProjects
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== DELETE: Remove Work Experience ==========
router.delete('/profile/experience/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const workExperience = profile.workExperience || [];
        const updatedExperience = workExperience.filter(
            exp => exp.id != req.params.id
        );

        await profile.update({ workExperience: updatedExperience });

        res.status(200).json({
            success: true,
            message: 'Work experience deleted successfully!',
            data: updatedExperience
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ========== GET: Search by anything (Universal Search) ==========
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query; // search query
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query required. Use ?q=keyword'
            });
        }

        const searchTerm = q.toLowerCase();
        const results = {
            skills: (profile.skills || []).filter(skill =>
                skill.toLowerCase().includes(searchTerm)
            ),
            projects: (profile.projects || []).filter(project =>
                project.title?.toLowerCase().includes(searchTerm) ||
                project.description?.toLowerCase().includes(searchTerm) ||
                (project.technologies || []).some(tech => tech.toLowerCase().includes(searchTerm))
            ),
            workExperience: (profile.workExperience || []).filter(exp =>
                exp.company?.toLowerCase().includes(searchTerm) ||
                exp.role?.toLowerCase().includes(searchTerm)
            )
        };

        res.status(200).json({
            success: true,
            query: q,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;