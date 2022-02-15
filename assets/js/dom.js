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