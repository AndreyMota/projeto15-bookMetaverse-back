import { Router } from "express";
import bookRoute from "./bookRoute.js";

const router = Router();
router.get('/', (req, res) => res.send('Opa'));
router.use(bookRoute);

export default router;