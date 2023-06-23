module.exports.handleException = (err, req, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Введённые данные некорректны' });
    return;
  }
  if (err.name === 'CastError') {
    if (req.baseUrl === '/users') {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    } else if (req.baseUrl === '/cards') {
      res.status(404).send({ message: 'Запрашиваемая карточка  не найдена' });
    }
    return;
  }
  res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};