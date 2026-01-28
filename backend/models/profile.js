const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Basic Info
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    bio: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },

    // Education (Stored as JSON)
    education: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    // Skills (Stored as JSON array)
    skills: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    // Projects (Stored as JSON)
    projects: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    // Work Experience / Internships (Stored as JSON)
    workExperience: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    // Social Links (Stored as JSON)
    links: {
        type: DataTypes.JSON,
        defaultValue: {}
    },

    // Certifications (Stored as JSON)
    certifications: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    // Achievements (Stored as JSON)
    achievements: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    tableName: 'profiles',
    timestamps: true // Adds createdAt and updatedAt
});

module.exports = Profile;