let startQuizBtn = document.querySelector("#start-quiz-btn");
let quiz = document.querySelector(".quiz");
let startMsg = document.querySelector("#start-msg");

startQuizBtn.addEventListener("click", function () {
    startMsg.style.display = "none";
    startQuizBtn.style.display = "none";
    quiz.style.display = "flex";
});

let questions = [
    {
        question: "1. what is pee pee poo poo?",
        options: ["pee", "poo", "poopie", "peepoo"],
        answer: 2
    },
    {
        question: "2. what is my favorite color?",
        options: ["blood of my enemies", "diarrhea", "tree", "chartreuse"],
        answer: 0
    },
    {
        question: "3. which instrument do i not know?",
        options: ["piano", "guitar", "violin", "flute"],
        answer: 2
    },
    {
        question: "4. what ",
        options: ["pizza", "sushi", "tacos", "ice cream"],
        answer: 1
    },
    {
        question: "4. where did we first meet?",
        options: ["upper dance studio", "lower dance studio", "salsas", ""],
        answer: 0
    }
];

let questionEl = document.querySelector(".question");
let optionsEl = document.querySelector(".options");
let submitBtn = document.querySelector(".submit-btn");
let wrongEl = document.querySelector(".wrong-answer");
let currentQuestionIndex = 0;

function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        let optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.classList.add("option");
        optionElement.addEventListener("click", () => checkAnswer(index));
        optionsEl.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        currentQuestionIndex++;
    } else {
        quiz.style.display = "none";

    }
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Congratulations! You've completed the quiz.");
    }
}

loadQuestion();

