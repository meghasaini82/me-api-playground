const db = require('../config/db.js');

class Profile {
    static getProfile(userId = 1) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
                if (err) return reject(err);
                if (!user) return resolve(null);

                db.all('SELECT * FROM skills WHERE user_id = ?', [userId], (err, skills) => {
                    if (err) return reject(err);

                    db.all('SELECT * FROM projects WHERE user_id = ?', [userId], (err, projects) => {
                        if (err) return reject(err);

                        projects = projects.map(p => ({
                            ...p,
                            technologies: p.technologies ? JSON.parse(p.technologies) : []
                        }));

                        db.all('SELECT * FROM work_experience WHERE user_id = ?', [userId], (err, workExperience) => {
                            if (err) return reject(err);

                            workExperience = workExperience.map(w => ({
                                ...w,
                                technologies: w.technologies ? JSON.parse(w.technologies) : [],
                                current: Boolean(w.current)
                            }));

                            db.get('SELECT * FROM resume WHERE user_id = ?', [userId], (err, resume) => {
                                if (err) return reject(err);

                                resolve({
                                    ...user,
                                    skills,
                                    projects,
                                    workExperience,
                                    resume
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    static createProfile(data) {
        return new Promise((resolve, reject) => {
            const { name, email, education, about, github, linkedin, portfolio } = data;

            const sql = `INSERT INTO users (name, email, education, about, github, linkedin, portfolio) 
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;

            db.run(sql, [name, email, education, about, github, linkedin, portfolio], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, ...data });
            });
        });
    }

    static updateProfile(userId, data) {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];

            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(data[key]);
                }
            });

            if (fields.length === 0) {
                return resolve({ updated: false });
            }

            values.push(userId);
            const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

            db.run(sql, values, function (err) {
                if (err) return reject(err);
                resolve({ updated: this.changes > 0 });
            });
        });
    }

    static addSkill(userId, skillName) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO skills (user_id, name) VALUES (?, ?)';

            db.run(sql, [userId, skillName], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, user_id: userId, name: skillName });
            });
        });
    }

    static deleteSkill(skillId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM skills WHERE id = ?', [skillId], function (err) {
                if (err) return reject(err);
                resolve({ deleted: this.changes > 0 });
            });
        });
    }

    static addProject(userId, projectData) {
        return new Promise((resolve, reject) => {
            const { title, description, technologies, links, startDate, endDate } = projectData;

            const sql = `INSERT INTO projects (user_id, title, description, technologies, github_link, live_link, start_date, end_date) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const techJson = JSON.stringify(technologies || []);

            db.run(sql, [
                userId,
                title,
                description,
                techJson,
                links?.github || null,
                links?.live || null,
                startDate || null,
                endDate || null
            ], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, ...projectData });
            });
        });
    }

    static deleteProject(projectId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM projects WHERE id = ?', [projectId], function (err) {
                if (err) return reject(err);
                resolve({ deleted: this.changes > 0 });
            });
        });
    }

    static addExperience(userId, expData) {
        return new Promise((resolve, reject) => {
            const { company, role, type, description, technologies, startDate, endDate, current } = expData;

            const sql = `INSERT INTO work_experience (user_id, company, role, type, description, technologies, start_date, end_date, current) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const techJson = JSON.stringify(technologies || []);

            db.run(sql, [
                userId,
                company,
                role,
                type || null,
                description || null,
                techJson,
                startDate || null,
                endDate || null,
                current ? 1 : 0
            ], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, ...expData });
            });
        });
    }

    static deleteExperience(expId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM work_experience WHERE id = ?', [expId], function (err) {
                if (err) return reject(err);
                resolve({ deleted: this.changes > 0 });
            });
        });
    }

    static updateResume(userId, resumeUrl) {
        return new Promise((resolve, reject) => {
            const insertSql = 'INSERT INTO resume (user_id, resume_url) VALUES (?, ?)';

            db.run(insertSql, [userId, resumeUrl], function (err) {
                if (err) {
                    const updateSql = 'UPDATE resume SET resume_url = ? WHERE user_id = ?';
                    db.run(updateSql, [resumeUrl, userId], function (err) {
                        if (err) return reject(err);
                        resolve({ updated: true, resume_url: resumeUrl });
                    });
                } else {
                    resolve({ created: true, resume_url: resumeUrl });
                }
            });
        });
    }

    static searchProjectsBySkill(skill) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects WHERE technologies LIKE ?`;

            db.all(sql, [`%${skill}%`], (err, projects) => {
                if (err) return reject(err);

                projects = projects.map(p => ({
                    ...p,
                    technologies: p.technologies ? JSON.parse(p.technologies) : []
                }));

                resolve(projects);
            });
        });
    }
}

module.exports = Profile;