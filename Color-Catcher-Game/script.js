'use strict';

// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================
const GAME_DURATION = 60;
const GRID_SIZE = 4; // 4x4 grid
const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;

// ==========================================
// 2. DOM ELEMENTS (SELECTORS)
// ==========================================
const gridContainer = document.getElementById("grid");
const targetColorSpan = document.getElementById("targetColor");
const timeSpan = document.getElementById("time");
const scoreSpan = document.getElementById("score");

// Buttons
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const quitBtn = document.getElementById("quitBtn");
const themeToggleBtn = document.getElementById("themeToggle");

// ==========================================
// 3. GAME STATE
// ==========================================
let score = 0;
let timeLeft = GAME_DURATION;
let timerInterval = null;
let isPlaying = false;
let isPaused = false;
let targetColor = "";

// ==========================================
// 4. HELPER FUNCTIONS
// ==========================================

/**
 * Generates a random RGB color string.
 * @returns {string} "rgb(r, g, b)"
 */
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Starts or Resumes the countdown timer.
 * Used by startGame() and togglePause().
 */
function startTimer() {
    clearInterval(timerInterval); // Prevent multiple timers running
    timerInterval = setInterval(() => {
        timeLeft--;
        timeSpan.innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame(false); // false = naturally ran out of time
        }
    }, 1000);
}

/**
 * Resets the UI to the "Game Stopped" state.
 */
function resetGameUI() {
    isPlaying = false;
    isPaused = false;

    // Reset Buttons
    startBtn.disabled = false;
    startBtn.innerText = "🎮 Start Game";

    quitBtn.disabled = true;

    // Disable and Reset Pause Button
    pauseBtn.disabled = true;
    pauseBtn.innerText = "⏸️ Pause";

    // Clear Board & Blur Effects
    gridContainer.innerHTML = "";
    gridContainer.classList.remove("grid-blurred");
    targetColorSpan.innerText = "";
    targetColorSpan.style.color = "inherit";
}

// ==========================================
// 5. CORE GAME LOGIC
// ==========================================

function startGame() {
    if (isPlaying) return;

    // Reset State
    score = 0;
    timeLeft = GAME_DURATION;
    isPlaying = true;
    isPaused = false;

    // Update UI Stats
    scoreSpan.innerText = score;
    timeSpan.innerText = timeLeft;

    // Update Buttons
    startBtn.disabled = true;
    startBtn.innerText = "Game Running...";
    quitBtn.disabled = false;
    pauseBtn.disabled = false;
    pauseBtn.innerText = "⏸️ Pause";

    // Ensure grid is visible
    gridContainer.classList.remove("grid-blurred");

    // Begin Game
    startTimer();
    setupRound();
}

function togglePause() {
    if (!isPlaying) return;

    isPaused = !isPaused;

    if (isPaused) {
        // PAUSE: Stop time, blur grid
        clearInterval(timerInterval);
        pauseBtn.innerText = "▶️ Resume";
        gridContainer.classList.add("grid-blurred");
        timeSpan.innerText = "PAUSED";
    } else {
        // RESUME: Start time, unblur grid
        pauseBtn.innerText = "⏸️ Pause";
        gridContainer.classList.remove("grid-blurred");
        timeSpan.innerText = timeLeft;
        startTimer();
    }
}

function setupRound() {
    // Clear previous squares
    gridContainer.innerHTML = "";

    // Set Grid CSS dynamically
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    gridContainer.style.gap = "10px";

    // Generate colors
    const colorsArray = Array.from({ length: TOTAL_SQUARES }, () => getRandomColor());

    // Pick Target
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    targetColor = colorsArray[randomIndex];

    // Update Hint UI
    targetColorSpan.innerText = targetColor;
    targetColorSpan.style.color = targetColor;

    // OPTIMIZATION: Use DocumentFragment to batch DOM insertions
    const fragment = document.createDocumentFragment();

    colorsArray.forEach(color => {
        const square = document.createElement("div");

        // Apply Styles
        Object.assign(square.style, {
            backgroundColor: color,
            height: "60px",
            width: "100%",
            borderRadius: "8px",
            cursor: "pointer",
            border: "1px solid #ddd"
        });

        square.onclick = () => handleColorClick(color);
        fragment.appendChild(square);
    });

    gridContainer.appendChild(fragment);
}

function handleColorClick(clickedColor) {
    // Prevent interaction if game is stopped OR paused
    if (!isPlaying || isPaused) return;

    if (clickedColor === targetColor) {
        score++;
        scoreSpan.innerText = score;
        setupRound();
    } else {
        console.log("Wrong color!");
    }
}

/**
 * Ends the game and shows the result.
 * @param {boolean} isQuit - true if user quit manually
 */
function endGame(isQuit) {
    clearInterval(timerInterval);

    const message = isQuit
        ? `Game Quitted! You stopped with a score of: ${score}`
        : `Time's up! 🏁\nFinal Score: ${score}`;

    // Small delay to let the timer UI hit "0" before alert blocks execution
    setTimeout(() => {
        alert(message);
        resetGameUI();
    }, 50);
}

// ==========================================
// 6. EVENT LISTENERS
// ==========================================

// Game Controls
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
quitBtn.addEventListener("click", () => {
    if (isPlaying) endGame(true);
});

// Theme Toggle
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggleBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});