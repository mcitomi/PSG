export default function errhandler(err, req, res, next) {
    console.log(err);
    
    if(err.message.includes("Invalid")) {
        return res.status(400).json({err: err.message, message: "Felhasználói hiba"});
    } 

    res.status(500).json({err: err.message, message: "Szerveroldali hiba"});
}