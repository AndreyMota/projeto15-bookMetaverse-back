import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { signUp, signIn, logout, EditUser } from "../Controllers/account.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { SignInSchema, SignUpSchema, EditUserSchema } from "../Schemas/account.schema.js";

const accountRouter = Router();

accountRouter.post('/cadastro', validateSchema(SignUpSchema), signUp);
accountRouter.post('/login', validateSchema(SignInSchema), signIn);
accountRouter.post('/logout', validateAuth, logout);
accountRouter.post('/editar-usuario', validateSchema(EditUserSchema), EditUser)

export default accountRouter;