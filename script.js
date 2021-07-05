"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 10000000
      ).toFixed(1)} M</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [, data1] = JSON.parse(request.responseText);
    renderCountry(data1);

    const [neighbour] = data1.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(request2.responseText);
      renderCountry(data2, "neighbour");
    });
  });
};

getCountryData("India");
