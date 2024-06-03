import Catalog from "../../models/Catalog.js";
import CatalogSchema from "../../models/Catalog.js";
import PostModel from "../../models/Post.js";

export const createCatalog = async (req, res) => {
    try {
        const catalogName = req.body.name;
        const doc = new Catalog({name:catalogName});
        const catalog = await doc.save();
        res.status(201).json(catalog);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось создать каталог',
        });
    }
}
export const removeCatalog = async (req, res) => {
    try {
        const id = req.params.id;

        Catalog.findOneAndDelete(
            {
                _id: id,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить каталог',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Каталог не найден',
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
            message: 'Не удалось получить Каталоги',
        });
    }
};


export const getAllCatalog = async (req, res) => {
    // console.log(req.user)
    try {
        const catalogs = await Catalog.find();
        res.status(201).json(catalogs);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось вернуть каталоги',
        });
    }
}
