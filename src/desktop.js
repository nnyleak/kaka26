let highestZ = 1;
const icons = document.querySelectorAll(".desktop-icon");
const windows = document.querySelectorAll(".window");
const tabs = document.querySelectorAll(".tab");

const allApps = new Map();

const openSfx = new Audio("../assets/sfx/windows-xp-start.wav");
const closeSfx = new Audio("../assets/sfx/windows-xp-minimize.wav");

const loadingScreen = document.getElementById("loading-screen");
const loadingFill = document.getElementById("loading-fill");
const loadingText = document.getElementById("loading-text");
let loadingProgress = 0;

// loading screen logic
const loadingInterval = setInterval(() => {
  loadingProgress += Math.random() * 20;

  if (loadingProgress >=100) {
    loadingProgress = 100;
    loadingFill.style.width = "100%";
    loadingText.innerText = "WELCOME BEBI! ♡";

    clearInterval(loadingInterval);

    setTimeout(() => {
      loadingScreen.classList.add("fade-out");

      audio.play();

      setTimeout(() => {
        loadingScreen.remove();
      }, 1000);
    }, 500);
  } else {
    loadingFill.style.width = `${loadingProgress}%`;
  }
}, 200);

// make windows resizable
function makeResizable(win) {
  const directions = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

  directions.forEach((dir) => {
    const handle = document.createElement("div");
    handle.classList.add("resize-handle", `resize-${dir}`);
    win.appendChild(handle);

    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();

      focusWindow(win);

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = win.offsetWidth;
      const startH = win.offsetHeight;
      const startLeft = win.offsetLeft;
      const startTop = win.offsetTop;
      const contentBody = win.querySelector(".content-body");
      const headerH = win.querySelector(".win-header").offsetHeight;
      const MIN_W = 200;
      const MIN_H = headerH + 60;
      const wOverhead = contentBody ? startW - contentBody.offsetWidth + 19 : 0;
      const hOverhead = contentBody ? startH - contentBody.offsetHeight : headerH + 40;
      const startMaxH = contentBody ? contentBody.offsetHeight - 22 : 0;

      function onMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newW = startW;
        let newH = startH;
        let newLeft = startLeft;
        let newTop = startTop;

        if (dir.includes("e")) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes("s")) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes("w")) {
          newW = Math.max(MIN_W, startW - dx);
          newLeft = startLeft + startW - newW;
        }
        if (dir.includes("n")) {
          newH = Math.max(MIN_H, startH - dy);
          newTop = startTop + startH - newH;
        }

        win.style.width = newW + "px";
        win.style.left = newLeft + "px";
        win.style.top = newTop + "px";

        if (contentBody) {
          if (dir.includes("e") || dir.includes("w")) {
            contentBody.style.width = Math.max(100, newW - wOverhead) + "px";
          }
          if (dir.includes("s") || dir.includes("n")) {
            contentBody.style.maxHeight = Math.max(60, startMaxH + (newH - startH)) + "px";
          }
        }
      }

      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  });
}

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
  makeResizable(win);

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