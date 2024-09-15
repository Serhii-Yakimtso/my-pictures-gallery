// функції для HTTP-запитів
import axios from 'axios';

export default async function getPictures(name, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42676798-23985956bba61249a12f13dde';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
  return data;
}
