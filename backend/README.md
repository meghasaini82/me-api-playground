# Me-API Playground - Backend

Dynamic Portfolio API built with Node.js, Express, and SQLite.

## 🎯 Assignment: Track A - Backend Assessment

This project fulfills all requirements for the "Me-API Playground" backend assessment:
- ✅ Complete CRUD operations for profile management
- ✅ Dynamic data storage (no hardcoded values)
- ✅ Skill-based project search (`GET /projects?skill=python`)
- ✅ Health check endpoint (`GET /health`)
- ✅ RESTful API design
- ✅ Database integration (SQLite)
- ✅ CORS configured for frontend

- 
RESUME  ......
[📄 Click here to view my Resume](./resume.pdf)
---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Sample Data
```bash
npm run seed
```

### 3. Start Server
```bash
npm start
```

Server will run on: http://localhost:5000

---

## 📋 API Endpoints

### Health Check (Required)
```
GET /health
Response: {"status": "ok"}
```

### Profile Management
```
GET    /api/v1/profile          # Get complete profile
POST   /api/v1/profile          # Create profile
PUT    /api/v1/profile          # Update profile
```

### Skills (Dynamic Add/Delete)
```
POST   /api/v1/profile/skill    # Add skill
DELETE /api/v1/profile/skill/:id # Delete skill
```

### Projects (Dynamic Add/Delete)
```
POST   /api/v1/profile/project      # Add project
DELETE /api/v1/profile/project/:id  # Delete project
```

### Project Search (Assignment Requirement!)
```
GET /api/v1/projects?skill=python
```
Returns all projects containing the specified skill.

### Work Experience (Dynamic Add/Delete)
```
POST   /api/v1/profile/experience      # Add experience
DELETE /api/v1/profile/experience/:id  # Delete experience
```

### Resume
```
POST /api/v1/profile/resume    # Add/Update resume
```

---

## 🗄️ Database Schema

### Users Table
- id, name, email, education, about
- github, linkedin, portfolio

### Skills Table
- id, user_id, name

### Projects Table
- id, user_id, title, description
- technologies (JSON), github_link, live_link
- start_date, end_date

### Work Experience Table
- id, user_id, company, role, type
- description, technologies (JSON)
- start_date, end_date, current

### Resume Table
- id, user_id, resume_url

---

## 🔧 Environment Variables

Create a `.env` file:
```
PORT=5000
DB_PATH=./database.sqlite
```

---

## 🎯 Key Features (Assignment Specific)

### 1. Dynamic Data
All data is stored in database and can be modified via API calls. No hardcoded values.

### 2. Skill-Based Search
```javascript
// Example
GET /api/v1/projects?skill=python

// Returns projects where tech_stack contains "python"
```

### 3. CRUD Operations
Complete Create, Read, Update, Delete for:
- Profile
- Skills
- Projects
- Work Experience
- Resume

### 4. Health Endpoint
```
GET /health
→ 200 OK
```

---

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Libraries**: cors, dotenv, body-parser

---

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:5000/health
```

### Test Profile Endpoint
```bash
curl http://localhost:5000/api/v1/profile
```

### Test Project Search
```bash
curl "http://localhost:5000/api/v1/projects?skill=python"
```

---

## 📚 API Documentation

Full API docs available at:
```
GET /api/v1/docs
```

---

## 🎓 Assignment Checklist

- [x] Backend with API endpoints
- [x] Database integration
- [x] CRUD operations
- [x] Dynamic data (no hardcoding)
- [x] Health endpoint (`/health`)
- [x] Query endpoints (`/projects?skill=X`)
- [x] CORS configured
- [x] Clean code structure
- [x] Documentation (README)

---

## 👤 Author

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

## 📄 License

MIT
