import Express, { json } from "express";
import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'todo',
    password: ''
});

const app = Express();

function calculatePriority(taskDate) {
    const timeBetweeenDatesInMs = new Date(taskDate) - Date.now();

    if (timeBetweeenDatesInMs < 259200000 && timeBetweeenDatesInMs > 0) {
        return "High";
    }

    if (timeBetweeenDatesInMs > 259200000 && timeBetweeenDatesInMs < 604800000) {
        return "Medium";
    }

    return "Low";
}

app.use(json());

app.get("/tasks", async (req, res) => {
    try {
        const [queryResults,] = await pool.query("SELECT * FROM tasks");

        const results = [];

        queryResults.forEach(element => {
            let task = element;
            task.due_date = new Date(element.due_date).toString();
            task.priority = calculatePriority(element.due_date);
            task.status = new Date(element.due_date) - Date.now() > 0 ? "Pending" : "Completed";
            results.push(task);
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.post("/tasks", async (req, res) => {
    const errors = [];
    try {
        const body = req.body;

        if (Object.keys(body).length !== 3) {
            errors.push("Invalid request body, must contains 3 fields.");
        }

        if (!body?.title || typeof (body?.title) !== "string") {
            errors.push("Invalid 'title' field, must be given and must be a string");
        }

        if (!body?.description || typeof (body?.description) !== "string") {
            errors.push("Invalid 'description' field, must be given and must be a string");
        }

        if (!body?.due_date || typeof (body?.due_date) !== "string") {
            errors.push("Invalid 'due_date' field, must be given and must be a string");
        }

        if (errors.length !== 0) {
            res.status(400).json({
                "errors": errors
            });
            return;
        }

        const [insertQueryResults,] = await pool.query(
            "INSERT INTO tasks (title, description, due_date) VALUES (?,?,?);",
            [body.title, body.description, body.due_date]
        );

        if (insertQueryResults.affectedRows !== 1) {
            throw new Error("Failed to insert data.");
        }

        res.status(201).json({
            "message": "Post created!"
        });

    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = Number.parseInt(req.params.id);

        if (isNaN(taskId)) {
            throw new Error("Task id must be a number");
        }

        const [queryResults, ] = await pool.query("SELECT * FROM tasks WHERE id = ?;", [taskId]);

        if(queryResults.length !== 1) {
            throw new Error("Failed to get this task from the db.");   
        }

        queryResults[0].due_date = new Date(queryResults[0].due_date).toString();
        queryResults[0].priority = calculatePriority(queryResults[0].due_date);
        queryResults[0].status = new Date(queryResults[0].due_date) - Date.now() > 0 ? "Pending" : "Completed";

        res.json(queryResults[0]);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    const errors = [];
    try {
        const body = req.body;
        const taskId = Number.parseInt(req.params.id);

        if (isNaN(taskId)) {
            errors.push("Task id must be a number");
        }

        if (Object.keys(body).length !== 3) {
            errors.push("Invalid request body, must contains 3 fields. (title, description, due_date)");
        }

        if (!body?.title || typeof (body?.title) !== "string") {
            errors.push("Invalid 'title' field, must be given and must be a string");
        }

        if (!body?.description || typeof (body?.description) !== "string") {
            errors.push("Invalid 'description' field, must be given and must be a string");
        }

        if (!body?.due_date || typeof (body?.due_date) !== "string") {
            errors.push("Invalid 'due_date' field, must be given and must be a string");
        }
        
        if (errors.length !== 0) {
            res.status(400).json({
                "errors": errors
            });
            return;
        }

        const [updateResults, ] = await pool.query(
            "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?",
            [body.title, body.description, body.due_date, taskId]
        );

        if(updateResults.affectedRows !== 1) {
            throw new Error("Failed to update task!");
        }

        res.json({
            "message" : "Task updated!"
        });
        
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = Number.parseInt(req.params.id);

        if (isNaN(taskId)) {
            throw new Error("Task id must be a number");
        }

        const [deleteQuery, ] = await pool.query(
            "DELETE FROM tasks WHERE id = ?;", [taskId]
        );

        if(deleteQuery.affectedRows !== 1) {
            throw new Error("Failed to delete task");
        }

        res.json({
            "message" : "Task deleted!"
        });
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.listen(3000, () => {
    console.log("App started");
});