export default (err, req, res, next) => {
    if(err.message.includes("Invalid")) {
        return res.status(400).json({err: err.message});
    }
    return res.status(500).json({err: err.message});
}