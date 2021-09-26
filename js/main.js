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
randomInt(1, 10);

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
  const numberOne = from * convertNumber;
  const numberTwo = to * convertNumber;
  const result1 = Math.floor((Math.random() * ((numberTwo - numberOne + 1) + numberOne))/convertNumber);

  return console.log(numberOne + ' ' + result1);

  //const result = (Math.random() * (to - from + 1) + from).toFixed(range);
  //console.log('Результат: '+ result);
};

randomFloat(40.11122, 41.22222, 5);
