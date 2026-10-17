const authMiddleware = (req, res, next) => {
  if (req.query.auth === '1') {
    req.user = { name: 'Администратор MailSpace', role: 'admin' };
  } else {
    req.user = { name: 'Гость (Только чтение)', role: 'guest' };
  }
  next();
};

module.exports = authMiddleware;