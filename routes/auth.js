import {Router} from "express";
import {loginValidation, registerValidation} from "../validations.js";
import {handleValidationErrors} from "../utils/index.js";
import {UserController} from "../controllers/index.js";

export const AuthRouter = new Router();
AuthRouter.post('/login', loginValidation, handleValidationErrors, UserController.login);
AuthRouter.post('/register', registerValidation, handleValidationErrors, UserController.register);
