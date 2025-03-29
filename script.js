const gameButton = document.getElementById('game-button');
const gameContainer = document.getElementById('game-container');
const gameContent = document.getElementById('game-content');
const exitGameButton = document.getElementById('exit-game');
const inviteContainer = document.getElementById('invite-container');

const rsvpBtn = document.getElementById('rsvp-btn');
const rsvpModal = document.getElementById('rsvp-modal');
const closeRsvp = document.getElementById('close-rsvp');

// Theme colors (using CSS variables if defined, otherwise fallback)
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#e91e63';
const primaryDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-dark-color') || '#ad1457';
const successColor = 'green'; // You can define a CSS variable for this if needed
const errorColor = 'red';   // You can define a CSS variable for this if needed

// Function to set the game container size based on the invite container
function setGameContainerSize() {
    const inviteRect = inviteContainer.getBoundingClientRect();
    gameContainer.style.width = `${inviteRect.width}px`;
    gameContainer.style.maxWidth = `${inviteRect.maxWidth}px`; // Keep the max-width
    gameContainer.style.height = `${inviteRect.height}px`;
}

rsvpBtn.addEventListener('click', function() {
    rsvpModal.style.display = 'block';

    // Add confirmation buttons
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Yes, I will attend!';
    confirmBtn.classList.add('btn');

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'No, I cannot attend.';
    cancelBtn.classList.add('btn');

    // Clear existing buttons
    rsvpModal.innerHTML = `
        <p>Will you be attending the Gender Reveal?</p>
        <div style="margin-top: 10px;">
            ${confirmBtn.outerHTML}
            ${cancelBtn.outerHTML}
        </div>
        <div id="rsvp-confirmation" style="margin-top: 20px;"></div>
    `;

    const rsvpConfirmation = document.getElementById('rsvp-confirmation');

    confirmBtn.addEventListener('click', function() {
        // Generate Google Calendar link
        const eventDetails = {
            title: 'Santosh and Pradnya\'s Gender Reveal',
            description: 'Join us to find out the gender of our baby!',
            location: 'UNIT xx, xxxxxxxxxxx, xxxxxx',
            startDate: '20251215T110000', //⏳YYYYMMDDTHHMMSS
            endDate: '20251215T150000',    //⏳YYYYMMDDTHHMMSS
            timeZone: 'Australia/Sydney' // Replace with your time zone
        };

        const googleCalendarLink = generateGoogleCalendarLink(eventDetails);
        rsvpConfirmation.innerHTML = `
            <p>Thank you for confirming! The event has been added to your Google Calendar:</p>
            <a href="${googleCalendarLink}" target="_blank" class="btn">Add to Google Calendar</a>
        `;
        // Optionally, don't close immediately
        // rsvpModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        rsvpConfirmation.textContent = 'Thank you for letting us know you cannot attend.';
        // Optionally, don't close immediately
        // rsvpModal.style.display = 'none';
    });
});

closeRsvp.addEventListener('click', function() {
    rsvpModal.style.display = 'none';
});

function generateGoogleCalendarLink(event) {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const details = `text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}&ctz=${event.timeZone}`;
    return `${baseUrl}&${details}`;
}

function triggerConfetti(options = {}) {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ...options
    });
}

gameButton.addEventListener('click', () => {
    triggerConfetti();
    setGameContainerSize(); // Set the size before displaying
    setTimeout(() => {
        generateRandomGame();
        gameContainer.style.display = 'block';
        inviteContainer.style.display = 'none';
    }, 500);
});

exitGameButton.addEventListener('click', () => {
    triggerConfetti();
    gameContainer.style.display = 'none';
    inviteContainer.style.display = 'block';
});

function generateRandomGame() {
    const questions = [
        { question: "Is blue for boys?", answer: "yes" },
        { question: "Is pink for girls?", answer: "yes" },
        { question: "Are grandparents happy for a new baby?", answer: "yes" },
        { question: "Is 'beta' a son?", answer: "yes" },
        { question: "Is 'beti' a daughter?", answer: "yes" },
        { question: "Are toy cars for boys?", answer: "yes" },
        { question: "Are dolls for girls?", answer: "yes" },
        { question: "Is 'pita' a father?", answer: "yes" },
        { question: "Is 'ashirwad' a blessing?", answer: "yes" },
        { question: "Is 'annaprashan' a baby's first food celebration?", answer: "yes" },
        { question: "Do boys play with trucks?", answer: "yes" },
        { question: "Do girls play with tea sets?", answer: "yes" },
        { question: "Is 'nani' a grandmother?", answer: "yes" },
        { question: "Is 'dada' a grandfather?", answer: "yes" },
        { question: "Are babies wrapped in blankets?", answer: "yes" },
        { question: "Do babies drink milk?", answer: "yes" },
        { question: "Is a rattle a baby toy?", answer: "yes" },
        { question: "Is 'kajal' used on baby's eyes?", answer: "yes" },
        { question: "Is 'rakhi' for brothers and sisters?", answer: "yes" },
        { question: "Is 'krishna' a god associated with children?", answer: "yes" },
        { question: "Is 'garbhvati' a pregnant woman?", answer: "yes" },
        { question: "Is 'nakshatra' related to baby naming?", answer: "yes" },
        { question: "Is 'rakshabandhan' a festival?", answer: "yes" },
        { question: "Is 'peda' a sweet?", answer: "yes" },
        { question: "Is 'barfi' a sweet?", answer: "yes" }
    ];

    let selectedQuestions = [];
    let score = 0;
    let questionIndex = 0;

    function displayQuestion() {
        if (questionIndex < 5) {
            const currentQuestion = selectedQuestions[questionIndex];

            gameContent.innerHTML = `
                <h2>Question ${questionIndex + 1}</h2>
                <p>${currentQuestion.question}</p>
                <div style="margin-top: 10px;">
                    <button id="yesButton" class="btn answer-btn">Yes</button>
                    <button id="noButton" class="btn answer-btn">No</button>
                </div>
                <p id="answerResult"></p>
                <p>Score: ${score} out of ${questionIndex}</p>
            `;

            const yesButton = document.getElementById('yesButton');
            const noButton = document.getElementById('noButton');
            const answerResult = document.getElementById('answerResult');

            function handleAnswer(selectedAnswer) {
                if (selectedAnswer === currentQuestion.answer) {
                    answerResult.textContent = 'Correct!';
                    score++;
                    triggerConfetti();
                    if(selectedAnswer === "yes"){
                        yesButton.style.backgroundColor = successColor;
                    } else {
                        noButton.style.backgroundColor = successColor;
                    }

                    setTimeout(() => {
                        questionIndex++;
                        displayQuestion();
                    }, 1000);
                } else {
                    answerResult.textContent = `Incorrect! The answer is ${currentQuestion.answer}.`;
                    gameContent.classList.add('shake');
                    setTimeout(() => {
                        gameContent.classList.remove('shake');
                    }, 500);
                    if(selectedAnswer === "yes"){
                        yesButton.style.backgroundColor = errorColor;
                    } else {
                        noButton.style.backgroundColor = errorColor;
                    }

                    setTimeout(() => {
                        questionIndex++;
                        displayQuestion();
                    }, 3000);
                }
            }

            yesButton.addEventListener('click', () => {
                handleAnswer('yes');
            });

            noButton.addEventListener('click', () => {
                handleAnswer('no');
            });

        } else {
            const percentageScore = (score / 5) * 100;
            let celebrationMessageText = "";
            if (percentageScore < 40) {
                celebrationMessageText = "Nice try! You got a few right. Thanks for playing!";
            } else if (percentageScore < 80) {
                celebrationMessageText = "Good job! You know your Indian baby traditions. Thanks for playing!";
            } else {
                celebrationMessageText = "Excellent! You're an expert on Indian baby traditions! Thanks for playing!";
            }

            gameContent.innerHTML = `
                <h2>Quiz Completed!</h2>
                <p>Your final score: ${score} out of 5 (${percentageScore}%)</p>
                <p>${celebrationMessageText}</p>
            `;
        }
    }

    // Initialize the game
    questionIndex = 0;
    score = 0;
    selectedQuestions = [];
    while (selectedQuestions.length < 5) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(questions[randomIndex])) {
            selectedQuestions.push(questions[randomIndex]);
        }
    }
    displayQuestion();
}

const rsvpButton = document.getElementById('rsvp-btn');
const closeRsvpButton = document.getElementById('close-rsvp');

rsvpButton.addEventListener('click', () => {
    triggerConfetti();
    document.getElementById('rsvp-modal').style.display = 'block';
});

closeRsvpButton.addEventListener('click', () => {
    triggerConfetti();
    document.getElementById('rsvp-modal').style.display = 'none';
});

// Initial call to set the game container size in case the game is loaded directly (though unlikely with this setup)
setGameContainerSize();

// Optionally, you can add an event listener to handle window resize if the invite container's size might change
window.addEventListener('resize', setGameContainerSize);