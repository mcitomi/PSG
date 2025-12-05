import jwt from "jsonwebtoken";
import { SECRET } from "../server.js";

export default function auth(req, res, next) {
    const token = req.cookies["token"];
    
    const payload = jwt.verify(token, SECRET);

    req.userId = payload.id;
    req.userRole = payload.role;

    next();
}