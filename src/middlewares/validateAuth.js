import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    
    if (!token) return res.sendStatus(401);
    
    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);
        res.locals.userId = session.userId;
    } catch (err) {
        res.status(500).send(err.message);
    }
    
    next();
}