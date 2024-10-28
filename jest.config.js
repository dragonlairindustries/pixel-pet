module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFiles: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'js/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    roots: ['<rootDir>/js'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleDirectories: ['node_modules', 'js']
};