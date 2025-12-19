import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "teaching_site"
});

pool.on("connection", () => {
    console.log("SQL Connection created.");
});

app.get("/teachers", async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const [teacherResult] = await conn.query(`
            SELECT *
            FROM teachers;
            `)
        if (teacherResult.lenght < 1) {
            throw new Error("Table not found.");
        }
        res.status.json({ teacherResult });
        pool.releaseConnection(conn);
    } catch (error) {
        if (error.message.includes("not found")) {
            res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Server error." });
    }
});

app.get("/teachers/:id", async (req, res) => {
    const conn = await pool.getConnection();
    const teacherId = parseInt(req.params.id);
    try {
        if (isNaN(teacherId)) {
            throw new Error("Invalid teacher id");
        }
        const [idTeacherResult] = await conn.query(`
            SELECT *
            FROM teachers
            WHERE id = ?;
            `, [teacherId])
        if (idTeacherResult.length < 1) {
            throw new Error("Teacher not found.");
        }
        res.status(200).json({ idTeacherResult });
        pool.releaseConnection(conn);
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes("Invalid")) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Server error." });
    }
});

app.get("/courses/", async (req, res) => {
    const conn = await pool.getConnection();
    const teacher = req.query.teacher;
    try {
        if (!teacher) {
            const [courseResult] = await conn.query(`
                SELECT *
                FROM courses;
                `)
            res.status(200).json({ courseResult });
        } else {
            const [teacherCourseResult] = await conn.query(`
                SELECT courses.id, courses.name, courses.description, courses.length, teachers.name
                FROM courses INNER JOIN teachers ON teachers.id = courses.teacher_id
                WHERE teachers.name = ?;
                `, [teacher])
            if (teacherCourseResult.length < 1) {
                throw new Error("Teacher not found.");
            }
            res.status(200).json({ teacherCourseResult });
        }
        pool.releaseConnection(conn);
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Server error." });
    }
});

// PUT PATCH = POST

// patch: egy adat részleges frissítése, pl tanár kora
app.patch("/tanarok/:id", async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const teacherId = req.params.id;
        const { age } = req.body;

        if(!age || age < 15 || age > 120) {
            return res.status(400).json({message: "Invalid age"});
        }

        const [teacher] = await conn.query("SELECT * FROM teachers WHERE id = ?;", [teacherId]);

        if(!teacher || teacher.lenght < 1) {
            return res.status(404).json({message: "Teacher not found"});
        }

        const [updatedTeacher] = await conn.query("UPDATE teachers SET age = ? WHERE id = ?;", [age, teacherId]);

        if(updatedTeacher.affectedRows != 1) {
            return res.status(503).json({message: "Database error"});
        }

        pool.releaseConnection(conn);

        res.json({message: "Updated"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post("/tanarok", async (req, res) => {
    try {
        const body = req.body;

        if(Object.keys(body).length != 2) { // 2 bementi adat a body-ban, age, name
            throw new Error("Invalid body");
        }

        if(!body.age || typeof(body.age) != "number" || body.age < 15  || body.age > 120) {
            throw new Error("Invalid age"); 
        }

        if(!body.name || typeof(body.name) != "string") {
            throw new Error("Invalid name");
        }

        const [insertRes] = await pool.query("INSERT INTO teachers (age, name) VALUES (?,?);", [body.age, body.name]);

        if(insertRes.affectedRows !== 1) {
            throw new Error("Failed to insert");
        }

        res.status(201).json({message: "Created"});

    } catch (error) {
        if(error.message.includes("Invalid")) {
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({message: error.message});
    }
});

app.listen(3000, () => {
    console.log("The server is running.");
});