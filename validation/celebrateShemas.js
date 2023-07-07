// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { emailRegex } = require('./validationConstants');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .alphanum()
      .min(24)
      .max(24),
  }),
});

const postCardValidation = celebrate({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().regex(emailRegex),
});

const updateProfileValidation = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
});

const updateAvatarValidation = celebrate({
  body: {
    avatar: Joi.string().required().regex(emailRegex),
  },
});

const createUserValidation = celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(emailRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(30),
  },
});

const loginValidation = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  },
});

module.exports = {
  cardIdValidation,
  postCardValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createUserValidation,
  loginValidation,
};
