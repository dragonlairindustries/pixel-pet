// Initialize stats
let stats = {
    hunger: 10,
    cleanliness: 10,
    happiness: 10,
    exercise: 10,
    get total() {
        return this.hunger + this.cleanliness + this.happiness + this.exercise;
    }
};

// Variables to control the game state
let score = 0;
let gameInterval;
const statDecayRate = 100;

// Function to start the game
function startGame() {
    console.log("Game Started");
    gameInterval = setInterval(() => {
        updateStats();
        renderStats();
    }, statDecayRate);
}

// Function to generate a key for each game to be saved in local storage. Example output: 'aB3dE6fG8H'
function generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

// Generate key for game
let gameKey = generateRandomString();

// Function to update stats (decay over time)
function updateStats() {
    stats.hunger = Math.max(0, stats.hunger - 1); // Hunger decreases
    stats.cleanliness = Math.max(0, stats.cleanliness - 1); // Cleanliness decreases
    stats.happiness = Math.max(0, stats.happiness - 1); // Happiness decreases
    stats.exercise = Math.max(0, stats.exercise - 1); // Exercise decreases

    adjustHealthBasedOnStats(); // Adjust health based on updated stats
}

// Function to render stats on screen
function renderStats() {
    document.getElementById('hunger-stat').textContent = `Hunger: ${stats.hunger}/10`;
    document.getElementById('cleanliness-stat').textContent = `Cleanliness: ${stats.cleanliness}/10`;
    document.getElementById('happiness-stat').textContent = `Happiness: ${stats.happiness}/10`;
    document.getElementById('exercise-stat').textContent = `Exercise: ${stats.exercise}/10`;
    adjustHealthBasedOnStats(); // Adjust health based on current stats
}

// Functions to handle button clicks
function feed() {
    console.log("feed was pushed");
    scoreTracker('feed', stats.hunger);
    stats.hunger = Math.min(10, stats.hunger + 2); // Increase hunger stat
    stats.cleanliness = Math.max(0, stats.cleanliness - 1); // Cleanliness decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats();
}

function clean() {
    console.log("clean was pushed");
    scoreTracker('clean', stats.cleanliness);
    stats.cleanliness = Math.min(10, stats.cleanliness + 2); // Increase cleanliness stat
    stats.happiness = Math.max(0, stats.happiness - 1); // Happiness decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats();
}

function play() {
    console.log("play was pushed");
    scoreTracker('play', stats.happiness);
    stats.happiness = Math.min(10, stats.happiness + 2); // Increase happiness stat
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats();
}

function exercise() {
    console.log("exercise was pushed");
    scoreTracker('exercise', stats.exercise);
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
    stats.hunger = Math.max(0, stats.hunger - 1); // Hunger decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats();
}

function saveUserData() {
    // Convert userData to a JSON string and store it in local storage
    const userDataString = JSON.stringify(userData);
    localStorage.setItem(gameKey,userDataString);
    
    // Retrieve userData from local storage, parse the string & console log the new JS object
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(storedUserData);
    console.log(parsedUserData);
}

function showGameOverModal() {

    const gameOverModal = document.getElementById('game-over-modal');
    gameOverModal.style.display = 'flex'; // Modal pops up

    // Remove any existing event listener to prevent duplicates // I noticed duplicates in the console when testing so added this. 
    const restartButton = document.getElementById('restart-game');
    restartButton.removeEventListener('click', resetGame);
    restartButton.addEventListener('click', resetGame);
}


function resetGame() {
    clearInterval(gameInterval); // Clear the existing game interval

    // Reset score
    score = 0
    updateScoreDisplay();
    // Reset health stats
    stats.hunger = 10;
    stats.cleanliness = 10;
    stats.happiness = 10;
    stats.exercise = 10;

    console.log("reset stats");

    // Hide the Game Over modal
    document.getElementById('game-over-modal').style.display = 'none';

    // Re-render stats and restart the game
    updateStats();
    renderStats();
    startGame();
    console.log("New game instance");

    // Generate new game key
    gameKey = generateRandomString();
}

// Score tracking function - now checks the stat before it's updated
function scoreTracker(action, currentStatValue) {
    if (currentStatValue === 10) {
        score--;
        console.log(`Lost a point! Pet doesn't need ${action} right now!`);
    } else {
        score++;
        console.log(`Gained a point! Pet needed ${action}!`);
    }
    updateScoreDisplay();
    return score;
}

// Update the score display
function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to save score to userData object
function saveScore() {
    userData.score = score;
}

// Event listeners for buttons
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('clean').addEventListener('click', clean);
document.getElementById('play').addEventListener('click', play);
document.getElementById('pet').addEventListener('click', exercise);
// document.getElementById('start-game').addEventListener('click', startGame);
