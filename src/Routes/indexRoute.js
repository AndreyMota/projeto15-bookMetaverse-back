import { Router } from "express";
import bookRoute from "./bookRoute.js";
import accountRouter from "./account.route.js";

const router = Router();
router.get('/', (req, res) => res.send('Opa'));

router.use(accountRouter)
router.use(bookRoute);

export default router;