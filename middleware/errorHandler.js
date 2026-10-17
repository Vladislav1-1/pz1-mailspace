const fs = require('fs');
const path = require('path');

const notFoundHandler = (req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl, user: req.user });
};

const serverErrorHandler = (err, req, res, next) => {
  console.error('КРИТИЧЕСКАЯ ОШИБКА:', err.stack);
  const logEntry = `[${new Date().toISOString()}] ОШИБКА 500: ${err.message}\n`;
  const logFilePath = path.join(__dirname, '../server.log');
  
  fs.appendFile(logFilePath, logEntry, { flag: 'a' }, (fileErr) => {
    if (fileErr) console.error('Не удалось записать лог ошибки:', fileErr);
  });

  res.status(500).render('500', { error: err.message, user: req.user });
};

module.exports = { notFoundHandler, serverErrorHandler };