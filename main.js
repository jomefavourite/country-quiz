import {
  CountryFlagQuestion,
  CapitalQuestion,
  ContinentQuestion,
  SubRegionQuestion,
  ResultContainer,
} from "./questionsTemplate.js";

let score = 0;
let questionNumber = 0;

async function fetchCountriesData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3/all?fields=name,capital,currencies,flags,continents,subregion"
    );

    // "https://restcountries.com/v3/all?fields=name,capital,currencies,flags,continents,subregion"

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

const data = fetchCountriesData();

async function determineQuestion(data, score, questionNumber) {
  const countriesData = await data;

  if (countriesData) {
    const randomMax = countriesData.length - 50;

    // let questionsRandom = 156;
    let questionsRandom = Math.floor(Math.random() * randomMax);
    let countryData = countriesData[questionsRandom];
    let countryDataNext1 = countriesData[questionsRandom + 1];
    let countryDataNext2 = countriesData[questionsRandom + 2];
    let countryDataNext3 = countriesData[questionsRandom + 3];

    console.log(questionsRandom, "questionsRandom first");

    // I need to check all the countryData if some of the values are
    // the same or if they are missing. If true that select another random value

    let result = compareObjects(
      countryData,
      countryDataNext1,
      countryDataNext2,
      countryDataNext3
    );

    while (result) {
      questionsRandom = Math.floor(Math.random() * randomMax);
      countryData = countriesData[questionsRandom];
      countryDataNext1 = countriesData[questionsRandom + 1];
      countryDataNext2 = countriesData[questionsRandom + 2];
      countryDataNext3 = countriesData[questionsRandom + 3];

      console.log(questionsRandom, "questionsRandom in loop");

      result = compareObjects(
        countryData,
        countryDataNext1,
        countryDataNext2,
        countryDataNext3
      );
    }

    const wrongChoices = [countryDataNext1, countryDataNext2, countryDataNext3];

    console.log(questionsRandom, "questionsRandom");
    console.log(countryData);
    console.log(countryDataNext1, "wrong1");
    console.log(countryDataNext2, "wrong2");
    console.log(countryDataNext3, "wrong3");

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

    const selectedQuestion =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    select("#card__question__container").innerHTML = selectedQuestion.quesFun(
      countryData,
      wrongChoices
    );

    determineOptionClicked(
      countryData,
      selectedQuestion.type,
      score,
      questionNumber
    );

    return null;
  }
}

determineQuestion(data, score, questionNumber);

function determineOptionClicked(
  countryData,
  questionType,
  score,
  questionNumber
) {
  const answer = checkButtonClicked(countryData, questionType);
  const buttonsCont = select(".card__buttons");
  const nextButton = select(".button__next");
  const correctOption = select("[data-ans='true']");

  nextButton.disabled = true;
  buttonsCont.addEventListener("click", handleButtonOption);

  // console.log(correctOption);

  function handleButtonOption(e) {
    const selectedOption = e.target;
    const selectedOptionText = e.target.lastElementChild.innerText;

    if (selectedOption.classList.contains("button__option")) {
      if (answer === selectedOptionText) {
        selectedOption.classList.add("correct");
        score = score + 1;
        console.log(score, "score");
      } else {
        selectedOption.classList.add("wrong");
      }

      questionNumber = questionNumber + 1;
      console.log(questionNumber, "questionNumber");

      correctOption.classList.add("correct");
      nextButton.disabled = false;
      buttonsCont.removeEventListener("click", handleButtonOption);

      if (questionNumber <= 10) {
        nextButton.addEventListener(
          "click",
          () => {
            console.log("hello");
            determineQuestion(data, score, questionNumber);
          },
          { once: true }
        );
      } else {
        select(".card").innerHTML = ResultContainer(score);
      }
    }
  }
}

function checkButtonClicked(countryData, questionType) {
  if (
    questionType === "countryFlagQuestion" ||
    questionType === "capitalQuestion"
  ) {
    return countryData.name.common;
  } else if (questionType === "subRegionQuestion") {
    return countryData.subregion;
  } else if (questionType === "continentQuestion") {
    return countryData.continents[0];
  }
}

function select(element) {
  return document.querySelector(element);
}
function selectAll(element) {
  return document.querySelectorAll(element);
}

function compareObjects(a, b, c, d) {
  if (
    a.continents[0] === b.continents[0] ||
    a.continents[0] === d.continents[0] ||
    a.continents[0] === c.continents[0] ||
    b.continents[0] === c.continents[0] ||
    b.continents[0] === d.continents[0] ||
    c.continents[0] === d.continents[0] ||
    a.subregion === b.subregion ||
    a.subregion === d.subregion ||
    a.subregion === c.subregion ||
    b.subregion === c.subregion ||
    b.subregion === d.subregion ||
    c.subregion === d.subregion ||
    a.subregion.length === 0 ||
    b.subregion.length === 0 ||
    c.subregion.length === 0 ||
    d.subregion.length === 0
  ) {
    return true;
  } else {
    return false;
  }
}
