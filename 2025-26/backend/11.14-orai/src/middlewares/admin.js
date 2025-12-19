export function isAdmin(req, res, next) {
    const auth = req.headers.authorization;

    if(!auth) {
        return res.status(401).json({error: "Authorization required", message: "Invalid login"})
    }
    
    const token = auth.split(' ')[1];

    if(token != "bangó") {
        return res.status(401).json({error: "Unauthorized", message: "Invalid login"})
    }

    next();
}