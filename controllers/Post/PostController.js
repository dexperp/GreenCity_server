import PostModel from '../../models/Post.js';
import multer from "multer";
import {createStorage} from "../../utils/index.js";

export const likePost = async (req,res)=>{
  try{
    const postId = req.params.id;
    PostModel.updateOne(
        {_id:postId},
        {$inc:{likesCount:1}},
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Не удалось вернуть пост',
            });
          }
          if (!doc) {
            return res.status(404).json({
              message: 'Пост не найден',
            });
          }

          res.json(doc);
        }
        )
  }
  catch (e){
    res.status(500).json({
      message: 'Не удалось поставить лайк',
    });
  }
}
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить посты',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOne(
        {_id: postId},
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Не удалось вернуть пост',
            });
          }
          if (!doc) {
            return res.status(404).json({
              message: 'Пост не найден',
            });
          }

          res.json(doc);
        },
    )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить пост',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить пост',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Пост не найден',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить посты',
    });
  }
};

export const create = async (req, res) => {
  try {

    console.log(req.files.map(i=>i.path))
    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      media: req.body.media,
      catalog: req.body.catalog,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        media: req.body.media,
        user: req.userId,
        catalog: req.body.catalog,

      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить пост',
    });
  }
};



const mediaStorage= multer({ storage: createStorage('media')});
export const uploadMedia = mediaStorage.array('media',10);


