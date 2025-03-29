const gameButton = document.getElementById('game-button');
const gameContainer = document.getElementById('game-container');
const gameContent = document.getElementById('game-content');
const exitGameButton = document.getElementById('exit-game');
const inviteContainer = document.getElementById('invite-container');

const rsvpBtn = document.getElementById('rsvp-btn');
const rsvpModal = document.getElementById('rsvp-modal');
const closeRsvp = document.getElementById('close-rsvp');

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
    rsvpModal.innerHTML = '<p>Will you be attending the Gender Reveal?</p>';
    rsvpModal.appendChild(confirmBtn);
    rsvpModal.appendChild(cancelBtn);

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
        window.open(googleCalendarLink, '_blank');

        // Optionally, close the modal after adding to calendar
        rsvpModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        // Close the modal if they are not attending
        rsvpModal.style.display = 'none';
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

    while (selectedQuestions.length < 5) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(questions[randomIndex])) {
            selectedQuestions.push(questions[randomIndex]);
        }
    }

    function displayQuestion() {
        if (questionIndex < 5) {
            const currentQuestion = selectedQuestions[questionIndex];

            gameContent.innerHTML = `
                <p>${currentQuestion.question}</p>
                <div style="margin-top: 10px;">
                    <button id="yesButton" class="btn answer-btn">Yes</button>
                    <button id="noButton" class="btn answer-btn">No</button>
                </div>
                <p id="answerResult"></p>
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
                        yesButton.style.backgroundColor = 'green';
                    } else {
                        noButton.style.backgroundColor = 'green';
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
                        yesButton.style.backgroundColor = 'red';
                    } else {
                        noButton.style.backgroundColor = 'red';
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
            gameContent.innerHTML = `
                <h2>Quiz Completed!</h2>
                <p>Your score: ${score} out of 5 (${percentageScore}%)</p>
                <button id="restartButton" class="btn">Restart Quiz</button>
                <div id="celebration-message" style="margin-top: 20px;"></div>
            `;

            const restartButton = document.getElementById('restartButton');
            const celebrationMessage = document.getElementById('celebration-message');

            restartButton.addEventListener('click', () => {
                triggerConfetti();
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
            });

            // Baby-themed celebration
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#89CFF0', '#FFB6C1', '#FFFFE0'],
                shapes: ['star', 'circle'],
            });

            if (percentageScore < 20) {
                celebrationMessage.textContent = "Oops! You might have missed a few. But don't worry, you're still invited to the gender reveal!";
            } else {
                celebrationMessage.textContent = "Congratulations! You're ready for the gender reveal!";
            }
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