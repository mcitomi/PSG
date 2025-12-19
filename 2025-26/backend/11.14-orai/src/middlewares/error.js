export function error(err, req, res, next) {
    console.log(err);
    res.status(500).json({message: "Szerver hiba", error: err.message});
}