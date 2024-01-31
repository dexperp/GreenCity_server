import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

import {loginValidation, postCreateValidation, registerValidation, updateValidation} from './validations.js';

import {checkAuth, handleValidationErrors} from './utils/index.js';

import { PostController, UserController} from './controllers/index.js';

console.log("Bissmillah");
mongoose
  .connect("mongodb://localhost:27017/greencity_db")
  .then(() => console.log('Connected to DataBase'))
  .catch((err) => console.log('DataBase Error: ', err));

const app = express();




app.use(express.json());
app.use(cors());
app.use('/files', express.static('files'));

app.post('/uploadAvatar', checkAuth, UserController.uploadAvatar,UserController.updateAvatar);
app.post('/user/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/user/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/user', checkAuth, UserController.getCurrentUser);


app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts/:id/like',checkAuth,PostController.likePost);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.uploadMedia, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.patch('/user/update/:id',checkAuth,updateValidation,handleValidationErrors,UserController.update)
app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
