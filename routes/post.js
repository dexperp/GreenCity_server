import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {postCreateValidation} from "../validations.js";
import {PostController, CommentsController,NewsController,CatalogController} from "../controllers/index.js";
import {Router} from "express";


export const PostRouter = new Router();
PostRouter.get('/', PostController.getAll);
PostRouter.get('/:id', PostController.getOne);
PostRouter.get('/:id/like', checkAuth, PostController.likePost);
PostRouter.get('/:id/dislike', checkAuth, PostController.disLikePost);
PostRouter.post('/', checkAuth, PostController.uploadMedia, postCreateValidation, handleValidationErrors, PostController.create);
PostRouter.delete('/:id', checkAuth, PostController.remove);
PostRouter.patch('/:id', checkAuth, PostController.uploadMedia, postCreateValidation, handleValidationErrors, PostController.update);

export const NewsRouter = new Router();
NewsRouter.get('/all',NewsController.readAllNews)
NewsRouter.delete('/:id',NewsController.removeNews)
NewsRouter.post('/',NewsController.createNews)

export const CatalogRouter = new Router();
CatalogRouter.post('/',checkAuth,CatalogController.createCatalog)
CatalogRouter.get('/',CatalogController.getAllCatalog)

export const CommentRouter = new Router();
CommentRouter.get('/:id', CommentsController.getPostComments);
CommentRouter.put('/', checkAuth, CommentsController.create);
CommentRouter.delete('/:id', checkAuth, CommentsController.remove);
CommentRouter.get('/:id/like', checkAuth, CommentsController.likeComment);
CommentRouter.get('/:id/dislike', checkAuth, CommentsController.disLikeComment);
