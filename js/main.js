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
  const resultInt = Math.floor(Math.random() * (to - from + 1) + from);
  console.log('Результат: '+ resultInt);
};
// eslint-disable-next-line no-console
randomInt(40, 420);

const randomFloat = function (from, to, range) {
  if (from < 0 || to < 0) {
    return console.log('Ошибка: значение отрицательное, вибирайте цифры только больше либо равные нулю!');
  }
  if (to < from) {
    return console.log('Ошибка: второе значение долно быть больше первого!');
  }
  if (from === to) {
    console.log('Предупреждение: для разнообразия результата выберайте разные значения минимального и максимального диапазона. Сейчас результат будет: ' + from);
    return console.log('Результат: '+ from);
  }
  const convertNumber = Math.pow(10, range); //10 возводим в степень range
  const One = (from * convertNumber).toFixed(0);
  const Two = (to * convertNumber).toFixed(0);
  const result = (Math.floor(Math.random() * (Two - One + 1) + +One))/convertNumber;
  return console.log('Результат: '+ result);
};

randomFloat(4.12, 4.92, 2);
