const router = require('express').Router();
const {
  createCard, dislikeCard, getCards, likeCard, removeCard,
} = require('../controllers/cards');

router.get('', getCards);
router.post('', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
