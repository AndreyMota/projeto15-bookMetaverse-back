import { ObjectId } from "mongodb";
import db from "../Database/databaseConnection.js";

export async function addCart(req, res) {
    const { id, name, url, amount, subtotal } = req.body;
    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(req.userId) });

        if (user.cart) {
            let productExists = false;

            user.cart.forEach((x) => {
                if (x.id === id) {
                    console.log('o produto ja existe');
                    // O produto já existe no carrinho, então atualize a quantidade e subtotal.
                    x.amount += amount;
                    x.subtotal += subtotal;
                    productExists = true;
                }
            });

            // Se o produto não existe no carrinho, adicione-o.
            if (!productExists) {
                user.cart.push({
                    id,
                    name,
                    url,
                    amount,
                    subtotal,
                });
            }

            // Atualize o documento do usuário no banco de dados.
            await db.collection("users").updateOne(
                { _id: new ObjectId(req.userId) },
                { $set: { cart: user.cart } }
            );

            res.status(200).json({ message: "Produto adicionado ao carrinho com sucesso!" });
        } else {
            // Se o carrinho do usuário estiver vazio, crie um novo carrinho com o produto.
            await db.collection("users").updateOne(
                { _id: new ObjectId(req.userId) },
                { $set: { cart: [{ id, name, url, amount, subtotal }] } }
            );

            res.status(200).json({ message: "Produto adicionado ao carrinho com sucesso." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro ao adicionar o produto ao carrinho." });
    }
}




/* import { ObjectId } from "mongodb";
import db from "../database/database.connection.js";

export async function addCart(req, res) {
    const { id, name, url, amount, subtotal } = req.body;
    try {
        const user = await db.collection("users").findOne({_id: new ObjectId(req.userId)});
        if (user.cart) {
            user.cart.forEach((x) => {
                if (x.id === id) {

                }
            })
        }

    } catch (error) {
        
    }
} */