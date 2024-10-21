const healthBarContainer = document.getElementById('healthBar');
const maxHealth = 15;
let currentHealth = maxHealth;

function createHealthBar() {
    for (let i = 0; i < maxHealth; i++) {
        const healthUnit = document.createElement('div');
        healthUnit.className = 'health-unit animate__animated';
        healthBarContainer.appendChild(healthUnit);
    }
}

function updateHealthBar() {
    const healthUnits = document.querySelectorAll('.health-unit');
    healthUnits.forEach((unit, index) => {
        if (index < currentHealth) {
            unit.style.display = 'block';
            if (currentHealth <= 3) {
                unit.style.backgroundColor = '#FF0000'; // Red for low health
            } else if (currentHealth <= 6) {
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
    if (currentHealth > 0) {
        const removedUnit = healthBarContainer.children[currentHealth - 1];
        removedUnit.classList.add('animate__fadeOutRight');
        currentHealth--;
        setTimeout(() => {
            updateHealthBar();
        }, 500);
    }
}

function increaseHealth() {
    if (currentHealth < maxHealth) {
        currentHealth++;
        updateHealthBar();
        const addedUnit = healthBarContainer.children[currentHealth - 1];
        addedUnit.classList.remove('animate__fadeOutRight');
        addedUnit.classList.add('animate__fadeInRight');
    }
}

function adjustHealthBasedOnStats() {
    const totalStats = stats.total;
    const targetHealth = Math.floor(totalStats / 2.6);

    // Decrease health if total stats are low
    while (currentHealth > targetHealth) {
        decreaseHealth();
    }

    // Increase health if total stats are high
    while (currentHealth < targetHealth) {
        increaseHealth();
    }
}


createHealthBar();
updateHealthBar();