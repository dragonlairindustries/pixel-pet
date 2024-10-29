// Define placeholder data for empty slots
const PLACEHOLDER_DATA = {
    username: "---",
    score: 0
};

let allGameData = {};

// Function to retrieve all game data from local storage
function retrieveAllLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            allGameData[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            allGameData[key] = localStorage.getItem(key);
        }
    }
}

// Function to get formatted high scores with placeholders
function getFormattedHighScores() {
    retrieveAllLocalStorage();
    
    // Remove debug entry if it exists
    delete allGameData.debug;
    
    // Convert and sort scores
    const sortedScores = Object.entries(allGameData)
        .sort(function(a, b) {
            return b[1].score - a[1].score;
        });
    
    // Create array of 10 entries, filling empty slots with placeholders
    const highScores = Array(10).fill(null).map(function(item, index) {
        if (index < sortedScores.length) {
            return sortedScores[index];
        }
        // Return placeholder data in the same format as real entries
        return [`placeholder-${index}`, PLACEHOLDER_DATA];
    });
    
    return highScores;
}

// Function to render high score panel
function updateHighScorePanel() {
    const highScores = getFormattedHighScores();
    const highScorePanel = document.querySelector('.high-score-list');
    
    // Create header
    const headerHTML = `
        <div class="high-score-item">
            <div class="order"><strong>NO.</strong></div>
            <div class="username"><strong>NAME</strong></div>
            <div class="score"><strong>SCORE</strong></div>
        </div>
    `;
    
    // Create score entries
    const scoresHTML = highScores.map(function(score, index) {
        return `
            <div class="high-score-item">
                <div class="order">${index + 1}</div>
                <div class="username">${score[1].username}</div>
                <div class="score">${score[1].score}</div>
            </div>
        `;
    }).join('');
    
    // Update panel
    highScorePanel.innerHTML = headerHTML + scoresHTML;
}

// Initial update
updateHighScorePanel();

// Function to add new score
function addNewScore(username, score) {
    const timestamp = Date.now();
    const gameData = {
        username,
        score,
        timestamp
    };
    
    localStorage.setItem(`game-${timestamp}`, JSON.stringify(gameData));
    updateHighScorePanel();
}