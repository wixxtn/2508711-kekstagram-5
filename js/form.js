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

// Редактирование масштаба изображения
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

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

// Устанавливаем начальный масштаб
updateScale();

// Наложение эффектов на изображение с использованием noUiSlider
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
    effectLevelValue.value = values[handle];
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
  currentEffect = effectName;

  if (effectName === 'none') {
    resetSlider();
    effectLevelContainer.classList.add('hidden');
  } else {
    updateSlider(effects[effectName]);
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.set(effects[effectName].max);
  }
});

// Инициализация слайдера для эффекта "none"
updateSlider(effects.none);
effectLevelContainer.classList.add('hidden');
