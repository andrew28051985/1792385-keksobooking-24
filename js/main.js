const getRandomPositiveInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const resultInt = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return resultInt;
};

const getRandomPositiveFloat = (from, to, range) => {
  const lower = Math.min(Math.abs(from), Math.abs(to));
  const upper = Math.max(Math.abs(from), Math.abs(to));
  const resultFloat = Math.random() * (upper - lower ) + lower;
  return resultFloat.toFixed(range);
};

console.log('Целые ' + getRandomPositiveInt(40, 420));
console.log('Дробные ' + getRandomPositiveFloat(4.5, 495.92, 5));
