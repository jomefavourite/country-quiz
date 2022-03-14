import {
  CountryFlagQuestion,
  CapitalQuestion,
  ContinentQuestion,
  SubRegionQuestion,
} from "./questionsTemplate.js";

let SCORE = 0;

async function fetchCountriesData() {
  try {
    const response = await fetch("data.json");

    // "https://restcountries.com/v3/all?fields=name,capital,currencies,flags,continents"

    const data = await response.json();

    return data.slice(0, 10);
  } catch (err) {
    console.log(err);
  }
}

async function determineQuestion(score) {
  const countriesData = await fetchCountriesData();

  console.log(countriesData);

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
      {
        type: "countryFlagQuestion",
        quesFun: CountryFlagQuestion,
      },
      {
        type: "capitalQuestion",
        quesFun: CapitalQuestion,
      },
      {
        type: "subRegionQuestion",
        quesFun: SubRegionQuestion,
      },
      {
        type: "continentQuestion",
        quesFun: ContinentQuestion,
      },
    ];

    // const questionTypes = [
    //   CountryFlagQuestion,
    //   CapitalQuestion,
    //   SubRegionQuestion,
    //   ContinentQuestion,
    // ];

    const selectedQuestion =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    select("#card__question__container").innerHTML = selectedQuestion.quesFun(
      countryData,
      wrongChoices
    );

    determineOptionClicked(countryData, selectedQuestion.type, score);
  }
}

determineQuestion(SCORE);

const nextButton = select(".button__next");
console.log(nextButton);

function determineOptionClicked(countryData, questionType, score) {
  const answer = checkButtonClicked(countryData, questionType);
  const buttonsCont = select(".card__buttons");
  const nextButton = select(".button__next");

  buttonsCont.addEventListener("click", someFunction);
  const correctOption = select("[data-ans='true']");

  // console.log(correctOption);

  function someFunction(e) {
    const selectedOption = e.target;
    console.log(e.target);
    const selectedOptionText = e.target.lastElementChild.innerText;
    if (selectedOption.classList.contains("button__option")) {
      if (answer === selectedOptionText) {
        selectedOption.classList.add("correct");
        score = score + 1;
        console.log(score, "score");
      } else {
        selectedOption.classList.add("wrong");
      }

      correctOption.classList.add("correct");
      nextButton.disabled = false;
      nextButton.addEventListener("click", () => determineQuestion(score));
      buttonsCont.removeEventListener("click", someFunction);
    }
  }
}

function checkButtonClicked(data, questionType) {
  if (
    questionType === "countryFlagQuestion" ||
    questionType === "capitalQuestion"
  ) {
    return data.name.common;
  } else if (questionType === "subRegionQuestion") {
    return data.subregion;
  } else if (questionType === "continentQuestion") {
    return data.continents[0];
  }
}

function select(element) {
  return document.querySelector(element);
}
function selectAll(element) {
  return document.querySelectorAll(element);
}
