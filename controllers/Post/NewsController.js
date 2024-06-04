import News from "../../models/News.js";

export const readAllNews = async (req,res) => {
    try {
        console.log("HERE: ");
        const news = await News.find();
        res.status(201).json(news);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось вернуть новости',
        });
    }
}
export const createNews = async (req, res) => {
    try {
        const news = {title:req.body.title,description:req.body.description,photoUrl:req.body.photoUrl};
        const doc = new News(news);
        const createdNews = await doc.save();
        res.status(201).json(createdNews);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось создать новости',
        });
    }
}
export const removeNews = async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await News.findOneAndDelete({
            _id: id,
        });

        if (!doc) {
            return res.status(404).json({
                message: 'Новость не найдена',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить новость',
        });
    }

};
