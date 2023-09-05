import { Router } from "express";
import validateAuth from "../Middlewares/validateAuth.js";
import { getHistory } from "../Controllers/historyController.js";

const historyRouter = Router();

historyRouter.get('/history', validateAuth, getHistory);

export default historyRouter;