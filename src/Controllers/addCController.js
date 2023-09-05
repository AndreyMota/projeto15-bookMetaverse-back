import db from "../database/database.connection.js";

export async function addCart(req, res) {
    const { id, name, url, amount, subtotal } = req.body;
    res.send(amount);
    try {
        const user = await db.collection("users").findOne({_id: req.userId});

    } catch (error) {
        
    }
}