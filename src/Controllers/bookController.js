import db from "../Database/databaseConnection.js";

export async function postBook(req, res) {
    try {
        const { name, img, price, section } = req.body;
        const result = await db.collection("books").insertOne({ name, img, price, section });
    
        res.status(201).json({ message: "Livro adicionado com sucesso", data: result });
    } catch (error) {
        console.error("Erro ao adicionar livro:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

export async function getBooks(req, res) {
    try {
        const result = await db.collection("books").find().toArray();
        res.status(200).send(result);
    } catch (error) {
        console.error("Erro ao solicitar livrs:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}