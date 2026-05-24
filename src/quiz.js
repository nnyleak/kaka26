let startQuizBtn = document.querySelector("#start-quiz-btn");
let quiz = document.querySelector(".quiz");
let startMsg = document.querySelector("#start-msg");

startQuizBtn.addEventListener("click", function () {
    startMsg.style.display = "none";
    startQuizBtn.style.display = "none";
    quiz.style.display = "flex";
});

