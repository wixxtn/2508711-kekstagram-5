const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram/data', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка HTTP: ${response.status}. ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка HTTP: ${response.status}. ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};

export { getData, sendData };


