import CommentSchema from "../../models/Comment.js";

export const getPostComments = async (req,res)=>{
    const id = req.params.id;
    try{
        const comments = await CommentSchema.find({postId: id}).populate('user').exec();
        res.json(comments);
    }catch (err){
        console.log(err)
        res.status(500).json({message:"Не удалось получить комментарии"})}
}
export const create = async (req, res) => {
    try {
        const doc = new CommentSchema({
            text: req.body.text,
            postId:req.body.postId,
            user: req.userId,
        });

        const comment = await doc.save();

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать комментарии',
        });
    }
};
export const remove = async (req, res)=>{
    try {
        const commentId = req.params.id;

        CommentSchema.findOneAndDelete(
            {
                _id: commentId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить комментарии',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'комментарии не найден',
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
            message: 'Не удалось удалить комментарии',
        });
    }
};
export const likeComment = async (req,res)=>{
    try{
        const commentId = req.params.id;
        CommentSchema.updateOne(
            {_id:commentId},
            {$inc:{likesCount:1}},
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось поставить лайк',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Комментарии не найден',
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
export const disLikeComment = async (req,res)=>{
    try{
        const commentId = req.params.id;
        CommentSchema.updateOne(
            {_id:commentId},
            {$inc:{likesCount:-1}},
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось убрать лайк',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Комментарии не найден',
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
