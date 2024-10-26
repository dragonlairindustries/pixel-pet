let highScoreList = {};

function retrieveAllLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            // Try to parse the value and store it in the highScoreList object
            highScoreList[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            // If parsing fails, store it as a plain value - this is the only way I could avoid JSON.parse get "Uncaught SyntaxError: Unexpected token h" error
            highScoreList[key] = localStorage.getItem(key);
        }
    }
}
retrieveAllLocalStorage();
console.log(highScoreList)
