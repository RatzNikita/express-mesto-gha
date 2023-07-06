const router = require('express').Router();
const {
  getUsers, getUser, updateAvatar, updateProfile,getUserInfo
} = require('../controllers/users');

router.get('', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUserInfo);

module.exports = router;
