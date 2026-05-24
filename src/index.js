let intro = [
  "hello kato bouthsarath.",
  "i hear today is... a special day.",
  "i've been watching you.",
  "do not be afraid.",
  "there will be a test of love.",
  "are you ready?",
  "please enter the password first.",
];
let introBtns = ["erm, what da freak?", "ummm, how'd you know that?", "STALKER!!!", "i'm not afraid of you!!!", "boi i graduated already?!", "no, duh frick?"];

let introIndex = 0;
let introText = document.querySelector("#intro");
let introBtn = document.querySelector("#btn");
let pinpad = document.querySelector(".pinpad");

introBtn.addEventListener("click", function () {
  introIndex++;

  switch (introIndex) {
    case 0:
      introText.textContent = intro[0];
      introBtn.textContent = introBtns[0];
      break;
    case 1:
      introText.textContent = intro[1];
      introBtn.textContent = introBtns[1];
      break;
    case 2:
      introText.textContent = intro[2];
      introBtn.textContent = introBtns[2];
      break;
    case 3:
      introText.textContent = intro[3];
      introBtn.textContent = introBtns[3];
      break;
    case 4:
      introText.textContent = intro[4];
      introBtn.textContent = introBtns[4];
      break;
    case 5:
      introText.textContent = intro[5];
      introBtn.textContent = introBtns[5];
      break;
    case 6:
      introText.textContent = intro[6];
      pinpad.style.display = "flex";
      introBtn.style.display = "none";
      break;
    default:
  }
});

// pinpad code
let correctPin = "0611";
let btns = document.querySelectorAll(".pinpad-btn");
let input = document.querySelector(".pinpad-input");
let submitBtn = document.querySelector("#submit-btn");
let giveUpBtn = document.querySelector("#give-up-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (input.value.length < 4) {
      input.value += btn.value;
    }});
});

submitBtn.addEventListener("click", function () {
  if (input.value === correctPin) {
    location.href = "quiz.html";
  } else {
    input.value = "";
    alert("wrong password! try again!");
  }
});

giveUpBtn.addEventListener("click", function () {
  location.href = "giveup.html";
});