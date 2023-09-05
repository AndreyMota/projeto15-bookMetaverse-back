import bcrypt from "bcrypt";
import db from "../Database/databaseConnection.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password, photo } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já foi cadastrado!")

        const hash = bcrypt.hashSync(password, 4)

        await db.collection("users").insertOne({ name, email, password: hash, photo, cart: [], orders: [] })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("E-mail não cadastrado!")

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) return res.status(401).send("Senha incorreta! Tente novamente!")

        const token = uuid()
        await db.collection("sessions").insertOne({ token, userId: user._id })

        res.send({ token, name: user.name, photo: user.photo, cart: user.cart, orders: user.orders })

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logOut(req, res) {
    const sessionId = res.locals.sessionId;

    try {
        await db.collection("sessions").deleteOne({ _id: sessionId });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getUserInfo(req, res) {
    const authorization = req.headers.authorization;

    if (!authorization) return res.sendStatus(404);

    try {
        const userId = await db.collection("sessions").findOne({ token: authorization });
        const user = await db.collection('users').findOne({ _id: userId.userId });

        return res.status(200).send({ user: { token: authorization, userName: user.name, photo: user.photo, author: user.author, city: user.city, gender: user.gender } });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message)
    }
}

export async function editUserInfo(req, res) {
    const { author, city, genders, photo, name } = req.body
    const authorization = req.headers.authorization;
    const userId = await db.collection("sessions").findOne({ token: authorization });
    const user = await db.collection('users').findOne({ _id: userId.userId });
    try {
        await db.collection("users").updateOne({ _id: user._id }, { $set: { author, city, genders, name, photo } })
        res.sendStatus(201)
    } catch {
        res.status(500).send(err.message)
    }
}