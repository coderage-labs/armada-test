// DOM Elements
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Timer State
let timerInterval = null;
let totalSeconds = 0;
let isRunning = false;
let isPaused = false;

// Initialize
function init() {
    updateDisplay(0, 0);
    
    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Allow Enter key to start timer
    minutesInput.addEventListener('keypress', handleEnterKey);
    secondsInput.addEventListener('keypress', handleEnterKey);
    
    // Input validation
    minutesInput.addEventListener('input', validateInput);
    secondsInput.addEventListener('input', validateInput);
}

function handleEnterKey(e) {
    if (e.key === 'Enter' && !isRunning) {
        startTimer();
    }
}

function validateInput(e) {
    const input = e.target;
    let value = parseInt(input.value) || 0;
    
    if (input.id === 'minutes') {
        if (value < 0) value = 0;
        if (value > 99) value = 99;
    } else if (input.id === 'seconds') {
        if (value < 0) value = 0;
        if (value > 59) value = 59;
    }
    
    input.value = value;
}

function startTimer() {
    if (isRunning && !isPaused) return;
    
    // If starting fresh (not resuming from pause)
    if (!isPaused) {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        totalSeconds = minutes * 60 + seconds;
        
        // Don't start if no time is set
        if (totalSeconds === 0) {
            alert('Please set a time greater than 00:00');
            return;
        }
    }
    
    isRunning = true;
    isPaused = false;
    
    // Update UI
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    display.classList.add('running');
    display.classList.remove('paused', 'finished');
    
    // Start countdown
    timerInterval = setInterval(countdown, 1000);
}

function countdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        updateDisplay(minutes, seconds);
    } else {
        // Timer finished
        finishTimer();
    }
}

function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = true;
    
    // Update UI
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.textContent = 'Resume';
    display.classList.remove('running');
    display.classList.add('paused');
}

function resetTimer() {
    // Clear interval
    clearInterval(timerInterval);
    
    // Reset state
    isRunning = false;
    isPaused = false;
    totalSeconds = 0;
    
    // Reset UI
    minutesInput.value = 0;
    secondsInput.value = 0;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.textContent = 'Start';
    
    updateDisplay(0, 0);
    display.classList.remove('running', 'paused', 'finished');
}

function finishTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    
    // Update UI
    display.classList.remove('running', 'paused');
    display.classList.add('finished');
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    
    // Alert user
    alert('⏰ Time\'s up!');
    
    // Optional: Play sound (commented out - requires audio file)
    // const audio = new Audio('alert.mp3');
    // audio.play();
}

function updateDisplay(minutes, seconds) {
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    display.textContent = `${minutesStr}:${secondsStr}`;
}

// Initialize app
init();
