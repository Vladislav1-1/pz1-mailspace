const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const campaigns = require('./data/campaigns');
const constraints = require('./config/constraints.json');
const fileLogger = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');
const { notFoundHandler, serverErrorHandler } = require('./middleware/errorHandler');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(fileLogger);
app.use(authMiddleware);

app.get('/', (req, res) => {
  res.render('index', { campaigns, user: req.user });
});

app.get('/add', (req, res) => {
  res.render('add', { user: req.user, error: null });
});

app.post('/add', (req, res) => {
  const { title, subject, recipientsCount } = req.body;
  const count = parseInt(recipientsCount, 10);

  if (!title || !subject || isNaN(count)) {
    return res.render('add', { user: req.user, error: 'Все поля обязательны к заполнению!' });
  }
  if (title.length < constraints.title.minLength || title.length > constraints.title.maxLength) {
    return res.render('add', { user: req.user, error: `Длина названия должна быть от ${constraints.title.minLength} до ${constraints.title.maxLength} символов.` });
  }
  if (count < constraints.minRecipients) {
    return res.render('add', { user: req.user, error: `Количество получателей не может быть меньше ${constraints.minRecipients}!` });
  }

  const newId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1;
  campaigns.push({
    id: newId,
    title: title.trim(),
    subject: subject.trim(),
    recipientsCount: count,
    createdAt: new Date().toLocaleString('ru-RU')
  });

  res.redirect('/?auth=1');
});

app.get('/item/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const campaign = campaigns.find(c => c.id === id);

  if (!campaign) return next();
  res.render('item', { campaign, user: req.user });
});

app.get('/test-error', (req, res, next) => {
  next(new Error("Тестовая ошибка базы данных!"));
});
app.use(notFoundHandler);
app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}?auth=1`));