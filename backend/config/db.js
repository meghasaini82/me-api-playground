const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database file path (automatically creates file if not exists)
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false, // Set to console.log to see SQL queries
    define: {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ SQLite Database Connected!');
        console.log('📁 Database Location:', dbPath);

        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('📊 Database synced successfully!');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };