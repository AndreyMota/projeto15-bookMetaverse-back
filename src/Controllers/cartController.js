import { ObjectId } from "mongodb";
import db from "../Database/databaseConnection.js";
import dayjs from 'dayjs';

dayjs().format();

export async function putCart(req, res) {
    const bookId = new ObjectId(req.body.bookId);
    const add = req.body.add;
    const userId = res.locals.userId;

    try {
        const user = await db.collection("users").findOne({ _id: userId });
        const book = await db.collection("books").findOne({ _id: bookId });

        const item = user.cart.find(x => x.bookId.equals(bookId));
        const { name, img, section } = { ...book };

        // // Caso for remover um item que não está no carrinho:
        if (!add && !item) { res.sendStatus(400) }

        // Caso for adicionar um item que não está no carrinho:
        if (add && !item) {
            const newItem = { bookId, name, img, section, subtotal: book.price, amount: 1 };
            await db.collection('users').updateOne(
                { _id: userId },
                {
                    $push: {
                        cart: {
                            $each: [newItem],
                            $position: 0
                        }
                    }
                },
                { upsert: true }
            );
            res.sendStatus(200);
        }

        // Caso for remover um item do carrinho:
        if (!add && item) {
            const cart = user.cart;
            if (item.amount === 1) {
                await db.collection('users').updateOne(
                    { _id: userId },
                    { $set: { cart: cart.filter(x => !x.bookId.equals(bookId)) } },
                );
                res.sendStatus(200);
            } else if (item.amount > 1) {
                cart[cart.indexOf(item)] = { ...item, subtotal: item.subtotal - book.price, amount: item.amount - 1 }
                await db.collection('users').updateOne(
                    { _id: userId },
                    { $set: { cart } },
                );
                res.sendStatus(200);
            }
        }

        // Caso for adicionar mais um item no carrinho:
        if (add && item) {
            const cart = user.cart;
            cart[cart.indexOf(item)] = { ...item, subtotal: item.subtotal + book.price, amount: item.amount + 1 };
            await db.collection('users').updateOne(
                { _id: userId },
                { $set: { cart } },
            );
            res.sendStatus(200);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCart(req, res) {
    const userId = res.locals.userId;

    try {
        const user = await db.collection("users").findOne({ _id: userId });
        const cart = user.cart;
        res.send(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postOrder(req, res) {
    const userId = res.locals.userId;
    try {
        const user = await db.collection("users").findOne({ _id: userId });
        const cart = user.cart;
        const dateTime = dayjs().format('HH:mm:ss, DD/MM/YYYY');
        const subtotal = cart.map(x => x.subtotal).reduce((a, b) => a + b);
        
        const newOrder = { cart, dateTime, subtotal };
        await db.collection('users').updateOne(
            { _id: userId },
            { 
                $set: { cart: [] } ,
                $push: {
                    orders: {
                        $each: [newOrder],
                        $position: 0
                    }
                }
            },
            { upsert: true }
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}