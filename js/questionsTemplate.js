export const CapitalQuestion = function (data, wrongChoices) {
  const overAllData = [
    data.name.common,
    wrongChoices[0].name.common,
    wrongChoices[1].name.common,
    wrongChoices[2].name.common,
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <h3>${data.capital[0]} is the capital of</h3>
  </div>

  ${buttonsContainer(randomArray)}
`;
};

export const ContinentQuestion = function (data, wrongChoices) {
  const overAllData = [
    data.continents[0],
    wrongChoices[0].continents[0],
    wrongChoices[1].continents[0],
    wrongChoices[2].continents[0],
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <h3>What continent those ${data.name.common}  belong to?</h3>
  </div>

  ${buttonsContainer(randomArray)}
`;
};

export const CountryFlagQuestion = function (data, wrongChoices) {
  const overAllData = [
    data.name.common,
    wrongChoices[0].name.common,
    wrongChoices[1].name.common,
    wrongChoices[2].name.common,
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <img
      src="${data.flags[0]}"
      alt="${data.name.common}"
      class="card__question--image"
    />
    <h3>Which country does this flag below to?</h3>
  </div>

  ${buttonsContainer(randomArray)}
  `;
};

export const SubRegionQuestion = function (data, wrongChoices) {
  const overAllData = [
    data.subregion,
    wrongChoices[0].subregion,
    wrongChoices[1].subregion,
    wrongChoices[2].subregion,
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <h3>What Sub Region those the country ${data.name.common} belong to?</h3>
  </div>

    ${buttonsContainer(randomArray)}
`;
};

export const ResultContainer = function (score) {
  return `
    <img
      src="./images/undraw_winners_ao2o 2.svg"
      alt="winners"
      class="card__img--2"
    />
    <div class="card__result">
      <h3 class="result-text">Results</h3>
      <p>You got <span class="score">${score}</span> correct answers</p>
      <button class="btn__tryAgain">Try Again</button>
    </div>
  `;
};

function buttonsContainer(randomArray) {
  return `
    <div class="card__buttons">
      <button class="button__option" data-option="A">
        <span class="btn-label"> A </span>
        <span class="btn-option"> ${randomArray[0]} </span>
      </button>
      <button class="button__option" data-option="B">
        <span class="btn-label"> B </span>
        <span class="btn-option"> ${randomArray[1]} </span>
      </button>
      <button class="button__option" data-option="C">
        <span class="btn-label"> C </span>
        <span class="btn-option"> ${randomArray[2]} </span>
      </button>
      <button class="button__option" data-option="D">
        <span class="btn-label"> D </span>
        <span class="btn-option"> ${randomArray[3]} </span>
      </button>
    </div>
  `;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
