const User = require('../models/user');
const { handleException } = require('../exceptions/exceptions');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => handleException(err, req, res));

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        handleException({ name: 'NotFound' }, req, res);
      } else {
        res.send(user);
      }
    })
    .catch((err) => handleException(err, req, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => handleException(err, req, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleException(err, req, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => handleException(err, req, res));
};
