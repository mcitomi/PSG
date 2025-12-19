import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const arr = [
    {
        name: "Mate",
        age: 21,
        foot: 41
    },
    {
        name: "bango",
        age: 18,
        foot: 47
    },
    {
        name: "program",
        age: 0,
        foot: null
    },
    {
        name: "Zalan",
        age: 67,
        foot: 36
    }
];

app.get("/users", (req, res) => {   // Lekérdezési paraméter
    try {
        const userId = parseInt(req.query.id);

        if (isNaN(userId)) {
            throw new Error("Invalid userid");
        }

        if (userId < 0 || userId > arr.length - 1) {
            throw new Error("Notfound userid");
        }

        res.send(arr[userId]);
    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({message: error.message});
        }
        if (error.message.includes("Notfound")) {
            return res.status(404).json({message: error.message});
        }
        res.status(500).json({message: error.message});
    }
});

app.get("/users/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    res.send(arr[userid]);
});

app.post("/users/add", (req, res) => {  // alt + shift + f = formazas
    try {
        const body = req.body;

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body object");
        }

        if(!body.name || typeof(body.name) !== "string") {
            throw new Error("Invalid name");
        }

        if(!body.age || typeof(body.age) !== "number") {
            throw new Error("Invalid age");
        } 

        if(!body.foot || typeof(body.foot) !== "number") {
            throw new Error("Invalid foot");
        } 

        arr.push({
            name: body.name,
            age: body.age,
            foot: body.foot
        });

        res.status(201).json({
            message: "Created!"
        });
        
    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({message: error.message});
    }
});

app.get("/user/:name", (req, res) => {
    const name = req.params.name;
    const user = arr.find(x => x.name == name);
    user ? res.json(user) : res.status(404).json({message: "User not found!"});
});

app.listen(3000, () => {
    console.log("started");
});
