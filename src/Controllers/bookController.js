import db from "../database/database.connection.js";

export async function addBook(req, res) {
    try {
        const { img, name, price, section } = req.body;
        const result = await db.collection("books").insertOne({ name, img, price, section });
    
        res.status(201).json({ message: "Livro adicionado com sucesso", data: result });
    } catch (error) {
        console.error("Erro ao adicionar livro:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}