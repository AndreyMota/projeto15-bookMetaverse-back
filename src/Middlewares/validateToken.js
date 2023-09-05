import db from "../Database/databaseConnection.js";


export async function validaToken(req, res, next) {
    try {
        const htk =  req.headers.authorization;
    
        if (!htk) {
            return res.status(401).send("Token não fornecido");
        } 

        const token = htk.replace("Bearer ", "");
        const user = await db.collection("sessions").findOne({ token });

        if (!user) {
            return res.status(401).send("Token inválido");
        }
        
        req.userId = user.userId;

        next();
        
    } catch (error) {
        return res.status(500).send(error);
    }
    

}