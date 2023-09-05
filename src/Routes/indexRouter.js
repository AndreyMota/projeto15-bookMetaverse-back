import { Router } from "express";
import accountRouter from "./accountRouter.js";
import bookRouter from "./bookRouter.js";
import cartRouter from "./cartRouter.js";
import historyRouter from "./historyRouter.js";

const router = Router();
router.get('/', (req, res) => res.send('Opa'));

router.use(accountRouter);
router.use(bookRouter);
router.use(cartRouter);
router.use(historyRouter);

export default router;