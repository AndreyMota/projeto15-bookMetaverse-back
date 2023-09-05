import { Router } from "express";
import accountRouter from "./accountRouter.js";
import bookRouter from "./bookRouter.js";
import cartRouter from "./cartRouter.js";

const router = Router();
router.get('/', (req, res) => res.send('Opa'));

router.use(accountRouter);
router.use(bookRouter);
router.use(cartRouter);

export default router;