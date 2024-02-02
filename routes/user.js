import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {updateValidation} from "../validations.js";
import {UserController} from '../controllers/index.js'
import {Router} from "express";


export const UserRouter = new Router();

UserRouter.get('/', checkAuth, UserController.getCurrentUser);
UserRouter.patch('/update/:id',checkAuth,updateValidation,handleValidationErrors,UserController.update)
// UserRouter.post('/disable/:id',checkAuth)

UserRouter.post('/uploadAvatar', checkAuth, UserController.uploadAvatar,UserController.updateAvatar);
