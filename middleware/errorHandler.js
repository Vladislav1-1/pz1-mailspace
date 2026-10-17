const notFoundHandler = (req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl, user: req.user });
};

const serverErrorHandler = (err, req, res, next) => {
  console.error('КРИТИЧЕСКАЯ ОШИБКА:', err.stack);
  res.status(500).render('500', { error: err.message, user: req.user });
};

module.exports = { notFoundHandler, serverErrorHandler };