


































// Script for home-page modal

const homePageModal = document.getElementById('home-page-modal');

setTimeout(function() {
    homePageModal.style.display = 'flex';
}, 1000);

const homePageModalClose = document.querySelector('.close-btn'); 

homePageModalClose.addEventListener('click', function() {
    homePageModal.style.display = 'none';
});
