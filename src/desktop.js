let highestZ = 1;
const icons = document.querySelectorAll(".desktop-icon");
const windows = document.querySelectorAll(".window");
const tabs = document.querySelectorAll(".tab");

const allApps = new Map();

const openSfx = new Audio("../assets/sfx/windows-xp-start.wav");
const closeSfx = new Audio("../assets/sfx/windows-xp-minimize.wav");

// loading screen logic
const loadingText = document.getElementById("loading-text");
const interval = setInterval(() => {
  audio.play();
  clearInterval(interval);
  document.getElementById("loading-screen").style.display = "none";
  return;
}, 2000);

// make windows draggable
function makeDraggable(win) {
  const header = win.querySelector(".win-header");

  let offsetX, offsetY;
  let isDragging = false;

  header.addEventListener("mousedown", (e) => {
    focusWindow(win);

    const id = win.id;
    const app = allApps.get(id);
    if (app) {
      focusTab(app.tab);
    }

    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// bring focused window to front
function focusWindow(win) {
  highestZ++;
  win.style.zIndex = highestZ;

  windows.forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
}

// focus corresponding tab
function focusTab(tab) {
  tabs.forEach((t) => t.classList.remove("focused"));
  tab.classList.add("focused");
}

// open app by id
function openApp(id) {
  const app = allApps.get(id);

  if (!app) return;

  app.win.classList.add("active");
  app.tab.classList.add("active");

  focusWindow(app.win);
  focusTab(app.tab);

  openSfx.currentTime = 0;
  openSfx.play();
}

// close app by id
function closeApp(id) {
  const app = allApps.get(id);

  if (!app) return;

  app.win.classList.remove("active");
  app.tab.classList.remove("active");

  closeSfx.currentTime = 0;
  closeSfx.play();
}

// initialize windows
windows.forEach((win) => {
  const id = win.id;
  const tab = document.getElementById(id + "-tab");
  allApps.set(id, { win, tab });

  makeDraggable(win);

  // focus window and tab
  win.addEventListener("mousedown", () => {
    focusWindow(win);
    if (tab) {
      focusTab(tab);
    }
  });

  // close tab and window
  const closeBtn = win.querySelector(".win-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      closeApp(id);
    });
  }
});

// open windows on icon dbl click
icons.forEach((icon) => {
  icon.addEventListener("dblclick", () => {
    const id = icon.dataset.window;
    openApp(id);
  });
});

// taskbar tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.id.replace("-tab", "");
    openApp(id);
  });
});

// taskbar clock
function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("clock").innerText = time;
}

setInterval(updateClock, 1000);
updateClock();
