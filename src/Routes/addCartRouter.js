import { Router } from "express";
import { addCart } from "../Controllers/addCartController.js";
import { validaToken } from "../Middlewares/validateToken.js";
import { validaAdic } from "../Middlewares/validateCart.js";

const addCartRouter = Router();
addCartRouter.post('/add-cart', validaToken, validaAdic, addCart); 

export default addCartRouter;