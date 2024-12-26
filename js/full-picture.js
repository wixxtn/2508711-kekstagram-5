const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');


let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderComments = () => {
  const commentsToShow = currentComments.slice(shownCommentsCount, shownCommentsCount + 5);
  commentsToShow.forEach((comment) => {
    socialComments.appendChild(createCommentElement(comment));
  });
  shownCommentsCount += commentsToShow.length;

  if (commentShownCount) {
    commentShownCount.textContent = shownCommentsCount;
  }

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderBigPicture = (photo) => {
  if (!photo || !photo.url || !photo.comments) {
    // eslint-disable-next-line no-console
    console.error('Invalid photo data:', photo);
    return;
  }

  if (!bigPictureImg || !likesCount || !socialCaption || !socialComments) {
    // eslint-disable-next-line no-console
    console.error('One or more elements not found in the DOM');
    return;
  }

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  if (commentTotalCount) {
    commentTotalCount.textContent = photo.comments.length;
  }

  if (commentShownCount) {
    commentShownCount.textContent = Math.min(5, photo.comments.length);
  }

  socialComments.innerHTML = '';
  currentComments = photo.comments;
  shownCommentsCount = 0;

  renderComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  currentComments = [];
  shownCommentsCount = 0;
  socialComments.innerHTML = '';
};

bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

commentsLoader.addEventListener('click', () => {
  renderComments();
});

export { renderBigPicture };
