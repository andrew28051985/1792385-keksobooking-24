import {getRandomPositiveInt} from './random-number.js';

const MAX_NUMBER_AUTOR = 10;

const createAutor = () => {
  let numberAutor = getRandomPositiveInt(1, MAX_NUMBER_AUTOR);
  if (String(numberAutor).length === 1) {
    numberAutor = `0${numberAutor}`;
  }
  return {
    avatar: `img/avatars/user${numberAutor}.png`,
  };
};

export {createAutor};
