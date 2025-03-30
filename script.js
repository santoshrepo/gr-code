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
                location: 'UNIT 806, 160 Great Western Highway, Westmead, NSW - 2145',
                startDate: '20250412T110000', // YYYYMMDDTHHMMSS
                endDate: '20250412T150000',   // YYYYMMDDTHHMMSS
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
  {
    "question": "Is blue traditionally considered more suitable for...",
    "options": ["It's neutral", "Boys", "Both equally", "Girls"],
    "answer": "Boys"
  },
  {
    "question": "Is pink traditionally considered more suitable for...",
    "options": ["It's neutral", "Girls", "Boys", "Both equally"],
    "answer": "Girls"
  },
  {
    "question": "How do grandparents typically feel about the arrival of a new baby?",
    "options": ["It varies greatly", "Overjoyed", "Concerned", "Indifferent"],
    "answer": "Overjoyed"
  },
  {
    "question": "What is 'beta' in relation to a child?",
    "options": ["A daughter", "A young relative", "A son", "Neither"],
    "answer": "A son"
  },
  {
    "question": "What is 'beti' in relation to a child?",
    "options": ["A young relative", "A son", "A daughter", "Neither"],
    "answer": "A daughter"
  },
  {
    "question": "Are toy cars generally marketed towards...",
    "options": ["Neither specifically", "Boys", "Both equally", "Girls"],
    "answer": "Boys"
  },
  {
    "question": "Are dolls generally marketed towards...",
    "options": ["Both equally", "Girls", "Boys", "Neither specifically"],
    "answer": "Girls"
  },
  {
    "question": "What does 'pita' mean in terms of family relationships?",
    "options": ["Sibling", "Aunt/uncle", "Father", "Mother"],
    "answer": "Father"
  },
  {
    "question": "What is the meaning of 'ashirwad'?",
    "options": ["A ritual", "A greeting", "A blessing", "A type of food"],
    "answer": "A blessing"
  },
  {
    "question": "What is 'annaprashan' celebrating?",
    "options": ["A religious holiday", "A baby's first food", "A naming ceremony", "A baby's birth"],
    "answer": "A baby's first food"
  },
  {
    "question": "Are boys more likely to play with...",
    "options": ["It depends on the child", "Dolls", "Trucks", "Both equally"],
    "answer": "Trucks"
  },
  {
    "question": "Are girls more likely to play with...",
    "options": ["It depends on the child", "Toy cars", "Tea sets", "Both equally"],
    "answer": "Tea sets"
  },
  {
    "question": "What family member is 'nani'?",
    "options": ["Mother", "Grandmother", "Aunt", "Sister"],
    "answer": "Grandmother"
  },
  {
    "question": "What family member is 'dada'?",
    "options": ["Uncle", "Grandfather", "Brother", "Father"],
    "answer": "Grandfather"
  },
  {
    "question": "Are babies typically wrapped in blankets for...",
    "options": ["Play", "Comfort", "Warmth", "All of the above"],
    "answer": "Warmth"
  },
  {
    "question": "What is the primary drink for babies?",
    "options": ["Juice", "Water", "Milk", "Formula"],
    "answer": "Milk"
  },
  {
    "question": "What is a rattle primarily used for?",
    "options": ["A kitchen utensil", "A musical instrument", "A baby toy", "A gardening tool"],
    "answer": "A baby toy"
  },
  {
    "question": "What is 'kajal' sometimes used for on babies?",
    "options": ["In their hair", "Around the eyes", "As a medicinal paste", "On the skin"],
    "answer": "Around the eyes"
  },
  {
    "question": "Who is 'rakhi' traditionally for?",
    "options": ["Friends", "Brothers and sisters", "Parents", "All family members"],
    "answer": "Brothers and sisters"
  },
  {
    "question": "Which god is often associated with children in some cultures?",
    "options": ["Vishnu", "Krishna", "Shiva", "Ganesha"],
    "answer": "Krishna"
  },
  {
    "question": "What does 'garbhvati' refer to?",
    "options": ["A midwife", "A pregnant woman", "A newborn baby", "An elderly woman"],
    "answer": "A pregnant woman"
  },
  {
    "question": "What is 'nakshatra' related to in the context of babies?",
    "options": ["Feeding", "Naming", "Birth timing", "Sleeping"],
    "answer": "Naming"
  },
  {
    "question": "What type of event is 'rakshabandhan'?",
    "options": ["A game", "A religious ceremony", "A festival", "A type of clothing"],
    "answer": "A festival"
  },
  {
    "question": "What kind of food is 'peda'?",
    "options": ["A savory dish", "A fruit", "A sweet", "A type of bread"],
    "answer": "A sweet"
  },
  {
    "question": "What kind of food is 'barfi'?",
    "options": ["A grain", "A sweet", "A spicy snack", "A type of drink"],
    "answer": "A sweet"
  }
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

            let optionsHtml = '';
            currentQuestion.options.forEach(option => {
                optionsHtml += `<button class="btn answer-btn" data-answer="${option}">${option}</button>`;
            });

            gameContent.innerHTML = `
                <p>${currentQuestion.question}</p>
                <div style="margin-top: 10px;">
                    ${optionsHtml}
                </div>
                <p id="answerResult"></p>
            `;

            const answerButtons = gameContent.querySelectorAll('.answer-btn');
            const answerResult = document.getElementById('answerResult');

            function handleAnswer(selectedAnswer) {
                answerButtons.forEach(button => {
                    button.disabled = true;
                    if (button.dataset.answer === currentQuestion.answer) {
                        button.style.backgroundColor = 'green';
                    } else if (button.dataset.answer === selectedAnswer) {
                        button.style.backgroundColor = 'red';
                    }
                });

                if (selectedAnswer === currentQuestion.answer) {
                    answerResult.textContent = 'Correct!';
                    score++;
                    triggerConfetti();
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
                    setTimeout(() => {
                        questionIndex++;
                        displayQuestion();
                    }, 3000);
                }
            }

            answerButtons.forEach(button => {
                button.addEventListener('click', () => {
                    handleAnswer(button.dataset.answer);
                });
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

            if (percentageScore < 60) {
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