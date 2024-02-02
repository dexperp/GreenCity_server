import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {postCreateValidation} from "../validations.js";
import {PostController} from "../controllers/index.js";
import {Router} from "express";


export const PostRouter = new Router();
PostRouter.get('/', PostController.getAll);
PostRouter.get('/:id', PostController.getOne);
PostRouter.post('/:id/like',checkAuth,PostController.likePost);
PostRouter.post('/', checkAuth,PostController.uploadMedia, postCreateValidation, handleValidationErrors, PostController.create);
PostRouter.delete('/:id', checkAuth, PostController.remove);
PostRouter.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
