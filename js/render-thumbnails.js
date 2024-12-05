import { renderBigPicture } from './full-picture.js';

export const renderThumbnails = (photos) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const container = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__img').alt = photo.description;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;

    element.addEventListener('click', () => {
      renderBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};
