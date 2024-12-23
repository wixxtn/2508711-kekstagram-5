import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showErrorMessage } from './messages.js';
import { debounce } from './util.js';

let isDataLoaded = false;
let photos = [];

const loadPhotos = async () => {
  if (isDataLoaded) {
    return;
  }

  try {
    photos = await getData();
    renderThumbnails(photos);
    isDataLoaded = true;
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  } catch (error) {
    showErrorMessage('Не удалось загрузить фотографии. Попробуйте позже.');
  }
};

loadPhotos();

const filterDefault = () => photos;

const filterRandom = () => {
  const randomPhotos = [...photos];
  randomPhotos.sort(() => Math.random() - 0.5);
  return randomPhotos.slice(0, 10);
};

const filterDiscussed = () => {
  const discussedPhotos = [...photos];
  discussedPhotos.sort((a, b) => b.comments.length - a.comments.length);
  return discussedPhotos;
};

const filters = {
  'filter-default': filterDefault,
  'filter-random': filterRandom,
  'filter-discussed': filterDiscussed,
};

const updateThumbnails = debounce((filterId) => {
  const container = document.querySelector('.pictures');
  const thumbnails = container.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());

  const filteredPhotos = filters[filterId]();
  renderThumbnails(filteredPhotos);
}, 500);

document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    document.querySelectorAll('.img-filters__button').forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    updateThumbnails(evt.target.id);
  }
});
