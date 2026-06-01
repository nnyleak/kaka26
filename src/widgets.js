// vars
const startDate = new Date("2023-06-11T00:00:00");

const songs = [
  {
    title: "main theme",
    artist: "oishinbo ds recipe",
    src: "../assets/music/oishinbo-ds-recipe-main-theme.mp3",
    cover: "../assets/images/covers/oishinbo-ds-recipe-pixel-cover.png",
  },
  {
    title: "look",
    artist: "red velvet",
    src: "../assets/music/look-red-velvet.mp3",
    cover: "../assets/images/covers/look-pixel-cover.png",
  },
  {
    title: "miniskirt",
    artist: "aoa",
    src: "../assets/music/miniskirt-aoa.mp3",
    cover: "../assets/images/covers/miniskirt-pixel-cover.png",
  },
  {
    title: "polaroid love",
    artist: "enhypen",
    src: "../assets/music/polaroid-love-enhypen.mp3",
    cover: "../assets/images/covers/polaroid-love-pixel-cover.png",
  },
  {
    title: "replay",
    artist: "shinee",
    src: "../assets/music/replay-shinee.mp3",
    cover: "../assets/images/covers/replay-pixel-cover.png",
  },
  {
    title: "suddenly",
    artist: "ioi",
    src: "../assets/music/suddenly-ioi.mp3",
    cover: "../assets/images/covers/suddenly-pixel-cover.png",
  },
  {
    title: "not cute anymore",
    artist: "illit",
    src: "../assets/music/not-cute-anymore-illit.mp3",
    cover: "../assets/images/covers/not-cute-anymore-pixel-cover.png",
  },
];
let currentSong = 0;
const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songCover = document.getElementById("song-cover");

const currentBar = document.getElementById("current-bar");
const currentTime = document.getElementById("current-time");
const fullTime = document.getElementById("full-time");
const barBox = document.getElementById("bar-box");

const memPhotos = [
  {
    image: "../assets/images/mem-widget/pic1.jpg",
    caption: "caption 1",
  },
  {
    image: "../assets/images/mem-widget/pic2.jpg",
    caption: "caption 2",
  },
  {
    image: "../assets/images/mem-widget/pic3.jpg",
    caption: "caption 3",
  },
];
const memPhoto = document.getElementById("mem-photo");
const memCaption = document.getElementById("mem-caption");
let currentMem = 0;
const shuffledMems = [...memPhotos].sort(() => Math.random() - 0.5);

// TIMER
function pad(num) {
  return String(num).padStart(2, "0");
}

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  document.getElementById("widget-days").innerText = pad(days);
  document.getElementById("widget-hours").innerText = pad(hours % 24);
  document.getElementById("widget-mins").innerText = pad(mins % 60);
  document.getElementById("widget-secs").innerText = pad(seconds % 60);
}

setInterval(updateTimer, 1000);
updateTimer();

// MUSIC PLAYER
// load current song
function loadSong(i) {
  const song = songs[i];
  audio.src = song.src;
  songTitle.innerText = song.title;
  songArtist.innerText = song.artist;
  songCover.querySelector("img").src = song.cover;
}

// formatting duration time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// update progress bar and time info
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  currentBar.style.width = `${percent}%`;
  currentTime.innerText = formatTime(audio.currentTime);
});

// set full time when metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  fullTime.innerText = formatTime(audio.duration);
});

// seek functionality
barBox.addEventListener("click", (e) => {
  const rect = barBox.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
});

// update play/pause icon
function updatePlayIcon() {
  const use = playPauseBtn.querySelector("use");
  if (audio.paused) {
    use.setAttribute("href", "#play-icon");
  } else {
    use.setAttribute("href", "#pause-icon");
  }
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  updatePlayIcon();
});

// next song logic
function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  audio.play();
  updatePlayIcon();
}

// prev song logic
function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  audio.play();
  updatePlayIcon();
}

// play pause btns
audio.addEventListener("play", updatePlayIcon);
audio.addEventListener("pause", updatePlayIcon);

// next btn
document.getElementById("next-btn").addEventListener("click", nextSong);

// prev btn
document.getElementById("prev-btn").addEventListener("click", prevSong);

audio.addEventListener("ended", nextSong);

// load first song
loadSong(currentSong);

// SYSTEM STATS
function updateStatBar(id, textId, min, max) {
  const fill = document.getElementById(id);
  const percent = document.getElementById(textId);

  const value = Math.floor(Math.random() * (max - min + 1)) + min;

  fill.style.width = `${value}%`;
  percent.innerText = `${value}%`;
}

// update stats every few seconds
function updateStats() {
  updateStatBar("love-fill", "love-text", 96, 100);
  updateStatBar("happy-fill", "happy-text", 85, 100);
  updateStatBar("bebi-fill", "bebi-text", 98, 100);
  updateStatBar("future-fill", "future-text", 75, 95);
}

updateStats();
setInterval(updateStats, 2500);

// PHOTO SLIDESHOW
function nextPhoto() {
  const mem = shuffledMems[currentMem];

  memPhoto.src = mem.image;
  memCaption.innerText = mem.caption;

  currentMem++;

  if (currentMem >= shuffledMems.length) {
    currentMem = 0;
  }
}

nextPhoto();
setInterval(nextPhoto, 5000);
