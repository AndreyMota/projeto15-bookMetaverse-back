import db from "../Database/databaseConnection.js"

export async function getHistory(req, res) {
    const userId = res.locals.userId;

    try {
        const user = await db.collection('users').findOne({ _id: userId });
        res.send(user.orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}