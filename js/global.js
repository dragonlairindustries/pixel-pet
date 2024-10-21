// Global Variables
const modal = document.querySelector(".modal");
const interactiveModal = document.querySelector("#interactive-modal-content");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector(".btn-submit");
const userNameInput = document.querySelector("#userName");


// Functions
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

            
// Multi-step modal functionality            
window.addEventListener("load", function() {
    openModal();
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
        interactiveModal.innerHTML = `
            <div>
                <h3>${step.question}</h3>
            </div>
            <input type="text" id="${step.id}" placeholder="${step.placeholder}"/>
            <button type="button" class="btn-submit" id="interactive-submit">Submit</button>
        `;

        document.getElementById('interactive-submit').addEventListener('click', function() {
            handleFormSubmission(stepIndex);
        });
    }

    // Function to handle form submission and go to next step of modal
    function handleFormSubmission(stepIndex) {
        const inputValue = document.getElementById(steps[stepIndex].id).value;
        
        //Save user's response
        if (stepIndex === 0) {
            userData.username = inputValue;
        } else if (stepIndex === 1) {
            userData.dragonName = inputValue;
        }

        //Move to the next step or close modal
        if (stepIndex + 1 < steps.length) {
            renderStep(stepIndex + 1);
        } else {
            finishModal();
        }
    }

    // Function to finish the modal and return to main screen

    function finishModal() {
        interactiveModal.innerHTML = `
        <h3>Welcome, ${userData.username}</h3>
        <p>Your dragon's name is: ${userData.dragonName}</p>
        <button type="button" class="btn-submit" id="begin-game">Begin Game</button>
        `;

        document.getElementById('begin-game').addEventListener('click', function() {
            closeModal(); 
        });
    }

    renderStep(currentStep);
});    

