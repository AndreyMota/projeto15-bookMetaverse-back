import { Router } from "express";
import { verifyBook } from "../Schemas/bookSchema.js";
import { addBook } from "../Controllers/bookController.js";
const bookRoute = Router();

bookRoute.post('/book', verifyBook, addBook);

export default bookRoute;