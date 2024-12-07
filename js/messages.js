const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  document.body.appendChild(messageElement);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageKeydown);
  };

  const onMessageKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  messageElement.querySelector('.success__button, .error__button').addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onMessageKeydown);
};

export const showSuccessMessage = () => showMessage(successTemplate);
export const showErrorMessage = () => showMessage(errorTemplate);
