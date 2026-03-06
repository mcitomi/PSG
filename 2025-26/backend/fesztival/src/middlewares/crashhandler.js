export default (err, req, res, next) => {
    console.log(err);
    
    if(err.message.includes("Invalid")) {
        res.status(400).json({message: err.message});
        return;
    }

    if(err.message.includes("Duplicate entry")) {
        res.status(409).json({message: "This user already registered"});
        return;
    }

    res.status(500).json({message: "Server error"});
}