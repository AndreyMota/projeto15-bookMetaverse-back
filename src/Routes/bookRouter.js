import { Router } from "express";
import { verifyBook } from "../Schemas/bookSchema.js";
import { postBook, getBooks } from "../Controllers/bookController.js";
const bookRouter = Router();

bookRouter.post('/books', verifyBook, postBook);
bookRouter.get('/books', getBooks);

export default bookRouter;