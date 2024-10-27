import {getRandomInteger, getRandomArrayElement} from './util.js';
import {MESSAGE, NAMES} from './data.js';
const usedCommentIds = new Set();

const createUniqueCommentId = () => {
  let id;
  do {
    id = getRandomInteger(1, 1000);
  } while (usedCommentIds.has(id));
  usedCommentIds.add(id);
  return id;
};
const createComment = () => ({
  id: createUniqueCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name:  getRandomArrayElement(NAMES),
});
export {createUniqueCommentId, createComment};
