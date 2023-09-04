import axios from 'axios';

function fetchBreeds() {
  return axios.get(`/breeds`).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(catId) {
  return axios.get(`/images/search?breed_ids=${catId}`).then(response => {
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
