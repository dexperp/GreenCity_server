import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {userUpdateValidation} from "../validations.js";
import {UserController} from '../controllers/index.js'
import {Router} from "express";


export const UserRouter = new Router();

UserRouter.get('/', checkAuth, UserController.getCurrentUser);
UserRouter.get('/:id',checkAuth,UserController.getUserByID);
UserRouter.patch('/:id',checkAuth,userUpdateValidation,handleValidationErrors,UserController.update)
// UserRouter.post('/disable/:id',checkAuth)

UserRouter.post('/uploadAvatar', checkAuth, UserController.uploadAvatar,UserController.updateAvatar);
