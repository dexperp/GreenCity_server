import {body} from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
export const updateValidation =[
  body('email', 'Неверный формат почты').isEmail().optional(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }).optional(),
  body('fullName', 'Укажите имя').isLength({ min: 3 }).optional(),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]
export const postCreateValidation = [

  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('description', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('catalog', 'Неверный каталог').optional().custom(value=>Array.isArray(JSON.parse(value))),
  body('media').custom((value, { req }) => {
        if (!req.files || req.files.length > 10) {
          throw new Error('Количество медиафайлов не должно превышать 10');
        }
        return true;
      }),];

export const catalogCreateValidation =[
    body('name','Введите Название каталога').isLength({min:3}).isString(),
    body('box_color','Не верный формат цвета (Hex Color)').optional().isHexColor()
]

