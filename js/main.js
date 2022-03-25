import {
  CountryFlagQuestion,
  CapitalQuestion,
  ContinentQuestion,
  SubRegionQuestion,
  ResultContainer,
} from "./questionsTemplate.js";

let score = 0;
let questionNumber = 0;

// Using async await method to get the countries date
async function fetchCountriesData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3/all?fields=name,capital,currencies,flags,continents,subregion"
    );

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
    // The reason for `countriesData.length - 50` is to ensure that the selected question data
    // is at least from 0 to 200 so as for the next 3 question data, to serve as wrong choices
    const randomMax = countriesData.length - 50;
    let questionsRandom = Math.floor(Math.random() * randomMax);

    let countryData = countriesData[questionsRandom];
    let countryDataNext1 = countriesData[questionsRandom + 1];
    let countryDataNext2 = countriesData[questionsRandom + 2];
    let countryDataNext3 = countriesData[questionsRandom + 3];

    // The result variable is expecting a Boolean (true or false) value from the compareObjects function call

    let result = compareObjects(
      countryData,
      countryDataNext1,
      countryDataNext2,
      countryDataNext3
    );

    /**
     * An iteration that checks if the questions data (countryData, countryDataNext1, countryDataNext2, countryDataNext3)
     * selected have some similar values (view compareObjects function to identify selected values)
     * if the same selected values are the same the while loop continues until `result` is `false`
     **/

    while (result) {
      questionsRandom = Math.floor(Math.random() * randomMax);
      countryData = countriesData[questionsRandom];
      countryDataNext1 = countriesData[questionsRandom + 1];
      countryDataNext2 = countriesData[questionsRandom + 2];
      countryDataNext3 = countriesData[questionsRandom + 3];

      result = compareObjects(
        countryData,
        countryDataNext1,
        countryDataNext2,
        countryDataNext3
      );
    }

    const wrongChoices = [countryDataNext1, countryDataNext2, countryDataNext3];

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

    /**
     * selectedQuestion variable picks a question to be shown at random,
     * either it's a Country Flag Question or Country Capital Question or
     * Country Sub-Region Question or a Country Continent Question
     **/
    const selectedQuestion =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    select("#card__question__container").innerHTML = selectedQuestion.quesFun(
      countryData,
      wrongChoices
    );

    questionNumber = questionNumber + 1;

    if (questionNumber === 10) {
      select(".button__next").style.display = "none";
    }

    determineOptionClicked(
      data,
      countryData,
      selectedQuestion.type,
      score,
      questionNumber
    );

    return null;
  }
}

determineQuestion(data, score, questionNumber);

/**
 * This function is to determine the questions option clicked
 * Was the correct option clicked?
 * Which of the options is the correct option
 * What happens when the next button is clicked
 **/
function determineOptionClicked(
  data,
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

  function handleButtonOption(e) {
    const selectedOption = e.target;
    const selectedOptionText = e.target.lastElementChild.innerText;
    const cardImage = select(".card__img");

    if (selectedOption.classList.contains("button__option")) {
      if (answer === selectedOptionText) {
        selectedOption.classList.add("correct");
        score = score + 1;
      } else {
        selectedOption.classList.add("wrong");
      }

      correctOption.classList.add("correct");
      nextButton.disabled = false;
      buttonsCont.removeEventListener("click", handleButtonOption);

      if (questionNumber <= 9) {
        nextButton.addEventListener(
          "click",
          () => {
            determineQuestion(data, score, questionNumber);
          },
          { once: true }
        );
      } else {
        cardImage.classList.add("card__img--hide");
        select("#card__question__container").innerHTML = ResultContainer(score);

        nextButton.style.display = "none";

        select(".btn__tryAgain").addEventListener(
          "click",
          () => {
            score = 0;
            questionNumber = 0;
            cardImage.classList.add("card__img--show");
            cardImage.classList.remove("card__img--hide");
            nextButton.style.display = "block";
            determineQuestion(data, score, questionNumber);
          },
          { once: true }
        );
      }
    }
  }
}

/**
 * This function is to determine from the questions option type clicked
 * what's the answer to that particular question type
 **/
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

/**
 * This function is to determine from the questions option type clicked
 * what's the answer to that particular question type
 **/
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
