// Create an object to store the state
const healthState = {
    currentHealth: 15,
    maxHealth: 15
};

let healthBarContainer;

function resetHealth() {
    healthState.currentHealth = healthState.maxHealth;
}

function initializeHealthBar(containerId) {
    healthBarContainer = document.getElementById(containerId);
    resetHealth(); // Reset health when initializing
    if (healthBarContainer) {
        createHealthBar();
        updateHealthBar();
    }
}

function createHealthBar() {
    if (!healthBarContainer) return;
    
    // Clear existing health units if any
    healthBarContainer.innerHTML = '';
    
    for (let i = 0; i < healthState.maxHealth; i++) {
        const healthUnit = document.createElement('div');
        healthUnit.className = 'health-unit animate__animated';
        healthBarContainer.appendChild(healthUnit);
    }
}

function updateHealthBar() {
    if (!healthBarContainer) return;
    
    const healthUnits = document.querySelectorAll('.health-unit');
    healthUnits.forEach((unit, index) => {
        if (index < healthState.currentHealth) {
            unit.style.display = 'block';
            if (healthState.currentHealth <= 3) {
                unit.style.backgroundColor = '#FF0000'; // Red for low health
            } else if (healthState.currentHealth <= 6) {
                unit.style.backgroundColor = '#FFC107'; // Yellow for medium health
            } else {
                unit.style.backgroundColor = '#4CAF50'; // Green for high health
            }
        } else {
            unit.style.display = 'none';
        }
    });
}

function decreaseHealth() {
    if (healthState.currentHealth > 0) {
        const removedUnit = healthBarContainer?.children[healthState.currentHealth - 1];
        if (removedUnit) {
            removedUnit.classList.add('animate__fadeOutRight');
        }
        healthState.currentHealth--;
        updateHealthBar();
    }
    return healthState.currentHealth;
}

function increaseHealth() {
    if (healthState.currentHealth < healthState.maxHealth) {
        healthState.currentHealth++;
        updateHealthBar();
        const addedUnit = healthBarContainer?.children[healthState.currentHealth - 1];
        if (addedUnit) {
            addedUnit.classList.remove('animate__fadeOutRight');
            addedUnit.classList.add('animate__fadeInRight');
        }
    }
    return healthState.currentHealth;
}

function adjustHealthBasedOnStats() {
    if (!stats) return;
    
    const totalStats = stats.total;
    const targetHealth = Math.floor(totalStats / 2.6);

    // Decrease health if total stats are low
    while (healthState.currentHealth > targetHealth) {
        decreaseHealth();
    }

    // Increase health if total stats are high
    while (healthState.currentHealth < targetHealth) {
        increaseHealth();
    }

    if (totalStats === 0) {
        if (typeof gameInterval !== 'undefined') {
            clearInterval(gameInterval);
        }
        if (typeof saveScore === 'function') {
            saveScore();
        }
        if (typeof saveUserData === 'function') {
            saveUserData();
        }
        if (typeof showGameOverModal === 'function') {
            showGameOverModal();
        }
    }
}

// Export an object that gives access to the health state
module.exports = {
    initializeHealthBar,
    updateHealthBar,
    decreaseHealth,
    increaseHealth,
    adjustHealthBasedOnStats,
    resetHealth, // Export the reset function
    get currentHealth() {
        return healthState.currentHealth;
    },
    get maxHealth() {
        return healthState.maxHealth;
    }
};