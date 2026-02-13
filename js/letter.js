// Love Letter JavaScript
// Handles interactive pull-down scroll effect

document.addEventListener('DOMContentLoaded', function () {
    const scrollHandle = document.getElementById('scrollHandle');
    const scrollPaper = document.getElementById('scrollPaper');
    const ancientScroll = document.getElementById('ancientScroll');

    let isDragging = false;
    let startY = 0;
    let scrollHeight = 0;
    let maxScroll = 0;

    // Create floating hearts
    createFloatingHearts();

    // Calculate max scroll based on content
    setTimeout(() => {
        const paperContent = scrollPaper.querySelector('.scroll-paper-content');
        // Add extra padding to ensure all content is visible
        maxScroll = paperContent.scrollHeight + 100;
    }, 100);

    // Mouse down on handle
    scrollHandle.addEventListener('mousedown', startDrag);
    scrollHandle.addEventListener('touchstart', startDrag);

    // Mouse/touch move
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    // Mouse/touch up
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        scrollHeight = parseInt(scrollPaper.style.height) || 20;
        scrollHandle.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        const deltaY = currentY - startY;

        // Calculate new height (starts at 20px, can go up to maxScroll)
        // Smooth the deltaY for easier dragging
        let newHeight = scrollHeight + (deltaY * 1.2);
        newHeight = Math.max(20, Math.min(newHeight, maxScroll));

        // Update scroll paper height
        scrollPaper.style.height = newHeight + 'px';

        // Handle is positioned from bottom, so no need to update position
        // It will automatically move with the growing paper

        e.preventDefault();
    }

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            scrollHandle.style.cursor = 'grab';
        }
    }

    // Also allow auto-scroll on wheel
    ancientScroll.addEventListener('wheel', function (e) {
        const currentHeight = parseInt(scrollPaper.style.height) || 20;
        let newHeight = currentHeight + (e.deltaY > 0 ? 50 : -50);
        newHeight = Math.max(20, Math.min(newHeight, maxScroll));

        scrollPaper.style.height = newHeight + 'px';

        e.preventDefault();
    });

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
