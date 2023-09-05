import { Router } from "express";
import accountRouter from "./accountRouter.js";
import bookRouter from "./bookRouter.js";
import addCartRouter from "./addCartRouter.js";

const router = Router();
router.get('/', (req, res) => res.send('Opa'));

router.use(accountRouter);
router.use(bookRouter);
router.use(addCartRouter);

export default router;