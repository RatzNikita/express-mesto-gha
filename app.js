const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleException } = require('./exceptions/exceptions');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/signin', login);
app.use('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница с указанным адресом не найдена' });
});

app.use((err, req, res) => {
  handleException(err, req, res);
});

app.listen(3000);
