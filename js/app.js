// Initialize stats
let stats = {
    hunger: 10,
    cleanliness: 10,
    happiness: 10,
    exercise: 10
};

// Variables to control the game state
let gameInterval;
const statDecayRate = 10000;

// Function to start the game
function startGame() {
    console.log("Game Started");
    gameInterval = setInterval(() => {
        updateStats();
        renderStats();
    }, statDecayRate);
}

// Function to update stats (decay over time)
function updateStats() {
    stats.hunger = Math.max(0, stats.hunger - 1); // Hunger decreases
    stats.cleanliness = Math.max(0, stats.cleanliness - 1); // Cleanliness decreases
    stats.happiness = Math.max(0, stats.happiness - 1); // Happiness decreases
    stats.exercise = Math.max(0, stats.exercise - 1); // Exercise decreases
}

// Function to render stats on screen
function renderStats() {
    document.getElementById('hunger-stat').textContent = `Hunger: ${stats.hunger}/10`;
    document.getElementById('cleanliness-stat').textContent = `Cleanliness: ${stats.cleanliness}/10`;
    document.getElementById('happiness-stat').textContent = `Happiness: ${stats.happiness}/10`;
    document.getElementById('exercise-stat').textContent = `Exercise: ${stats.exercise}/10`;
}

// Functions to handle button clicks
function feed() {
    console.log("feed was pushed");
    stats.hunger = Math.min(10, stats.hunger + 2); // Increase hunger stat
    stats.cleanliness = Math.max(0, stats.cleanliness - 1); // Cleanliness decreases
    decreaseHealth();
}

function clean() {
    console.log("clean was pushed");
    stats.cleanliness = Math.min(10, stats.cleanliness + 2); // Increase cleanliness stat
    stats.happiness = Math.max(0, stats.happiness - 1); // Happiness decreases
}

function play() {
    console.log("play was pushed");
    stats.happiness = Math.min(10, stats.happiness + 2); // Increase happiness stat
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
}

function exercise() {
    console.log("exercise was pushed");
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
    stats.hunger = Math.max(0, stats.hunger - 1); // Hunger decreases
}

// Event listeners for buttons
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('clean').addEventListener('click', clean);
document.getElementById('play').addEventListener('click', play);
document.getElementById('pet').addEventListener('click', exercise);
document.getElementById('start-game').addEventListener('click', startGame);


// startGame();
