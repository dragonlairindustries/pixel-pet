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
    