const questions = [
  {
    countryFlag: [
      {
        nigeria: "Which country does this flag below to?",
      },
      {
        benin: "Which country does this flag below to?",
      },
      {
        comoros: "Which country does this flag below to?",
      },
      {
        zimbabwe: "Which country does this flag below to?",
      },
      {
        chad: "Which country does this flag below to?",
      },
      {
        cameroon: "Which country does this flag below to?",
      },
    ],
  },
  {
    capital: [
      {
        nigeria: "What's the capital of Nigeria?",
      },
      {
        benin: "What's the capital of Benin?",
      },
      {
        comoros: "What's the capital of Comoros?",
      },
      {
        zimbabwe: "What's the capital of Zimbabwe?",
      },
      {
        chad: "What's the capital of Chad?",
      },
      {
        cameroon: "What's the capital of Cameroon?",
      },
    ],
  },
  {
    subRegion: [
      {
        nigeria: "What's the capital of Nigeria?",
      },
      {
        benin: "What's the capital of Benin?",
      },
      {
        comoros: "What's the capital of Comoros?",
      },
      {
        zimbabwe: "What's the capital of Zimbabwe?",
      },
      {
        chad: "What's the capital of Chad?",
      },
      {
        cameroon: "What's the capital of Cameroon?",
      },
    ],
  },
  {
    language: [
      {
        nigeria: "Which of these languages is spoken in this country?",
      },
      {
        benin: "Which of these languages is spoken in this country?",
      },
      {
        comoros: "Which of these languages is spoken in this country?",
      },
      {
        zimbabwe: "Which of these languages is spoken in this country?",
      },
      {
        chad: "Which of these languages is spoken in this country?",
      },
      {
        cameroon: "Which of these languages is spoken in this country?",
      },
    ],
  },
  {
    coatOfArms: [
      {
        nigeria: "What country's Coat of Arms is this?",
      },
      {
        benin: "What country's Coat of Arms is this?",
      },
      {
        comoros: "What country's Coat of Arms is this?",
      },
      {
        zimbabwe: "What country's Coat of Arms is this?",
      },
      {
        chad: "What country's Coat of Arms is this?",
      },
      {
        cameroon: "What country's Coat of Arms is this?",
      },
    ],
  },
];

function determineQuestion(questionsRandom) {
  const question = questions[questionsRandom];

  const typeOfQuestionRandom =
    Object.values(question)[0][
      Math.floor(Object.values(question)[0].length * Math.random() + 1)
    ];

  console.log(question);
  console.log(typeOfQuestionRandom);

  const countriesData = fetchCountriesData();

  console.log(countriesData.then((data) => console.log(data)));

  countriesData.then((data) => {
    console.log(
      data.find(
        (country) =>
          country.name.common.toLowerCase() ===
          Object.keys(typeOfQuestionRandom)[0]
      )
    );
  });
}

determineQuestion(questionsRandom);

const questions = [
  {
    nigeria: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Nigeria?",
      subRegion: "What's the capital of Nigeria?",
      language: "Which of these languages is spoken in this country?",
      continents: "What country's continent is this?",
    },
  },
  {
    benin: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Benin?",
      subRegion: "What's the capital of Benin?",
      language: "Which of these languages is spoken in this country?",
      coatOfArms: "What country's Coat of Arms is this?",
    },
  },
  {
    comoros: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Comoros?",
      subRegion: "What's the capital of Comoros?",
      language: "Which of these languages is spoken in this country?",
      coatOfArms: "What country's Coat of Arms is this?",
    },
  },
  {
    zimbabwe: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Zimbabwe?",
      subRegion: "What's the capital of Zimbabwe?",
      language: "Which of these languages is spoken in this country?",
      coatOfArms: "What country's Coat of Arms is this?",
    },
  },
  {
    chad: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Chad?",
      subRegion: "What's the capital of Chad?",
      language: "Which of these languages is spoken in this country?",
      coatOfArms: "What country's Coat of Arms is this?",
    },
  },
  {
    cameroon: {
      countryFlag: "Which country does this flag below to?",
      capital: "What's the capital of Cameroon?",
      subRegion: "What's the capital of Cameroon?",
      language: "Which of these languages is spoken in this country?",
      coatOfArms: "What country's Coat of Arms is this?",
    },
  },
];

const buttonOption1 = select(".button__option--1");
const buttonOption2 = select(".button__option--2");
const buttonOption3 = select(".button__option--3");
const buttonOption4 = select(".button__option--4");

buttonOption1.addEventListener(
  "click",
  cb(
    countryData,
    questionType,
    buttonOption1,
    buttonOption2,
    buttonOption3,
    buttonOption4
  ),
  {
    once: true,
  }
);
buttonOption2.addEventListener(
  "click",
  cb(
    countryData,
    questionType,
    buttonOption1,
    buttonOption2,
    buttonOption3,
    buttonOption4
  ),
  {
    once: true,
  }
);
buttonOption3.addEventListener(
  "click",
  cb(
    countryData,
    questionType,
    buttonOption1,
    buttonOption2,
    buttonOption3,
    buttonOption4
  ),
  {
    once: true,
  }
);
buttonOption4.addEventListener(
  "click",
  cb(
    countryData,
    questionType,
    buttonOption1,
    buttonOption2,
    buttonOption3,
    buttonOption4
  ),
  {
    once: true,
  }
);

function cb(
  countryData,
  questionType,
  buttonOption1,
  buttonOption2,
  buttonOption3,
  buttonOption4
) {
  return function handleClick() {
    const selectedOption = this;
    const selectedOptionText = this.lastElementChild.innerText;
    const answer = checkButtonClicked(countryData, questionType);

    if (answer === selectedOptionText) {
      console.log(answer);
      console.log(selectedOptionText);
      console.log(selectedOption);

      selectedOption.classList.add("correct");
    } else {
      selectedOption.classList.add("wrong");
    }

    buttonOption1.removeEventListener("click", handleClick);
    buttonOption2.removeEventListener("click", handleClick);
    buttonOption3.removeEventListener("click", handleClick);
    buttonOption4.removeEventListener("click", handleClick);
  };
}
