import UserModel from '../../models/User.js';
import multer from "multer";
import {createStorage, createToken, Hash} from "../../utils/index.js";
import {createHash} from "../../utils/Hash.js";


export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const hash = await Hash.createHash(password);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = createToken({_id: user._id},'30d')

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const isValidPass = Hash.isValidHash(req.body.password,user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = createToken({_id: user._id},'30d')

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = await UserModel.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    // console.log(currentUser._doc);
    let hash;
    if(req.body.email){
      createToken({_id:userId},'30d');
    }
    if(req.body.password){
      hash=createHash(req.body.password);
    }
    if(userId === currentUser._doc._id.toString()){
      const updateFields = {
        fullName: req.body.fullName||currentUser._doc.fullName,
        email: req.body.email||currentUser._doc.email,
        passwordHash: hash||currentUser._doc.passwordHash,
        avatarUrl: req.body.avatarUrl||currentUser._doc.avatarUrl,
        postsHistory: req.body.postsHistory||currentUser._doc.postsHistory,
        watchingRegions:req.body.watchingRegions||currentUser._doc.watchingRegions
      };

    await UserModel.updateOne({_id: userId}, updateFields);
    res.json(req.body);
    }
    else {
      res.status(403).json({message:'Не удалось обновить пользователя'})
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить пользователя',
    });
  }
};
const avatarStorage = multer({ storage: await createStorage('avatars') });
export const uploadAvatar = (req, res, next) => {
  avatarStorage.single('image')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: 'Ошибка при загрузке файла' });
    }
    next();
  });
};

export const updateAvatar = async (req, res) => {
  try {
    const id = req.body.id;
    if(!req.body.id){return res.status(404).json("Не удалось обновить аватар") }
      await UserModel.findOneAndUpdate({_id:id},{
        avatarUrl:req.file.path
      })

    console.log(req.file)
    res.json({
      files: req.file.path,
    });
  } catch (err) {
    if (err) {
      console.log(err)
      res.status(500).json(err.message("Не удалось отправить файл"))
    }
  }
}

