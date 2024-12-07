const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

export function showSuccessMessage() {
  showMessage(successTemplate);
}

export function showErrorMessage() {
  showMessage(errorTemplate);
}

function showMessage(template) {
  const messageElement = template.cloneNode(true);
  document.body.appendChild(messageElement);

  document.addEventListener('keydown', onMessageKeydown);

  messageElement.querySelector('.success__button, .error__button').addEventListener('click', closeMessage);

  function onMessageKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageKeydown);
  }
}
