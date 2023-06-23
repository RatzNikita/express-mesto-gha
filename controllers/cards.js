const Card = require('../models/card');
const { handleException } = require('../exceptions/exceptions');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      card.populate('owner').then((crd) => res.send(crd));
    })
    .catch((err) => {
      handleException(err, req, res);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => handleException(err, req, res));
};

module.exports.removeCard = (req, res) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        card.deleteOne().then(() => res.send({ message: 'Пост удалён' }));
      }
    })
    .catch((err) => handleException(err, req, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .populate('owner')
  .populate('likes')
  .then((cards) => {
    if (!cards) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(cards);
  })
  .catch((err) => handleException(err, req, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .populate('owner')
  .populate('likes')
  .then((cards) => {
    if (!cards) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(cards);
  })
  .catch((err) => handleException(err, req, res));
