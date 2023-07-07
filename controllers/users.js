const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleException } = require('../exceptions/exceptions');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => handleException(err, req, res));

module.exports.getUser = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        handleException({ name: 'NotFound' }, req, res);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => User.findById({ _id: req.user })
  .then((user) => {
    const {
      about, avatar, name, _id,
    } = user;
    res.send({
      about, avatar, name, _id,
    });
  })
  .catch(next);
