const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www)?[0-9a-zA-Z-._~:/?#\[\]@!\$&'\(\)\*\+,;=]+\.\w{2,3}/.test(v);
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
