import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const submitButton = document.querySelector('#upload-submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

function closeUploadForm() {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  uploadOverlay.style.display = 'none';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();

  setTimeout(() => {
    uploadOverlay.style.display = '';
  }, 100);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (hashtags.length === 0) {
    return true;
  }

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверный формат хэш-тегов',
);

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment,
  'Комментарий не может быть длиннее 140 символов',
);

const hashtagsInput = form.querySelector('.text__hashtags');
hashtagsInput.addEventListener('input', () => {
  pristine.validate(hashtagsInput);
});

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  uploadOverlay.style.opacity = '1';
  uploadOverlay.style.pointerEvents = 'auto';
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];

  if (file) {
    const blobURL = URL.createObjectURL(file);
    imgUploadPreview.src = blobURL;

    const effectPreviews = document.querySelectorAll('.effects__preview');
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${blobURL})`;
    });

    openUploadForm();
  }
});

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      formData.set('scale', `${currentScale}%`);

      const selectedEffect = document.querySelector('.effects__radio:checked').value;
      formData.set('effect', selectedEffect);

      const comment = form.querySelector('.text__description').value;
      const hashtags = form.querySelector('.text__hashtags').value;
      formData.set('description', comment);
      formData.set('hashtags', hashtags);

      await sendData(formData);

      closeUploadForm();
      showSuccessMessage();
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      submitButton.disabled = false;
    }
  }
});

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});

updateScale();

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const effects = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness',
  },
};

const updateSlider = (effect) => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  noUiSlider.create(effectLevelSlider, {
    start: effect.max,
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    if (value % 1 === 0) {
      effectLevelValue.value = value.toFixed(0);
    } else {
      effectLevelValue.value = value.toFixed(1);
    }
    imgUploadPreview.style.filter = `${effect.filter}(${values[handle]}${effect.unit})`;
  });
};

const resetSlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  imgUploadPreview.style.filter = '';
  effectLevelValue.value = '';
};

effectsList.addEventListener('change', (evt) => {
  const effectName = evt.target.value;

  if (effectName === 'none') {
    resetSlider();
    effectLevelContainer.classList.add('hidden');
  } else {
    updateSlider(effects[effectName]);
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.set(effects[effectName].max);
  }
});

updateSlider(effects.none);
effectLevelContainer.classList.add('hidden');

function resetForm() {
  currentScale = DEFAULT_SCALE;
  updateScale();
  resetSlider();
  uploadInput.value = '';
  imgUploadPreview.src = 'img/upload-default-image.jpg';
}
