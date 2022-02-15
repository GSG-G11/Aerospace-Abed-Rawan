const date = document.querySelector("#apod-date-input");
const dateSearch = document.querySelector("#apod-search-btn");
const apodImg = document.querySelector("#apod-img");
const apodTitle = document.querySelector("#apod-title");
const apodDetail = document.querySelector("#apod-detail");

const fetch = (method, url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.open(method, url);
  xhr.send();
};
const handleDom = (data) => {
  apodImg.src = data.url;
  apodTitle.textContent = data.title;
  apodDetail.textContent = data.explanation;
};

dateSearch.addEventListener("click", () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date.value}`;
  fetch("GET", url, handleDom);
});
