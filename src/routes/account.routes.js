import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { signUp, signIn, logout, EditUser } from "../controllers/account.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { SignInSchema, SignUpSchema, EditUserSchema } from "../schemas/account.schemas.js";

const accountRouter = Router();

accountRouter.post('/cadastro', validateSchema(SignUpSchema), signUp);
accountRouter.post('/login', validateSchema(SignInSchema), signIn);
accountRouter.post('/logout', validateAuth, logout);
accountRouter.post('/editar-usuario', validateSchema(EditUserSchema), EditUser)

export default accountRouter;