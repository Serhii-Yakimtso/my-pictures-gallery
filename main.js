// imports

console.log('hello');

import getPictures from './src/js/pixabay-api';
import renderGallery from './src/js/render-function';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from './src/img/error.svg';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import 'simplelightbox/dist/simple-lightbox.modules.js';

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn.load-more');
const lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const perPage = 15;
let page;
let searchTag;
let maxHits;

// search pictures
searchForm.addEventListener('submit', handleSearchPictures);

async function handleSearchPictures(e) {
  e.preventDefault();

  clearGallery();
  hideBtnLoadMore();

  const form = e.target;
  searchTag = form.elements.tag.value.trim();

  if (searchTag === '') {
    showMessage('Sorry, enter the tag', '#ef4040', errorIcon);
    return;
  }

  page = 1;

  showLoader();

  try {
    const { hits, totalHits } = await getPictures(searchTag, page, perPage);
    if (hits.length === 0) {
      hideLoader();
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        '#ef4040',
        errorIcon
      );
      searchForm.reset();
      return;
    }

    maxHits = totalHits;

    renderGallery(hits, gallery, loader);

    if (totalHits > perPage) {
      showBtnLoadMore();
    }

    lightbox.refresh();
  } catch (error) {
    hideLoader();

    showMessage('Oops. Something went wrong', '#ef4040', errorIcon);
  }

  searchForm.reset();
}

// event on btn "load more"
btnLoadMore.addEventListener('click', handleShowMorePictires);
async function handleShowMorePictires() {
  showLoader();
  page += 1;

  try {
    const { hits, totalHits } = await getPictures(searchTag, page, perPage);
    maxHits = totalHits;

    if (page * perPage >= maxHits) {
      hideBtnLoadMore();
      showMessage(
        "We're sorry, but you've reached the end of search results.",
        '#34c6eb'
      );
    }
    hideLoader();

    renderGallery(hits, gallery, loader);
    lightbox.refresh();

    smoothScrolling();
  } catch (error) {
    hideLoader();

    showMessage('Oops. Something went wrong', '#ef4040', errorIcon);
  }
}

// ================= functions

// ================= message by iziToast
function showMessage(text, color, icon = '') {
  iziToast.show({
    message: text,
    messageColor: '#fafafb',
    messageSize: '16px',

    iconUrl: icon,

    position: 'topRight',
    backgroundColor: color,
  });
}

// ================= delete gallery's elements
function clearGallery() {
  gallery.innerHTML = '';
  gallery.classList.add('hidden');
}

// ================= visibility of loader
function showLoader() {
  loader.classList.remove('hidden');
}
function hideLoader() {
  loader.classList.add('hidden');
}

// ================= visibility of button "Load more"
function showBtnLoadMore() {
  btnLoadMore.classList.remove('hidden');
}
function hideBtnLoadMore() {
  btnLoadMore.classList.add('hidden');
}

// ================= smooth scrolling of window after add more gallery's items
function smoothScrolling() {
  const { height } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
