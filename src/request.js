const BASE_URL = 'http://co69854.tmweb.ru/';

export const post = (url, data) =>
  fetch(BASE_URL + url, { method: 'POST', body: JSON.stringify(data) })
    .then(response => response.json());
