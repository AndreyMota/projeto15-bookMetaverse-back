import { Router } from "express";
import { addCart } from "../Controllers/addCController.js";
import { validaToken } from "../middlewares/validateToken.js";
import { validaAdic } from "../middlewares/validateCart.js";

const addCartRoute = Router();
addCartRoute.post('/add-cart', validaToken, validaAdic, addCart);