import {
  CountryFlagQuestion,
  CapitalQuestion,
  ContinentQuestion,
  SubRegionQuestion,
} from "./questionsTemplate.js";

async function fetchCountriesData() {
  try {
    const response = await fetch("data.json");

    // "https://restcountries.com/v3/all?fields=name,capital,currencies,flags,continents"

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function determineQuestion() {
  const countriesData = await fetchCountriesData();

  if (countriesData) {
    // const questionsRandom = Math.floor(countriesData.length * Math.random());
    const questionsRandom = 1;
    const countryData = countriesData[questionsRandom];
    const countryDataNext1 = countriesData[questionsRandom + 1];
    const countryDataNext2 = countriesData[questionsRandom + 2];
    const countryDataNext3 = countriesData[questionsRandom + 3];

    const wrongChoices = [countryDataNext1, countryDataNext2, countryDataNext3];

    console.log(countryData);

    const questionTypes = [
      CountryFlagQuestion,
      CapitalQuestion,
      SubRegionQuestion,
      ContinentQuestion,
    ];

    const selectedQuestion =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    // console.log(CountryFlagQuestion(countryData, wrongChoices));

    select("#card__question__container").innerHTML = selectedQuestion(
      countryData,
      wrongChoices
    );

    determineOptionClicked(countryData);
  }
}

determineQuestion();

function determineOptionClicked(countryData) {
  selectAll(".button__option").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e.target.children[1].innerText);
    });
  });
}

function select(element) {
  return document.querySelector(element);
}
function selectAll(element) {
  return document.querySelectorAll(element);
}
