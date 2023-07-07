/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleException } = require('./exceptions/exceptions');
const { createUserValidation, loginValidation } = require('./validation/celebrateShemas');

const app = express();
app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/signin', loginValidation, login);
app.use('/signup', createUserValidation, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница с указанным адресом не найдена' });
});
app.use(errors);
app.use((err, req, res) => {
  handleException(err, req, res);
});

app.listen(3000);
