import { Router } from "express";
import { postBook, getBooks } from "../Controllers/bookController.js";
import validateAuth from "../Middlewares/validateAuth.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { addBookSchema } from "../Schemas/bookSchema.js"

const bookRouter = Router();

bookRouter.post('/books', validateSchema(addBookSchema), validateAuth, postBook);
bookRouter.get('/books', getBooks);

export default bookRouter;