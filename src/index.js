import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat_API';

axios.defaults.headers.common['x-api-key'] =
  'live_jH0JHaefoLwCw35OQ4J1Zp9517hFIHjKVvDacpAvxYC0XW5mSXJv1XMkz0pA5E4W';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

hiddenEl(errorEl);
hiddenEl(selectEl);

selectEl.addEventListener('change', handlerChose);

fetchBreeds()
  .then(data => {
    const markupArr = data.map(
      element => `<option value="${element.id}">${element.name}</option>`
    );
    selectEl.innerHTML = markupArr.join('');
    hiddenEl(selectEl);
    hiddenEl(loaderEl);

    new SlimSelect({
      select: '#single',
    });
  })
  .catch(
    error => (
      hiddenEl(errorEl),
      hiddenEl(loaderEl),
      Notiflix.Report.failure('Error', `${error}`)
    )
  );

function handlerChose(evt) {
  if (!evt.target.classList.contains('breed-select')) {
    return;
  } else {
    hiddenEl(loaderEl);
    hiddenEl(catInfoEl);
    const catId = evt.target.value;
    fetchCatByBreed(catId)
      .then(data => {
        hiddenEl(catInfoEl);
        const { name, description, temperament } = data[0].breeds[0];
        addCatInfoMarkup(
          catInfoEl,
          data[0].url,
          name,
          description,
          temperament
        );
        hiddenEl(loaderEl);
      })
      .catch(
        error => (
          hiddenEl(loaderEl),
          hiddenEl(errorEl),
          Notiflix.Report.failure('Error', `${error}`)
        )
      );
  }
}

function hiddenEl(el) {
  return el.classList.toggle('hidden');
}

function addCatInfoMarkup(catInfo, url, name, description, temperament) {
  catInfo.innerHTML = `<img src="${url}" alt="cat ${name}" width='600' >
      <div class="cats-info">
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">Temperament: <span class="temperament-span">${temperament}</span></p>
      </div>`;
}
