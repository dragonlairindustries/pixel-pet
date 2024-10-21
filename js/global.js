// Global Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector(".btn-submit");
const userNameInput = document.querySelector("#userName");

let userName = ""; // Variable to store username

// Functions
// const openModal = function () {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// const closeModal = function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// };

// const handleSubmit = function () {
//   userName = userNameInput.value; // Save the username
//   if (userName) {
//     console.log("Username:", userName);
//     closeModal(); // Close the modal
//   } else {
//     alert("Please enter a username!");
//   }
// };

// Event Listeners
// window.addEventListener("load", openModal);
// closeModalBtn.addEventListener("click", closeModal);
// submitBtn.addEventListener("click", handleSubmit);


// Multi-step modal functionality

window.addEventListener("load", openModal);
    let currentStep = 0;

// Array-nested object to assign questions, placeholders and ids
const steps = [
    {
        question: "What should your dragon call you?",
        placeholder: "Enter your username",
        id: "username"
    },
    {
        question: "What would you like to name your dragon?",
        placeholder: "Enter your dragon's name",
        id: "dragonName"
    }
    ];

// Object to store user data
const userData = {
    username: '',
    dragonName: ''
}

// Function to render the current step
function renderStep(stepIndex) {
    const step = steps[stepIndex];
    modal.innerHTML = `
        <div>
            <h3>${step.question}</h3>
        </div>
        <input type="text" id="${step.id}" placeholder="${step.placeholder}"/>
        <button class="btn-submit">Submit</button>
    `;

}
