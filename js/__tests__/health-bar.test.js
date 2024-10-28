const healthBar = require('../health-bar.js');

// Mock stats object
global.stats = {
    total: 15
};

// Mock functions
global.saveScore = jest.fn();
global.saveUserData = jest.fn();
global.showGameOverModal = jest.fn();

describe('Health Bar Functionality', () => {
    beforeEach(() => {
        // Reset DOM
        document.body.innerHTML = '<div id="health-bar-container"></div>';
        // Initialize health bar
        healthBar.initializeHealthBar('health-bar-container');
        // Reset mocks
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('initializeHealthBar should create correct number of health units', () => {
        const healthUnits = document.querySelectorAll('.health-unit');
        expect(healthUnits.length).toBe(healthBar.maxHealth);
    });

    test('updateHealthBar should apply correct colors based on health levels', () => {
        // Test green (high health) first, when health is at max
        let healthUnits = document.querySelectorAll('.health-unit');
        expect(healthUnits[0].style.backgroundColor).toBe('rgb(76, 175, 80)');

        // Test yellow (medium health)
        while (healthBar.currentHealth > 6) {
            healthBar.decreaseHealth();
        }
        healthUnits = document.querySelectorAll('.health-unit');
        expect(healthUnits[0].style.backgroundColor).toBe('rgb(255, 193, 7)');

        // Test red (low health)
        while (healthBar.currentHealth > 3) {
            healthBar.decreaseHealth();
        }
        healthUnits = document.querySelectorAll('.health-unit');
        expect(healthUnits[0].style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    test('decreaseHealth should reduce health by 1', () => {
        const initialHealth = healthBar.currentHealth;
        const newHealth = healthBar.decreaseHealth();
        expect(healthBar.currentHealth).toBe(initialHealth - 1);
        expect(newHealth).toBe(initialHealth - 1);
    });

    test('decreaseHealth should not reduce health below 0', () => {
        // Reduce health to 1
        while (healthBar.currentHealth > 1) {
            healthBar.decreaseHealth();
        }
        const initialHealth = healthBar.currentHealth;
        
        // Try to decrease twice more
        healthBar.decreaseHealth();
        healthBar.decreaseHealth();
        
        expect(healthBar.currentHealth).toBe(0);
    });

    test('increaseHealth should increase health by 1', () => {
        // First decrease to ensure we're not at max
        healthBar.decreaseHealth();
        const initialHealth = healthBar.currentHealth;
        const newHealth = healthBar.increaseHealth();
        expect(healthBar.currentHealth).toBe(initialHealth + 1);
        expect(newHealth).toBe(initialHealth + 1);
    });

    test('increaseHealth should not increase health above maxHealth', () => {
        // Reset to fresh state to ensure we're at max health
        document.body.innerHTML = '<div id="health-bar-container"></div>';
        healthBar.initializeHealthBar('health-bar-container');
        
        const maxHealth = healthBar.maxHealth;
        const newHealth = healthBar.increaseHealth();
        
        expect(healthBar.currentHealth).toBe(maxHealth);
        expect(newHealth).toBe(maxHealth);
    });

    test('adjustHealthBasedOnStats should adjust health based on stats', () => {
        // Test health decrease
        global.stats.total = 5;
        healthBar.adjustHealthBasedOnStats();
        expect(healthBar.currentHealth).toBe(Math.floor(5 / 2.6));

        // Test health increase
        global.stats.total = 39;
        healthBar.adjustHealthBasedOnStats();
        expect(healthBar.currentHealth).toBe(Math.floor(39 / 2.6));
    });

    test('adjustHealthBasedOnStats should handle game over condition', () => {
        global.stats.total = 0;
        healthBar.adjustHealthBasedOnStats();
        
        expect(saveScore).toHaveBeenCalled();
        expect(saveUserData).toHaveBeenCalled();
        expect(showGameOverModal).toHaveBeenCalled();
    });
});