const {
    feed,
    clean,
    play,
    exercise,
    scoreTracker,
    generateRandomString,
    stats,
    score
} = require('../app');

const { initializeHealthBar, adjustHealthBasedOnStats, currentHealth } = require('../health-bar');

describe('Pet Game Tests', () => {
    beforeEach(() => {
        // Reset stats and score
        global.stats = {
            hunger: 10,
            cleanliness: 10,
            happiness: 10,
            exercise: 10,
            get total() {
                return this.hunger + this.cleanliness + this.happiness + this.exercise;
            }
        };
        global.score = 0;

        // Mock DOM elements
        document.body.innerHTML = `
            <div id="hunger-stat"></div>
            <div id="cleanliness-stat"></div>
            <div id="happiness-stat"></div>
            <div id="exercise-stat"></div>
            <div id="score"></div>
            <div id="healthBar"></div>  <!-- Ensure health bar container is present -->
        `;

        // Initialize health bar
        initializeHealthBar('healthBar'); // Pass the ID of the health bar container
    });
  
    // Test feed functionality
    describe('feed()', () => {
      test('should decrease score when hunger is already at max', () => {
        stats.hunger = 10;
        feed();
        expect(score).toBe(-1);
      });
  
      test('should increase score when pet needs feeding', () => {
        stats.hunger = 8;
        feed();
        expect(score).toBe(1);
      });
  
      test('should increase hunger by 2 but not exceed 10', () => {
        stats.hunger = 7;
        feed();
        expect(stats.hunger).toBe(9);
        
        feed();
        expect(stats.hunger).toBe(10);
      });
  
      test('should decrease cleanliness by 1', () => {
        stats.cleanliness = 5;
        feed();
        expect(stats.cleanliness).toBe(4);
      });
    });
  
    // Test clean functionality
    describe('clean()', () => {
      test('should decrease score when cleanliness is already at max', () => {
        stats.cleanliness = 10;
        clean();
        expect(score).toBe(-1);
      });
  
      test('should increase score when pet needs cleaning', () => {
        stats.cleanliness = 8;
        clean();
        expect(score).toBe(1);
      });
  
      test('should increase cleanliness by 2 but not exceed 10', () => {
        stats.cleanliness = 7;
        clean();
        expect(stats.cleanliness).toBe(9);
        
        clean();
        expect(stats.cleanliness).toBe(10);
      });
  
      test('should decrease happiness by 1', () => {
        stats.happiness = 5;
        clean();
        expect(stats.happiness).toBe(4);
      });
    });
  
    // Test play functionality
    describe('play()', () => {
      test('should decrease score when happiness is already at max', () => {
        stats.happiness = 10;
        play();
        expect(score).toBe(-1);
      });
  
      test('should increase both happiness and exercise', () => {
        stats.happiness = 7;
        stats.exercise = 7;
        play();
        expect(stats.happiness).toBe(9);
        expect(stats.exercise).toBe(9);
      });
  
      test('should increase score when pet needs to play', () => {
        stats.happiness = 8;
        play();
        expect(score).toBe(1);
      });
    });
  
    // Test exercise functionality
    describe('exercise()', () => {
      test('should decrease score when exercise is already at max', () => {
        stats.exercise = 10;
        exercise();
        expect(score).toBe(-1);
      });
  
      test('should increase exercise and decrease hunger', () => {
        stats.exercise = 7;
        stats.hunger = 5;
        exercise();
        expect(stats.exercise).toBe(9);
        expect(stats.hunger).toBe(4);
      });
  
      test('should increase score when pet needs exercise', () => {
        stats.exercise = 8;
        exercise();
        expect(score).toBe(1);
      });
    });
  
    // Test score tracking
    describe('scoreTracker()', () => {
      test('should decrease score for unnecessary actions', () => {
        const result = scoreTracker('feed', 10);
        expect(result).toBe(-1);
      });
  
      test('should increase score for necessary actions', () => {
        const result = scoreTracker('feed', 8);
        expect(result).toBe(1);
      });
    });
  
    // Test game key generation
    describe('generateRandomString()', () => {
      test('should generate string of correct length', () => {
        const key = generateRandomString();
        expect(key.length).toBe(10);
      });
  
      test('should generate different keys', () => {
        const key1 = generateRandomString();
        const key2 = generateRandomString();
        expect(key1).not.toBe(key2);
      });
  
      test('should only contain valid characters', () => {
        const key = generateRandomString();
        expect(key).toMatch(/^[A-Za-z0-9]+$/);
      });
    });
  });