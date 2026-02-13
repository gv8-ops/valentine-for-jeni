// Hub Page JavaScript
// Handles card fly-in animations and navigation

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.nav-card');
    const flowerBurstContainer = document.getElementById('flowerBurst');

    // Create floating hearts
    createFloatingHearts();

    // Trigger fly-in animation
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fly-in');
            }, index * 150);
        });
    }, 300);

    // Card click handlers
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            const page = this.getAttribute('data-page');

            // Create flower burst
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createFlowerBurst(centerX, centerY);

            // Navigate to page
            setTimeout(() => {
                window.location.href = page;
            }, 800);
        });
    });

    function createFlowerBurst(x, y) {
        const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐'];
        const burstCount = 12;

        for (let i = 0; i < burstCount; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = x + 'px';
            flower.style.top = y + 'px';

            const angle = (Math.PI * 2 * i) / burstCount;
            const distance = 80 + Math.random() * 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            flower.style.setProperty('--tx', tx + 'px');
            flower.style.setProperty('--ty', ty + 'px');

            flowerBurstContainer.appendChild(flower);

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
