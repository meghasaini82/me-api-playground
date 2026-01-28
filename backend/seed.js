require('dotenv').config();
const { connectDB } = require('./config/db');
const Profile = require('./models/Profile');

const seedData = {
    name: "Megha saini", // ✏️ APNA NAAM DALO
    email: "meghasaini820981@gmail.com", // ✏️ APNI EMAIL DALO
    bio: "Passionate Software Developer and AI Enthusiast | Building innovative solutions with modern technologies", // ✏️ APNI BIO LIKHO

    education: [
        {
            id: Date.now(),
            institution: "Poornima University", // ✏️ COLLEGE NAME
            degree: "MCA", // ✏️ DEGREE
            field: "Computer Science", // ✏️ FIELD
            startYear: "2024",
            endYear: "2026",
            description: "Relevant coursework: Data Structures, Algorithms, DBMS, Web Development"
        }
    ],

    skills: [
        "JavaScript",
        "Python",
        "Node.js",
        "Express.js",
        "React",
        "SQLite",
        "MongoDB",
        "MySQL",
        "Git & GitHub",
        "REST APIs",
        "HTML/CSS",
        "Machine Learning"
        // ✏️ APNE SKILLS ADD KARO
    ],

    projects: [
        {
            id: Date.now(),
            title: "Language-Detector", // ✏️ PROJECT NAME
            description: "A Language Detection App** is a tool that automatically identifies the language of a given text using natural language processing",
            technologies: ["HTML,CSS,JS", "NLP", "FLASK"],
            links: {
                github: "https://github.com/meghasaini82/Language-Detector"
            },
            startDate: "Apr 2025",
            endDate: "May 2025"
        },
        {
            id: Date.now() + 1,
            title: "AI-PDF-ASSITANT",
            description: "An AI PDF Assistant is an intelligent tool that reads PDFs, understands their content, and lets users search, summarize, and ask questions from documents using AI.",
            technologies: ["Python", "Ai"],
            links: {
                github: "https://github.com/meghasaini82/ai-pdf-assistant",

            },
            startDate: "Aug 2025",
            endDate: "Sep 2025"
        }

    ],

    workExperience: [
        {
            id: Date.now(),
            company: "Ambuja Foundation", // ✏️ COMPANY NAME
            role: "Data Analytics", // ✏️ ROLE
            type: "Training",
            startDate: "May 2025",
            endDate: "Aug 2025",
            current: false,
            description: "Data Analytics Internship me maine real datasets par kaam karke data cleaning, analysis, visualization aur insights nikalna seekha",
            technologies: ["EXCEL", "POWER BI", "Python", "Numpy,Pandas,Matplotlib,Seaborn"]
        }
        // ✏️ BAAD MEIN AUR ADD KAR SAKTE HO via API
    ],

    links: {
        github: "https://github.com/account", // ✏️ GITHUB
        linkedin: "https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3Brx3%2BdcwxRsqKpBgPYe%2BIJA%3D%3D", // ✏️ LINKEDIN
        resume: "https://drive.google.com/file/d/1M2uwGKFFJGumR8rulcpMxS7RzF1BgDnc/view?usp=drive_link" // ✏️ RESUME LINK
    },

    certifications: [
        {
            id: Date.now(),
            name: "Full Stack Web Development",
            issuer: "Coursera / Udemy",
            issueDate: "Dec 2023",
            credentialUrl: "https://coursera.org/verify/xxx"
        },
        {
            id: Date.now() + 1,
            name: "JavaScript Algorithms and Data Structures",
            issuer: "freeCodeCamp",
            issueDate: "Jan 2024",
            credentialUrl: "https://freecodecamp.org/certification/xxx"
        }
        // Optional - Baad mein add kar sakte ho
    ],

    achievements: [
        {
            id: Date.now(),
            title: "Hackathon Winner - CodeFest 2024",
            description: "Won first prize in college hackathon for building an innovative healthcare app",
            date: "Mar 2024"
        },
        {
            id: Date.now() + 1,
            title: "Open Source Contributor",
            description: "Active contributor to popular open-source projects on GitHub",
            date: "2024"
        }
        // Optional
    ]
};

const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await connectDB();

        // Clear existing data
        await Profile.destroy({ where: {} });
        console.log('🗑️  Existing data cleared');

        // Insert seed data
        const profile = await Profile.create(seedData);
        console.log('✅ Profile created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Profile Data:');
        console.log('   Name:', profile.name);
        console.log('   Email:', profile.email);
        console.log('   Skills:', profile.skills.length);
        console.log('   Projects:', profile.projects.length);
        console.log('   Work Experience:', profile.workExperience.length);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✨ Database seeded! You can now start the server.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();