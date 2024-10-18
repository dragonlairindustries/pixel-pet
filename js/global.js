// script for homepage modal

setTimeout(function() {
    document.getElementById('home-page-modal').style.display = 'flex';
}, 5000);

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('home-page-modal').style.display = 'none';
});