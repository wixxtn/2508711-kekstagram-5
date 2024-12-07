import { showSuccessMessage, showErrorMessage } from './messages.js';
const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

function closeUploadForm() {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeUploadForm();
  }
}
const validateHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
      return false;
    }
  }

  return hashtags.length === uniqueHashtags.size;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверный формат хэш-тегов'
);

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment,
  'Комментарий не может быть длиннее 140 символов'
);

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

uploadInput.addEventListener('change', () => {
  openUploadForm();
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        closeUploadForm();
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      showErrorMessage();
    } finally {
      submitButton.disabled = false;
    }
  }
});

