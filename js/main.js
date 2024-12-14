import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showErrorMessage } from './messages.js';

let isDataLoaded = false;

const loadPhotos = async () => {
  if (isDataLoaded) {
    return;
  }

  try {
    const photos = await getData();
    renderThumbnails(photos);
    isDataLoaded = true;
  } catch (error) {
    showErrorMessage('Не удалось загрузить фотографии. Попробуйте позже.');
  }
};

loadPhotos();
