let campaigns = [
  {
    id: 1,
    title: "Весенняя распродажа 2026",
    subject: "Скидки 50% на всё",
    recipientsCount: 1500,
    createdAt: new Date().toLocaleString('ru-RU')
  },
  {
    id: 2,
    title: "Обновление платформы MailSpace",
    subject: "Новые фичи для ваших рассылок",
    recipientsCount: 4200,
    createdAt: new Date(Date.now() - 86400000).toLocaleString('ru-RU')
  }
];

module.exports = campaigns;