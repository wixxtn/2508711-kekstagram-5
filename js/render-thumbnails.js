export const renderThumbnails = (photos) => {
  console.log(photos);
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const container = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;

    fragment.appendChild(element);

  });

  container.appendChild(fragment);
};
