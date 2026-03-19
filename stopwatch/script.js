// State management
const STATE = {
    IDLE: 'idle',
    RUNNING: 'running',
    PAUSED: 'paused'
};

let currentState = STATE.IDLE;
let startTime = 0;
let elapsedTime = 0;
let animationFrameId = null;
let lapCounter = 0;

// DOM elements
const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const lapsTitle = document.getElementById('lapsTitle');

// Format time as mm:ss.ms
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

// Update timer display
function updateDisplay() {
    if (currentState === STATE.RUNNING) {
        const now = performance.now();
        const currentElapsed = elapsedTime + (now - startTime);
        timerDisplay.textContent = formatTime(currentElapsed);
        animationFrameId = requestAnimationFrame(updateDisplay);
    }
}

// Update UI state
function updateUI() {
    // Update button states
    switch (currentState) {
        case STATE.IDLE:
            startPauseBtn.textContent = 'Start';
            startPauseBtn.className = 'btn btn-primary';
            lapBtn.disabled = true;
            timerDisplay.className = 'timer-display';
            break;
        case STATE.RUNNING:
            startPauseBtn.textContent = 'Pause';
            startPauseBtn.className = 'btn btn-primary';
            lapBtn.disabled = false;
            timerDisplay.className = 'timer-display running';
            break;
        case STATE.PAUSED:
            startPauseBtn.textContent = 'Resume';
            startPauseBtn.className = 'btn btn-primary';
            lapBtn.disabled = false;
            timerDisplay.className = 'timer-display paused';
            break;
    }
}

// Start or resume the stopwatch
function start() {
    startTime = performance.now();
    currentState = STATE.RUNNING;
    updateUI();
    updateDisplay();
}

// Pause the stopwatch
function pause() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    elapsedTime += performance.now() - startTime;
    currentState = STATE.PAUSED;
    updateUI();
}

// Reset the stopwatch
function reset() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    currentState = STATE.IDLE;
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 0;
    timerDisplay.textContent = '00:00.000';
    lapsList.innerHTML = '';
    lapsTitle.style.display = 'none';
    updateUI();
}

// Record a lap time
function recordLap() {
    if (currentState === STATE.RUNNING || currentState === STATE.PAUSED) {
        lapCounter++;
        const currentTime = currentState === STATE.RUNNING 
            ? elapsedTime + (performance.now() - startTime)
            : elapsedTime;
        
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${formatTime(currentTime)}</span>
        `;
        
        // Insert at the beginning (newest first)
        if (lapsList.firstChild) {
            lapsList.insertBefore(lapItem, lapsList.firstChild);
        } else {
            lapsList.appendChild(lapItem);
        }
        
        lapsTitle.style.display = 'block';
    }
}

// Event listeners
startPauseBtn.addEventListener('click', () => {
    if (currentState === STATE.IDLE || currentState === STATE.PAUSED) {
        start();
    } else if (currentState === STATE.RUNNING) {
        pause();
    }
});

lapBtn.addEventListener('click', recordLap);

resetBtn.addEventListener('click', reset);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        startPauseBtn.click();
    } else if (e.code === 'KeyL' && !lapBtn.disabled) {
        e.preventDefault();
        lapBtn.click();
    } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetBtn.click();
    }
});

// Initialize
updateUI();
