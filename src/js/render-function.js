// функції для відображення елементів інтерфейсу
export default function renderGallery(array, element, loader) {
  const galleryMarkup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}"
              ><img
                class="gallery-img"
                src="${webformatURL}"
                alt="${tags}"
                width="360"
                height="152"
            /></a>
            <ul class="data-list">
              <li class="data-item likes">
                <p class="data-name">Likes</p>
                <p class="data-value">${likes}</p>
              </li>
              <li class="data-item views">
                <p class="data-name">Views</p>
                <p class="data-value">${views}</p>
              </li>
              <li class="data-item comments">
                <p class="data-name">Comments</p>
                <p class="data-value">${comments}</p>
              </li>
              <li class="data-item downloads">
                <p class="data-name">Downloads</p>
                <p class="data-value">${downloads}</p>
              </li>
            </ul>
          </li>
`
    )
    .join('');

  element.insertAdjacentHTML('beforeend', galleryMarkup);

  loader.classList.add('hidden');
  element.classList.remove('hidden');
}
