import { Router } from "express";
import { putCart, getCart, postOrder } from "../Controllers/cartController.js";
import validateAuth from "../Middlewares/validateAuth.js";

const cartRouter = Router();
cartRouter.put('/cart', validateAuth, putCart);
cartRouter.get('/cart', validateAuth, getCart);
cartRouter.post('/orders', validateAuth, postOrder);

export default cartRouter;