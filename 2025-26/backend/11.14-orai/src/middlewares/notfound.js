export function notfound(req, res, next) {
    res.status(404).json({message: "404 page not found"});
}