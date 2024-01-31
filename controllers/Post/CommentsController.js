import CommentSchema from "../../models/Comment.js";


export const create = async (req, res) => {
    try {
        const doc = new CommentSchema({
            text: req.body.text,
            media: req.body.media,
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

