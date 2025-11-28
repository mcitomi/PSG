import JWT from "jsonwebtoken";
import { SECRET } from "../index.js";

export default (req, res, next) => {
    const token = req.cookies.token;

    const payload = JWT.verify(token, SECRET);

    req.userId = payload.id;

    next();
}