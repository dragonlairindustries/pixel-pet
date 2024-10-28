// Add any global setup needed for your tests
global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
    },
});

// Mock animate__animated classes if you're using animate.css
document.body.classList.add = jest.fn();