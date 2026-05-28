// vars
const startDate = new Date("2023-06-11T00:00:00");

const songs = [
  {
    title: "rewind by twice",
    src: "../assets/music/rewind-twice.mp3"
  },
  {
    title: "look by red velvet",
    src: "../assets/music/look-red-velvet.mp3"
  },
  {
    title: "miniskirt by aoa",
    src: "../assets/music/miniskirt-aoa.mp3"
  },
  {
    title: "nintendogs main theme",
    src: "../assets/music/nintendogs-main-theme.mp3"
  },
  {
    title: "polaroid love by enhypen",
    src: "../assets/music/polaroid-love-enhypen.mp3"
  },
  {
    title: "replay by shinee",
    src: "../assets/music/replay-shinee.mp3"
  },
  {
    title: "suddenly by ioi",
    src: "../assets/music/suddenly-ioi.mp3"
  },
  {
    title: "oishinbo ds recipe main theme",
    src: "../assets/music/oishinbo-ds-recipe-main-theme.mp3"
  },
  {
    title: "not cute anymore by illit",
    src: "../assets/music/not-cute-anymore-illit.mp3"
  }
]
let currentSong = 0;
const audio = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");

// TIMER
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  document.getElementById("relationship-timer").innerText =
    `${days}d, ${hours % 24}h, ${mins % 60}m, ${seconds % 60}s`;
}

setInterval(updateTimer, 1000);
updateTimer();

// MUSIC PLAYER
// load current song
function loadSong(i) {
  const song = songs[i];
  audio.src = song.src;
  songTitle.innerText = song.title;
}

// next song logic
function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  audio.play();
}

// prev song logic
function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  audio.play();
}

// play btn
document.getElementById("play-btn").addEventListener("click", () => {
  audio.play();
});

// pause btn
document.getElementById("pause-btn").addEventListener("click", () => {
  audio.pause();
});

// next btn
document.getElementById("next-song").addEventListener("click", nextSong);

// prev btn
document.getElementById("prev-song").addEventListener("click", prevSong);

audio.addEventListener("ended", nextSong);

// load first song
loadSong(currentSong);