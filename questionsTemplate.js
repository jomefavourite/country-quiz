let a = {
  nigeria: {
    countryFlag: "Which country does this flag below to?",
    capital: "What's the capital of Nigeria?",
    subRegion: "What Sub Region those the country Nigeria belong to?",
    language: "Which of these languages is spoken in this country?",
    continents: "What continent those Nigeria belong to?",
  },
};

export const CapitalQuestion = function (data, wrongChoices) {
  const overAllData = [
    {
      option: data.name.common,
      answer: true,
    },
    {
      option: wrongChoices[0].name.common,
      answer: false,
    },
    {
      option: wrongChoices[1].name.common,
      answer: false,
    },
    {
      option: wrongChoices[2].name.common,
      answer: false,
    },
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <h3>${data.capital} is the capital of</h3>
  </div>

  ${buttonsContainer(randomArray)}
`;
};

export const ContinentQuestion = function (data, wrongChoices) {
  const overAllData = [
    {
      option: data.continents[0],
      answer: true,
    },
    {
      option: wrongChoices[0].continents[0],
      answer: false,
    },
    {
      option: wrongChoices[1].continents[0],
      answer: false,
    },
    {
      option: wrongChoices[2].continents[0],
      answer: false,
    },
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
    {
      option: data.name.common,
      answer: true,
    },
    {
      option: wrongChoices[0].name.common,
      answer: false,
    },
    {
      option: wrongChoices[1].name.common,
      answer: false,
    },
    {
      option: wrongChoices[2].name.common,
      answer: false,
    },
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
    {
      option: data.subregion,
      answer: true,
    },
    {
      option: wrongChoices[0].subregion,
      answer: false,
    },
    {
      option: wrongChoices[1].subregion,
      answer: false,
    },
    {
      option: wrongChoices[2].subregion,
      answer: false,
    },
  ];

  const randomArray = shuffleArray(overAllData);

  return `
   <div class="card__question">
    <h3>What Sub Region those the country ${data.name.common} belong to?</h3>
  </div>

    ${buttonsContainer(randomArray)}
`;
};

// export const LanguageQuestion = function (data) {
//   const overAllData = [
//     {
//       option: data.name.common,
//       answer: true,
//     },
//     {
//       option: wrongChoices[0].name.common,
//       answer: false,
//     },
//     {
//       option: wrongChoices[1].name.common,
//       answer: false,
//     },
//     {
//       option: wrongChoices[2].name.common,
//       answer: false,
//     },
//   ];

//   const randomArray = shuffleArray(overAllData);
//   return `
//    <div class="card__question">
//     <h3>Which of these languages is spoken in the country ${
//       data.name.common
//     }?</h3>
//   </div>

//    ${buttonsContainer(randomArray)}
// `;
// };

function buttonsContainer(randomArray) {
  return `
    <div class="card__buttons">
      <button class="button__option" data-option="A" data-ans=${randomArray[0].answer}>
        <span class="btn-label"> A </span>
        <span class="btn-option"> ${randomArray[0].option} </span>
      </button>
      <button class="button__option" data-option="B" data-ans=${randomArray[0].answer}>
        <span class="btn-label"> B </span>
        <span class="btn-option"> ${randomArray[1].option} </span>
      </button>
      <button class="button__option" data-option="C" data-ans=${randomArray[0].answer}>
        <span class="btn-label"> C </span>
        <span class="btn-option"> ${randomArray[2].option} </span>
      </button>
      <button class="button__option" data-option="D" data-ans=${randomArray[0].answer}>
        <span class="btn-label"> D </span>
        <span class="btn-option"> ${randomArray[3].option} </span>
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
