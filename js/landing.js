// Landing Page JavaScript
// Handles Yes/No button interactions and floating No button

document.addEventListener('DOMContentLoaded', function () {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const flowerBurstContainer = document.getElementById('flowerBurst');
    const landingMusic = document.getElementById('landingMusic');

    // Create additional floating hearts
    createFloatingHearts();

    // Background music setup - play from 53s to 1:15 (75s)
    const startTime = 53;
    const endTime = 75; // 1 minute 15 seconds
    let musicStarted = false;

    // Function to start music
    function startMusic() {
        if (musicStarted) return;

        landingMusic.currentTime = startTime;
        landingMusic.volume = 0.6; // 60% volume

        const playPromise = landingMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicStarted = true;
                console.log('Music playing successfully');
            }).catch(error => {
                console.log('Autoplay prevented, waiting for user interaction:', error);
            });
        }
    }

    // Try to autoplay immediately
    startMusic();

    // Also try on any user interaction
    const triggerMusic = () => {
        startMusic();
        // Remove listeners after first trigger
        document.removeEventListener('click', triggerMusic);
        document.removeEventListener('mousemove', triggerMusic);
        document.removeEventListener('keypress', triggerMusic);
    };

    document.addEventListener('click', triggerMusic);
    document.addEventListener('mousemove', triggerMusic);
    document.addEventListener('keypress', triggerMusic);

    // Loop the music segment
    landingMusic.addEventListener('timeupdate', function () {
        if (landingMusic.currentTime >= endTime) {
            landingMusic.currentTime = startTime;
        }
    });

    // No button floating effect
    noBtn.addEventListener('mouseenter', function () {
        floatNoButton();
    });

    // Yes button click handler
    yesBtn.addEventListener('click', function (e) {
        // Stop the music
        landingMusic.pause();
        landingMusic.currentTime = 0;

        // Create flower burst effect
        createFlowerBurst(e.clientX, e.clientY);

        // Wait for animation then redirect
        setTimeout(() => {
            window.location.href = 'hub.html';
        }, 1000);
    });

    function floatNoButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transition = 'all 0.3s ease';
    }

    function createFlowerBurst(x, y) {
        const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐'];
        const burstCount = 15;

        for (let i = 0; i < burstCount; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = x + 'px';
            flower.style.top = y + 'px';

            // Random direction
            const angle = (Math.PI * 2 * i) / burstCount;
            const distance = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            flower.style.setProperty('--tx', tx + 'px');
            flower.style.setProperty('--ty', ty + 'px');

            flowerBurstContainer.appendChild(flower);

            // Remove after animation
            setTimeout(() => {
                flower.remove();
            }, 1500);
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
