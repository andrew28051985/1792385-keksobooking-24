/* eslint-disable prefer-template */
/* eslint-disable no-console */
const randomInt = function (from, to) {
  if (from < 0 || to < 0) {
    return console.log('Ошибка: значение отрицательное, вибирайте цифры только больше либо равные нулю!');
  }
  if (to < from) {
    return console.log('Ошибка: второе значение долно быть больше первого!');
  }
  if (from === to) {
    console.log('Предупреждение: для разнообразия результата выберайте разные значения минимального и максимального диапазона. Сейчас результат будет: ' + from);
  }
  const result = Math.floor(Math.random() * (to - from + 1) + from);
  console.log('Результат: '+ result);
};

// eslint-disable-next-line no-console
randomInt(25, 40);
