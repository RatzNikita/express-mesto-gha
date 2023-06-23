const User = require('../models/user');
const { handleException } = require('../exceptions/exceptions');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => handleException(err, req, res));

module.exports.getUser = (req, res) => User.findById({ _id: req.params.userId })
  .then((user) => res.send(user))
  .catch((err) => handleException(err, req, res));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => handleException(err, req, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate({ id }, { name, about })
    .then((user) => res.send(user))
    .catch((err) => handleException(err, req, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate({ id }, { avatar })
    .then((user) => res.send(user))
    .catch((err) => handleException(err, req, res));
};
