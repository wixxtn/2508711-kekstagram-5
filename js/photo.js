import {getRandomInteger, getRandomArrayElement} from './util.js';
import {DESCRIPTIONS,PHOTO_DESCRIPTION_COUNTER} from './data.js';
import {createComment} from './comment.js';
const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger (15, 200),
  comments: Array.from ({length: getRandomInteger(0, 30)}, createComment),
});

const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= PHOTO_DESCRIPTION_COUNTER; i++){
    photos.push(createPhoto(i))
  }
  return photos;
};

export {createPhoto, generatePhotos};
