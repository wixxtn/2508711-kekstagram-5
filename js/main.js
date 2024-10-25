const NAMES = [
  'Александр',
  'Михаил',
  'Артем',
  'Марк',
  'Дмитрий',
  'Мария',
  'Ева',
  'Варвара',
  'Виктория',
  'Александра',
];
const DESCRIPTIONS = [
  'Закат на пляже',
  'Город в тумане',
  'Пейзаж в горах',
  'Праздник в городе',
  'Семья на отдыхе',
  'Животные в зоопарке',
  'Архитектура города',
  'Природа вблизи',
  'Спортсмены на стадионе',
  'Музыканты на концерте',
];
const MESSAGE = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

PHOTO_DESCRIPTION_COUNTER = 25;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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
const photos = generatePhotos();
console.log(photos);
