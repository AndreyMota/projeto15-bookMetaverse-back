import db from "../Database/databaseConnection.js";

export default async function validateAuth(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);
        
        res.locals.sessionId = session._id;
        res.locals.userId = session.userId;
    } catch (err) {
        res.status(500).send(err.message);
    }

    next();
}