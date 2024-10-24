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
let gameInterval;
const statDecayRate = 10000;
let currentDragon = null;
let dragonsData = null;

// Function to load dragons data
async function loadDragonsData() {
    try {
        const response = await fetch('/js/dragons.json');
        dragonsData = await response.json();
        console.log('Dragons data loaded:', dragonsData);
        return true;
    } catch (error) {
        console.error('Error loading dragons data:', error);
        return false;
    }
}

// Function to assign random dragon
function assignRandomDragon() {
    if (!dragonsData) {
        console.error('Dragons data not loaded');
        return;
    }
    
    const dragons = dragonsData.dragons;
    const randomDragon = dragons[Math.floor(Math.random() * dragons.length)];
    currentDragon = randomDragon;
    
    const dragonElement = document.getElementById('dragon');
    
    // Remove any existing color classes
    dragons.forEach(dragon => dragonElement.classList.remove(dragon.className));
    
    // Add the new random color class
    dragonElement.classList.add(randomDragon.className);
    dragonElement.removeAttribute('style');
    dragonElement.style.display = 'block'; // Make sure dragon is visible
    
    // Initialize stats from the dragon's base stats
    Object.assign(stats, randomDragon.baseStats);
}

// Function to start the game
async function startGame() {
    console.log("Game Started");
    // Load dragons data first
    const dataLoaded = await loadDragonsData();
    if (!dataLoaded) {
        console.error('Could not start game - dragons data not loaded');
        return;
    }
    
    assignRandomDragon();
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

    adjustHealthBasedOnStats(); // Adjust health based on updated stats
}

// Function to render stats on screen
function renderStats() {
    document.getElementById('hunger-stat').textContent = `Hunger: ${stats.hunger}/10`;
    document.getElementById('cleanliness-stat').textContent = `Cleanliness: ${stats.cleanliness}/10`;
    document.getElementById('happiness-stat').textContent = `Happiness: ${stats.happiness}/10`;
    document.getElementById('exercise-stat').textContent = `Exercise: ${stats.exercise}/10`;
    // document.getElementById('total-stat').textContent = `Total Stats: ${stats.total}/40`;

    adjustHealthBasedOnStats(); // Adjust health based on current stats
}

// Functions to handle button clicks
function feed() {
    console.log("feed was pushed");
    stats.hunger = Math.min(10, stats.hunger + 2); // Increase hunger stat
    stats.cleanliness = Math.max(0, stats.cleanliness - 1); // Cleanliness decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats()
}

function clean() {
    console.log("clean was pushed");
    stats.cleanliness = Math.min(10, stats.cleanliness + 2); // Increase cleanliness stat
    stats.happiness = Math.max(0, stats.happiness - 1); // Happiness decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats()
}

function play() {
    console.log("play was pushed");
    stats.happiness = Math.min(10, stats.happiness + 2); // Increase happiness stat
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats()
}

function exercise() {
    console.log("exercise was pushed");
    stats.exercise = Math.min(10, stats.exercise + 2); // Increase exercise stat
    stats.hunger = Math.max(0, stats.hunger - 1); // Hunger decreases
    adjustHealthBasedOnStats(); // Adjust health immediately
    renderStats();
}

function showGameOverModal() {
    const gameOverModal = document.getElementById('game-over-modal');
    gameOverModal.style.display = 'flex'; // Modal pops up

    // Add event listener to Restart Game button
    document.getElementById('restart-game').addEventListener('click', function() {
        resetGame();
    });
}

function resetGame() {
    // Reset health stats
    stats.hunger = 10;
    stats.cleanliness = 10;
    stats.happiness = 10;
    stats.exercise = 10;

    // Hide the Game Over modal
    document.getElementById('game-over-modal').style.display = 'none';

    // Re-render stats and restart the game
    renderStats();
    startGame();
}


// Event listeners for buttons
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('clean').addEventListener('click', clean);
document.getElementById('play').addEventListener('click', play);
document.getElementById('pet').addEventListener('click', exercise);
// document.getElementById('start-game').addEventListener('click', startGame);


// startGame();
