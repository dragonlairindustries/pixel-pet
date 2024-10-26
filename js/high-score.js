let allGameData = {};

// Function to retrieve all game data from local storage and save it as a javascript object
function retrieveAllLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            // Try to parse the value and store it in the highScoreList object
            allGameData[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            // If parsing fails, store it as a plain value - this is the only way I could avoid JSON.parse get "Uncaught SyntaxError: Unexpected token h" error
            allGameData[key] = localStorage.getItem(key);
        }
    }
}

retrieveAllLocalStorage();
delete allGameData.debug; // Removes the item: "debug: 'honey:core-sdk:*'" from the js object

// Convert the allGameData object to an array and sort by descending score
const sortedScores = Object.entries(allGameData).sort(function(a, b) {return b[1].score - a[1].score});

// Save top ten highest scores from sortedScores array and save to highScores array
const highScores = sortedScores.slice(0,10);
console.log(highScores)

// Dynamically update high score panel
const highScorePanel = document.querySelector('.high-score-list');
highScorePanel.innerHTML = `
    <div class="high-score-item">
        <div class="order"><strong>NO.</strong></div>
        <div class="username"><strong>NAME</strong></div>
        <div class="score"><strong>SCORE</strong></div>
    </div>
    <div class="high-score-item">
        <div class="order">1</div>
        <div class="username">${highScores[0][1].username}</div>
        <div class="score">${highScores[0][1].score}</div>
    </div>
    <div class="high-score-item">
        <div class="order">2</div>
        <div class="username">${highScores[1][1].username}</div>
        <div class="score">${highScores[1][1].score}</div>
    </div>    
        <div class="high-score-item">
        <div class="order">3</div>
        <div class="username">${highScores[2][1].username}</div>
        <div class="score">${highScores[2][1].score}</div>
    </div> 
        <div class="high-score-item">
        <div class="order">4</div>
        <div class="username">${highScores[3][1].username}</div>
        <div class="score">${highScores[3][1].score}</div>
    </div>  
        <div class="high-score-item">
        <div class="order">5</div>
        <div class="username">${highScores[4][1].username}</div>
        <div class="score">${highScores[4][1].score}</div>
    </div>  
        <div class="high-score-item">
        <div class="order">6</div>
        <div class="username">${highScores[5][1].username}</div>
        <div class="score">${highScores[5][1].score}</div>
    </div>  
        <div class="high-score-item">
        <div class="order">7</div>
        <div class="username">${highScores[6][1].username}</div>
        <div class="score">${highScores[6][1].score}</div>
    </div>  
        <div class="high-score-item">
        <div class="order">8</div>
        <div class="username">${highScores[7][1].username}</div>
        <div class="score">${highScores[7][1].score}</div>
    </div>  
      </div>  
        <div class="high-score-item">
        <div class="order">9</div>
        <div class="username">${highScores[8][1].username}</div>
        <div class="score">${highScores[8][1].score}</div>
    </div>    </div>  
        <div class="high-score-item">
        <div class="order">10</div>
        <div class="username">${highScores[9][1].username}</div>
        <div class="score">${highScores[9][1].score}</div>
    </div>  
`;
