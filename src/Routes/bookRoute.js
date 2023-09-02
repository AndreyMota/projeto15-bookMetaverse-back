import { Router } from "express";
import { verifyBook } from "../Schemas/bookSchema.js";
import { addBook, getBooks } from "../Controllers/bookController.js";
const bookRoute = Router();

bookRoute.post('/book', verifyBook, addBook);
bookRoute.get('/books', getBooks);

export default bookRoute;