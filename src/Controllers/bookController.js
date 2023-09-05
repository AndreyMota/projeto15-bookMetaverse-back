import db from "../Database/databaseConnection.js";

export async function postBook(req, res) {
    try {
        const { name, img, price, section } = req.body;
        const result = await db.collection("books").insertOne({ name, img, price, section });
    
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getBooks(req, res) {
    try {
        const result = await db.collection("books").find().toArray();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}