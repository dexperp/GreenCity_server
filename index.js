import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import {AuthRouter} from "./routes/auth.js";
import {UserRouter} from "./routes/user.js";
import {CatalogRouter, NewsRouter, PostRouter} from "./routes/post.js";
import {CommentRouter} from "./routes/post.js";


mongoose
    .connect("mongodb://localhost:27017/greencity_db")
    .then(() => console.log('Connected to DataBase'))
    .catch((err) => console.log('DataBase Error: ', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static('files'));

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/posts', PostRouter);
app.use('/news', NewsRouter);
app.use('/comments', CommentRouter)
app.use('/catalog', CatalogRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`Server started by http://localhost:${PORT}`);
});
