const fs = require('fs');
const path = require('path');

const fileLogger = (req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] METHOD: ${req.method} | URL: ${req.originalUrl}\n`;
  const logFilePath = path.join(__dirname, '../server.log');

  fs.appendFile(logFilePath, logEntry, { flag: 'a' }, (err) => {
    if (err) {
      console.error('Ошибка записи лога:', err);
      return next(new Error('Сбой системы логирования: невозможно записать лог-файл'));
    }
    next();
  });
};

module.exports = fileLogger;