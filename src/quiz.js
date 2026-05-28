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
        question: "4. what would i gobble up in 2 seconds?",
        options: ["chick fil a", "sushi", "ferrero rocher", "all of the above"],
        answer: 3
    },
    {
        question: "5. what's my mcdonalds order?",
        options: ["big mac", "20pc nugs w stolen fries", "happy meal w xtra fries", "m&ms mcflurry w xtra m&ms"],
        answer: 1
    },
    {
        question: "6. where did we first meet?",
        options: ["upper dance studio", "lower dance studio", "salsas", "ur moms house"],
        answer: 1
    },
    {
        question: "7. what did we do on our first city date as a couple?",
        options: ["japan fes", "taco bell", "ktown", "kinokuniya"],
        answer: 0
    },
    {
        question: "8. what movie did we watch when we built the kiki's diorama?",
        options: ["knives out", "the substance", "the strangers", "soft & quiet"],
        answer: 3
    },
    {
        question: "9. where did we eat for brunch on our first anniversary?",
        options: ["bahama breeze", "hot stone bbq", "mcdonalds", "willow & whisk"],
        answer: 1
    },
    {
        question: "10. would you still love me if i was a giant cockroach?",
        options: ["yes", "YESSSSS", "FUCKKKK I LOVE YOU COCKROACH", "OMFG SEXY YESSSSS"],
        answer: 2
    }
];

let questionEl = document.querySelector(".question");
let optionsEl = document.querySelector(".options");
let submitBtn = document.querySelector(".submit-btn");
let wrongEl = document.querySelector(".wrong-answer");
let currentQuestionIndex = 0;
let giftEl = document.querySelector(".gift");

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
        document.querySelector(".wrong").style.display = "flex";
        document.querySelector("#try-again-btn").addEventListener("click", () => {
            document.querySelector(".wrong").style.display = "none";
            quiz.style.display = "flex";
        });
    }
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        quiz.style.display = "none";
        giftEl.style.display = "flex";
    }
}

loadQuestion();

