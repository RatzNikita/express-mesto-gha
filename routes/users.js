/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const {
  getUsers, getUser, updateAvatar, updateProfile, getUserInfo,
} = require('../controllers/users');
const { updateProfileValidation, updateAvatarValidation } = require('../validation/celebrateShemas');

router.get('', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUserInfo);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
