import PostModel from '../../models/Post.js';
import multer from "multer";
import {createStorage} from "../../utils/index.js";
import Catalog from "../../models/Catalog.js";
import News from "../../models/News.js";

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

export const disLikePost = async (req,res)=>{
  try{
    const postId = req.params.id;
    PostModel.updateOne(
        {_id:postId},
        {$inc:{likesCount:-1}},
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
    const posts = await PostModel.find().populate({
      path: 'user',
      select: 'fullName email avatarUrl _id isModerator'
    }).populate({
      path: 'catalog',
      select: 'name'
    }).exec();
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

    await PostModel.findOneAndDelete(
      {
        _id: postId,
      }).then((err, doc) => {
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
    const mediaUrls = req.files.map(file => file.path);

    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      media: mediaUrls,
      catalog: req.body.catalog,
      user: req.userId,
      address:[Number(req.body.lat),Number(req.body.long),]

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





const mediaStorage= multer({storage:createStorage('media')});
export const uploadMedia = mediaStorage.array('media',10);



export const update = async (req, res) => {

  try {
    const mediaUrls = [];
    if(req.files){
      const files =req.files.map(file => file.path);
      mediaUrls.push(...files)
    }

    const postId = req.params.id;
    const currentData =await PostModel.findById(req.params.id);
    if (!currentData) {
      return res.status(404).json({ error: 'Пост не найден' });
    }
    await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          closed:req.body.closed||currentData._doc.closed,
          title: req.body.title||currentData._doc.title,
          description: req.body.description||currentData._doc.description,
          media: JSON.parse(req.body.media)?[...mediaUrls,...JSON.parse(req.body.media)]:currentData._doc.media,
          catalog: JSON.parse(req.body.catalog)||currentData._doc.catalog
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

