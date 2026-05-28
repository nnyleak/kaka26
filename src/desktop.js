let highestZ = 1;
const icons = document.querySelectorAll('.desktop-icon');
const windows = document.querySelectorAll('.window');
const tabs = document.querySelectorAll('.tab');

// make windows draggable
function makeDraggable(win) {
    const header = win.querySelector('.win-header');

    let offsetX, offsetY;
    let isDragging = false;

    header.addEventListener('mousedown', (e) => {
        focusWindow(win);
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        win.style.left = e.clientX - offsetX + 'px';
        win.style.top = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// bring focused window to front
function focusWindow(win) {
    highestZ++;
    win.style.zIndex = highestZ;

    document.querySelectorAll('.window').forEach(w => w.classList.remove('focused'));
    win.classList.add('focused');
}

function focusTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('focused'));
    tab.classList.add('focused');
}

// open windows on icon dbl click
icons.forEach(icon => {
    icon.addEventListener('dblclick', () => {
        const windowId = icon.getAttribute('data-window');
        const windowEl = document.getElementById(windowId);
        const tabEl = document.getElementById(windowId + '-tab');
        windowEl.classList.add('active');
        tabEl.classList.add('active');
        focusWindow(windowEl);
        focusTab(tabEl);
    });
});

// initialize windows
windows.forEach(win => {
    makeDraggable(win);

    win.addEventListener('mousedown', () => {
        focusWindow(win);
        const windowId = win.getAttribute('id');
        const tabEl = document.getElementById(windowId + '-tab');
        focusTab(tabEl);
    });

    // close tab and window
    const closeBtn = win.querySelector('.win-close');
    closeBtn.addEventListener('click', () => {
        win.classList.remove('active');
        const windowId = win.getAttribute('id');
        const tabEl = document.getElementById(windowId + '-tab');
        tabEl.classList.remove('active');
    });
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const windowId = tab.getAttribute('id').replace('-tab', '');
        const windowEl = document.getElementById(windowId);
        focusWindow(windowEl);
        focusTab(tab);
    });
});
