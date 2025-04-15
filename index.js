
  const startBtn = document.getElementById("start-btn");
  const startPage = document.getElementById("start-page");
  const quizApp = document.querySelector(".app");

  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  const playerScore = document.getElementById("player-score");
  const questionNumber = document.getElementById("question-number");

  const resultPage = document.getElementById("result-page");
  const restartBtn = document.getElementById("restart-btn");
  const finalScore = document.getElementById("final-score");

  const TOTAL_QUESTIONS = 5;
  let currentQuestion = {};
  let correctAnswer = "";
  let score = 0;
  let questionCounter = 0;


  startBtn.addEventListener("click", () => {
    startPage.style.display = "none";
    quizApp.style.display = "block";
    questionCounter = 0;
    score = 0;
    fetchQuestion(); 
  });

  restartBtn.addEventListener("click", () => {
    resultPage.style.display = "none";
    startPage.style.display = "block";
  });

  nextButton.addEventListener("click", () => {
    nextButton.style.display = "none";
    fetchQuestion();
  });

  const QUIZ_URL = "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple";

  function fetchQuestion() {
    if (questionCounter >= TOTAL_QUESTIONS) {
        endQuiz();
        return;
      }
  

    fetch(QUIZ_URL)
      .then(response => response.json())
      .then(data => {
        const quiz = data.results[0];
        currentQuestion = quiz;
        correctAnswer = quiz.correct_answer;

        questionElement.innerHTML = quiz.question;

        const allAnswers = [quiz.correct_answer, ...quiz.incorrect_answers];
        const shuffledAnswers = shuffle(allAnswers);

        answerButtonsElement.innerHTML = ""; 

        shuffledAnswers.forEach(answer => {
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.innerHTML = answer;
          btn.addEventListener("click", () => selectAnswer(btn, answer));
          answerButtonsElement.appendChild(btn);
        });
        questionCounter++;
        questionNumber.innerText = questionCounter;
        playerScore.innerText = score;

      })
      .catch(error => console.error("Error fetching quiz:", error));
  }

  function selectAnswer(button, selectedAnswer) {
    const buttons = answerButtonsElement.querySelectorAll(".btn");

    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.innerHTML === correctAnswer) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("incorrect");
      }
    });

    if (selectedAnswer === correctAnswer) {
      score++;
    }
 
    playerScore.innerText = score;
    questionCounter++;
    questionNumber.innerText = questionCounter;

    nextButton.style.display = "block";
  }

  function disableAnswers() {
    const buttons = answerButtonsElement.querySelectorAll(".btn");

    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.innerHTML === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  function endQuiz() {
    quizApp.style.display = "none";
    resultPage.style.display = "block";
    finalScore.innerText = score;
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

