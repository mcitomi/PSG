import JWT from "jsonwebtoken";

import { SECRET } from "../index.js";

export default (req, res, next) => {
    const token = req.cookies["jwt"];

    const payload = JWT.verify(token, SECRET);

    req.user = payload;

    next();
}