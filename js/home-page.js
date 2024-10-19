// Home Page Variables

const homePageModal = document.getElementById('home-page-modal');
const homePageModalCloseBtn = document.querySelector('.close-btn'); 
const homePageOverlay = document.querySelector('.overlay');
const modalTimer = 1000;

// Home Page Functions

setTimeout(function() {
homePageModal.style.display = 'flex';
}, modalTimer);

setTimeout(function() {
homePageOverlay.style.display = 'block';
}, modalTimer);

const closeHomePageModal = function () {
    homePageModal.style.display = 'none';
    homePageOverlay.style.display= 'none';
}

// Event Listeners
homePageModalCloseBtn.addEventListener('click', closeHomePageModal);