export default (err, req, res, next) => {
    console.log(err);

    if (err.message.includes("Invalid")) {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Valami hiba történt" });
}