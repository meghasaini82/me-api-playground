require('dotenv').config();
const Profile = require('./models/profile');


async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    try {
        // Create Profile
        console.log('Creating profile...');
        const profile = await Profile.createProfile({
            name: 'MEGHA SAINI',
            email: 'meghasaini820981@gmail.com',
            education: 'MCA',
            about: 'Passionate software developer interested in web development and AI.',
            github: 'https://github.com/meghasaini82',
            linkedin: 'https://linkedin.com/in/meghasaini47',

        });
        console.log('✅ Profile created:', profile.name);

        // Add Skills
        console.log('\nAdding skills...');
        const skills = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'FastAPI', 'Express'];
        for (const skill of skills) {
            await Profile.addSkill(1, skill);
            console.log(`  ✅ Added: ${skill}`);
        }

        // Add Projects
        console.log('\nAdding projects...');
        await Profile.addProject(1, {
            title: 'Language-Detection',
            description: 'A Language Detection & Translation App identifies the language of any given text and automatically converts it into English using NLP and translation models',
            technologies: ['HTML', 'CSS', 'JS', 'NLP', 'FLASK'],
            links: {
                github: 'https://github.com/meghasaini82/Language-Detector'
            },
            startDate: '2025-01',
            endDate: '2025-02'
        });
        console.log('  ✅ Added: Language-Detection');

        await Profile.addProject(1, {
            title: 'AI-PDF-ASSISTANT',
            description: 'An AI PDF Assistant is an intelligent tool that reads PDFs, understands their content, and lets users search, summarize, and ask questions from documents using AI.',
            technologies: ['Python', 'Ai'],
            links: {
                github: 'https://github.com/meghasaini82/ai-pdf-assistant'
            },
            startDate: '2025-07',
            endDate: '2025-08'
        });
        console.log('  ✅ Added:AI-PDF-ASSISTANT');

        // Add Work Experience
        console.log('\nAdding work experience...');
        await Profile.addExperience(1, {
            company: 'Ambuja Foundation',
            role: 'Data Analyst',
            type: 'Trainer',
            description: 'During my Data Analytics internship, I worked with real-world datasets to perform data cleaning, analysis, and visualization to derive meaningful business insights.',
            technologies: ['Python', 'NUMPY', 'PANDAS', 'Matplotlib', 'Seaborn', 'EXCEL', 'PowerBI'],
            startDate: '2025-05',
            endDate: '2025-07',
            current: false
        });
        console.log('  ✅ Added: Tech Company Inc');

        // Add Resume
        console.log('\nAdding resume...');
        await Profile.updateResume(1, 'https://drive.google.com/your-resume-link');
        console.log('  ✅ Resume added');

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n🚀 You can now start the server with: npm start');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run seeding
seedDatabase();