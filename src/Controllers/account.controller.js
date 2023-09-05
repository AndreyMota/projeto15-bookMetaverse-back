import bcrypt from "bcrypt"
import db from "../database/database.connection.js"
import {v4 as uuid} from "uuid"

export async function signUp(req, res) {
    const { name, email, password, photo } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já foi cadastrado!")

        const hash = bcrypt.hashSync(password, 4)

        await db.collection("users").insertOne({ name, email, password: hash, photo })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("E-mail não cadastrado!")

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) return res.status(401).send("Senha incorreta! Tente novamente")

        const token = uuid()
        await db.collection("sessions").insertOne({ token, userId: user._id })

        res.send({ token, userName: user.name, photo: user.photo})

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logout(req, res) {
    const token = res.locals.session.token

    try {
        await db.collection("sessions").deleteOne({ token })
        res.sendStatus(200)//succefully logout
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function EditUser(req, res){
    const { author, city, gender, photo, name } = req.body
    const authorization = req.headers.authorization;
    const userId = await db.collection("sessions").findOne({ token:authorization });
    const user = await db.collection('users').findOne({_id:userId.userId});
    try{
        await db.collection("users").updateOne({_id: user._id}, { $set: { author, city, gender, name, photo } })
        res.sendStatus(201)
    } catch{
        res.status(500).send(err.message)
    }
}