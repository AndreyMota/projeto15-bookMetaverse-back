import { Router } from "express";
import { signUp, signIn, logOut, getUserInfo, editUserInfo} from "../Controllers/accountController.js";
import validateAuth from "../Middlewares/validateAuth.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { SignInSchema, SignUpSchema, EditUserSchema } from "../Schemas/accountSchema.js";

const accountRouter = Router();

accountRouter.post('/cadastro', validateSchema(SignUpSchema), signUp);
accountRouter.post('/login', validateSchema(SignInSchema), signIn);
accountRouter.delete('/logout', validateAuth, logOut);
accountRouter.get('/info-usuario', getUserInfo);
accountRouter.put('/editar-usuario', validateSchema(EditUserSchema), editUserInfo)

export default accountRouter;