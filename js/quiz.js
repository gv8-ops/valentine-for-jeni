// Quiz Page JavaScript
// Interactive relationship quiz with smart hints

document.addEventListener('DOMContentLoaded', function () {
    // Quiz questions - CUSTOMIZE THESE WITH YOUR OWN QUESTIONS!
    const questions = [
        {
            question: "First Audio note you sent me",
            options: ["18/06/2021", "13/04/2021", "15/07/2021", "17/03/2022"],
            correct: 2  // Index of correct answer (0 = first option)
        },
        {
            question: "Date of our first date",
            options: ["04/08/2020", "02/08/2021", "03/09/2021", "03/08/2021"],
            correct: 1
        },
        {
            question: "Our First Kiss",
            options: ["31/03/2022", "11/07/2022", "13/09/2022", "02/04/2022"],
            correct: 0
        },
        {
            question: "Our First Touch",
            options: ["02/08/2021", "13/05/2022", "17/08/2022", "14/04/2022"],
            correct: 3
        },
        {
            question: "Our First 18+ movie",
            options: ["29/06/2025", "28/06/2025", "26/06/2025", "28/06/2025"],
            correct: 0
        },

    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const resultsScreen = document.getElementById('resultsScreen');
    const quizCard = document.getElementById('quizCard');

    // Initialize
    totalQuestionsSpan.textContent = questions.length;
    loadQuestion();
    createFloatingHearts();

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestionIndex];
        answered = false;

        // Update UI
        questionText.textContent = question.question;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        nextBtn.style.display = 'none';

        // Update progress bar
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = progress + '%';

        // Clear and load options
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.onclick = () => selectOption(index);
            optionsContainer.appendChild(optionBtn);
        });
    }

    function selectOption(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        const correctIndex = question.correct;

        if (selectedIndex === correctIndex) {
            // Correct answer!
            if (!answered) {
                score++;
                answered = true;
            }

            optionButtons[selectedIndex].classList.add('correct');
            createFlowerBurst();

            // Show next button after delay
            setTimeout(() => {
                nextBtn.style.display = 'block';
            }, 800);
        } else {
            // Wrong answer - DON'T set answered=true so they can try again!
            optionButtons[selectedIndex].classList.add('wrong');

            // Disable only this wrong option
            optionButtons[selectedIndex].style.pointerEvents = 'none';
            optionButtons[selectedIndex].style.opacity = '0.5';

            // Make correct answer bigger as a hint after a short delay
            setTimeout(() => {
                optionButtons[correctIndex].classList.add('hint-correct');
            }, 400);
        }
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    function showResults() {
        quizCard.style.display = 'none';
        resultsScreen.style.display = 'flex';

        document.getElementById('finalScore').textContent = score;
        document.getElementById('totalScore').textContent = questions.length;

        // Custom messages based on score
        const percentage = (score / questions.length) * 100;
        let message = '';

        if (percentage === 100) {
            message = "Perfect score! You know us better than anyone! 💕✨";
        } else if (percentage >= 80) {
            message = "Amazing! You really pay attention to our moments together! 🌟";
        } else if (percentage >= 60) {
            message = "Great job! You know us pretty well! 💖";
        } else if (percentage >= 40) {
            message = "Not bad! Let's make more memories together! 🌸";
        } else {
            message = "We have so many more memories to make! 💕";
        }

        document.getElementById('resultsMessage').textContent = message;

        // Big celebration burst
        setTimeout(createFlowerBurst, 300);
        setTimeout(createFlowerBurst, 600);
        setTimeout(createFlowerBurst, 900);
    }

    function createFlowerBurst() {
        const container = document.getElementById('flowerBurst');
        const flowers = ['🌸', '🌺', '💕', '💖', '✨', '🌟', '💫', '🎉'];

        for (let i = 0; i < 15; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = (30 + Math.random() * 40) + '%';
            flower.style.top = '50%';
            flower.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
            flower.style.setProperty('--y', -(100 + Math.random() * 100) + 'px');

            container.appendChild(flower);

            setTimeout(() => flower.remove(), 2000);
        }
    }

    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        const heartCount = 20;
        const heartSymbols = ['♥', '❤', '💕', '💖', '💗', '💓', '💞'];

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';
            heart.style.color = `rgba(255, 182, 193, ${0.2 + Math.random() * 0.3})`;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animation = `float ${10 + Math.random() * 10}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 5 + 's';

            heartsContainer.appendChild(heart);
        }
    }
});
