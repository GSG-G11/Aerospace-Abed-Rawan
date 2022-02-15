const searchForm = document.querySelector('.search-form');

const searchInput = document.querySelector('.search-input');

const selectInput = document.querySelector('[name="media"]');

const searchButton = document.querySelector('.search-btn');

const searchResults = document.querySelector('.search-results');

const headerBtn = document.querySelectorAll('.header-btn')[1];

const API_URL = 'https://images-api.nasa.gov/search?page=1&';

function getData(method, url) {
  const xhrRequest = new XMLHttpRequest();

  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const response = JSON.parse(xhrRequest.responseText);
      setTimeout(handleDom(response), 600);
    }
  };

  xhrRequest.open(method, url);
  xhrRequest.send();
}

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  const media = selectInput.value;
  const searchTerm = searchInput.value;

  media === ''
    ? getData('GET', `${API_URL}q=${searchTerm}`)
    : getData('GET', `${API_URL}q=${searchTerm}&media_type=${media}`);

  searchForm.classList.add('hideVisibility');
});

function handleDom(data) {
  searchResults.innerHTML = '';
  searchResults.classList.remove('hidden');
  headerBtn.classList.remove('hidden');
  const items = data.collection.items;
  console.log(items);
  if (items.length === 0) {
    searchResults.innerHTML = '<h2>No results found</h2>';
  }
  items.forEach(item => {
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');
    searchResults.appendChild(resultCard);

    const resultImageContainer = document.createElement('div');
    resultImageContainer.classList.add('result-image');
    resultCard.appendChild(resultImageContainer);

    if (item.links) {
      const resultImage = document.createElement('img');
      resultImage.src = item.links[0].href;
      resultImageContainer.appendChild(resultImage);
    }
    const resultDetails = document.createElement('div');
    resultDetails.classList.add('result-details');
    resultCard.appendChild(resultDetails);

    const resultTitle = document.createElement('h3');
    resultTitle.classList.add('result-title');
    resultTitle.innerText = item.data[0].title;
    resultDetails.appendChild(resultTitle);

    const resultDescription = document.createElement('p');
    resultDescription.classList.add('result-description');
    resultDescription.innerText = item.data[0].description;
    resultDetails.appendChild(resultDescription);

    if (item.links) {
      const resultLink = document.createElement('a');
      resultLink.classList.add('result-link');
      resultLink.href = item.links[0].href;
      resultLink.innerText = 'View on NASA';
      resultDetails.appendChild(resultLink);
    }

    const resultDate = document.createElement('p');
    resultDate.classList.add('result-date');
    resultDate.innerText = item.data[0].date_created;
    resultDetails.appendChild(resultDate);

    const resultMedia = document.createElement('p');
    resultMedia.classList.add('result-media');
    resultMedia.innerText = item.data[0].media_type;
    resultDetails.appendChild(resultMedia);
  });
}

headerBtn.addEventListener('click', function () {
  searchForm.classList.remove('hideVisibility');
  searchResults.classList.add('hidden');
  headerBtn.classList.add('hidden');
});
