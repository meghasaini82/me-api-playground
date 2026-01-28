# 🚀 Me-API Playground - Dynamic Profile API

A fully dynamic RESTful API built with **Node.js**, **Express**, and **SQLite** that stores and manages your professional profile. This API allows you to dynamically add, update, and retrieve your profile information including projects, work experience, skills, and more.

## ✨ Features

- ✅ **Zero Database Installation** - Uses SQLite (file-based database)
- ✅ **Fully Dynamic** - Add projects, internships, skills without code changes
- ✅ **RESTful API** - Clean and well-documented endpoints
- ✅ **CRUD Operations** - Create, Read, Update, Delete
- ✅ **Search Functionality** - Filter projects by skills
- ✅ **Easy Deployment** - Deploy to Render, Railway, or any platform

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (via Sequelize ORM)
- **Others**: CORS, dotenv

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── models/
│   └── Profile.js         # Profile schema
├── routes/
│   └── profileRoutes.js   # API routes
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── server.js             # Main server file
├── seed.js               # Sample data seeder
├── package.json          # Dependencies
└── database.sqlite       # SQLite database (auto-created)
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
NODE_ENV=development
```

### Step 3: Add Your Data

Edit `seed.js` and replace with your real information:
- Name
- Email
- Bio
- Education
- Skills
- Projects
- Work Experience
- Social Links (GitHub, LinkedIn)
- Resume Link

### Step 4: Seed Database

```bash
npm run seed
```

**Output:**
```
✅ Profile created successfully!
📊 Profile Data:
   Name: Your Name
   Email: your.email@example.com
   Skills: 12
   Projects: 3
   Work Experience: 1
```

### Step 5: Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

**Server will run on:** `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns: `{ status: "OK" }`

### Profile Endpoints

#### Get Profile
```
GET /api/profile
```
Returns your complete profile data

#### Create Profile (First Time)
```
POST /api/profile
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Software Developer",
  "skills": ["JavaScript", "Python"],
  ...
}
```

#### Update Profile
```
PUT /api/profile
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Updated bio",
  ...
}
```

### Dynamic Operations

#### Add New Project
```
POST /api/profile/project
Content-Type: application/json

{
  "title": "My Awesome Project",
  "description": "A cool project I built",
  "technologies": ["React", "Node.js"],
  "links": {
    "github": "https://github.com/user/project",
    "live": "https://project.com"
  },
  "startDate": "Jan 2024",
  "endDate": "Present"
}
```

#### Add New Work Experience/Internship
```
POST /api/profile/experience
Content-Type: application/json

{
  "company": "Tech Corp",
  "role": "Software Intern",
  "type": "Internship",
  "startDate": "Jun 2024",
  "endDate": "Aug 2024",
  "current": false,
  "description": "Worked on backend APIs",
  "technologies": ["Node.js", "MongoDB"]
}
```

#### Add New Skill
```
POST /api/profile/skill
Content-Type: application/json

{
  "skill": "Docker"
}
```

#### Add Education
```
POST /api/profile/education
Content-Type: application/json

{
  "institution": "XYZ University",
  "degree": "B.Tech",
  "field": "Computer Science",
  "startYear": "2021",
  "endYear": "2025"
}
```

### Query Endpoints

#### Get All Projects
```
GET /api/projects
```

#### Search Projects by Skill
```
GET /api/projects?skill=react
```

#### Get Top Skills
```
GET /api/skills/top?limit=5
```

#### Universal Search
```
GET /api/search?q=keyword
```
Searches across skills, projects, and work experience

### Delete Operations

#### Delete Project
```
DELETE /api/profile/project/:id
```

#### Delete Work Experience
```
DELETE /api/profile/experience/:id
```

## 🧪 Testing with Postman/cURL

### Example: Get Profile
```bash
curl http://localhost:5000/api/profile
```

### Example: Add Project
```bash
curl -X POST http://localhost:5000/api/profile/project \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "A test project",
    "technologies": ["React", "Node.js"]
  }'
```

## 🌐 Deployment

### Deploy to Render

1. Push code to GitHub
2. Create account on [Render.com](https://render.com)
3. Create new **Web Service**
4. Connect your GitHub repo
5. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Deploy!

### Deploy to Railway

1. Push code to GitHub
2. Create account on [Railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Select your repo
5. Add environment variables if needed
6. Deploy!

## 📝 Sample curl Commands for Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Get profile
curl http://localhost:5000/api/profile

# Add skill
curl -X POST http://localhost:5000/api/profile/skill \
  -H "Content-Type: application/json" \
  -d '{"skill": "TypeScript"}'

# Search projects
curl "http://localhost:5000/api/projects?skill=react"

# Universal search
curl "http://localhost:5000/api/search?q=node"
```

## 🔑 Key Features for Assignment

✅ **Dynamic Profile** - Can update without code changes  
✅ **CRUD Operations** - Full Create, Read, Update, Delete support  
✅ **Query Endpoints** - Search by skills, filter projects  
✅ **Health Check** - `/api/health` endpoint  
✅ **Proper Database** - SQLite (no installation needed!)  
✅ **Seeded Data** - Real profile data included  
✅ **RESTful Design** - Clean API structure  
✅ **Easy Deployment** - Works on all platforms  

## 📄 Resume Link

Update your resume link in the seed data or via API:

```json
{
  "links": {
    "resume": "https://drive.google.com/file/d/YOUR-RESUME-LINK"
  }
}
```

## 🐛 Known Limitations

- Single user profile (perfect for personal portfolio)
- No authentication (can be added later)
- File-based database (SQLite) - great for development

## 📧 Contact

- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]

## 📜 License

MIT License - Free to use for your assignment!

---

**Made with ❤️ for Track A Assessment**