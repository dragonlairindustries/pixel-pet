// Global Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector(".btn-submit");
const userNameInput = document.querySelector("#userName");

let userName = ""; // Variable to store username

// Functions
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const handleSubmit = function () {
  userName = userNameInput.value; // Save the username
  if (userName) {
    console.log("Username:", userName);
    closeModal(); // Close the modal
  } else {
    alert("Please enter a username!");
  }
};

// Event Listeners
window.addEventListener("load", openModal);
closeModalBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", handleSubmit);
