const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;

module.exports.handleException = (err, req, res) => {
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: 'Введённые данные некорректны' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Передан некорректный идентификатор' });
    return;
  }
  if (err.name === 'NotFound') {
    if (req.baseUrl === '/users') {
      res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    } else if (req.baseUrl === '/cards') {
      res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Указанная почта уже используется' });
    return;
  }
  if (err.name === 'InvalidToken') {
    res.status(UNAUTHORIZED).send({ message: 'Вы не авторизованы' });
  }
  if (err.message === 'Неправильные почта или пароль') {
    res.status(401).send({ message: err.message });
  }
  res.status(INTERNAL_ERROR).send({ message: 'Внутренняя ошибка сервера' });
};

module.exports.error = { BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR };
