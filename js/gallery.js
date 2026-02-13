// Gallery Page JavaScript
// Handles clustered collage photo positioning

document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.gallery-photo');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    // Create floating hearts
    createFloatingHearts();

    // Create tight collage layout
    createCollageLayout();

    // Photo click handlers for modal
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            modal.classList.add('active');
            modalImg.src = this.src;
        });
    });

    // Close modal handlers
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function createCollageLayout() {
        const gallery = document.querySelector('.scattered-gallery');
        const galleryWidth = gallery.offsetWidth;
        const galleryHeight = 1800; // Adjusted height for tighter layout

        gallery.style.minHeight = galleryHeight + 'px';
        gallery.style.position = 'relative';

        // Create very tight clustered positions
        const photoSize = 200;
        const clusterSpacing = -5; // NEGATIVE spacing = overlapping slightly!

        // Calculate grid with very tight spacing
        const cols = Math.floor(galleryWidth / (photoSize + clusterSpacing));
        const centerX = galleryWidth / 2;

        photos.forEach((photo, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;

            // Calculate base position with tight clustering
            const baseX = centerX - (cols * (photoSize + clusterSpacing)) / 2 + col * (photoSize + clusterSpacing);
            const baseY = 80 + row * (photoSize + clusterSpacing);

            // Add very small random offset for organic feel
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            const x = baseX + offsetX;
            const y = baseY + offsetY;

            photo.style.left = x + 'px';
            photo.style.top = y + 'px';

            // Random rotation for artistic effect
            const rotation = (Math.random() - 0.5) * 20;
            photo.style.transform = `rotate(${rotation}deg)`;

            // Random z-index so photos overlap naturally
            photo.style.zIndex = Math.floor(Math.random() * 20) + 10;

            // Staggered fade-in
            photo.style.opacity = '0';
            setTimeout(() => {
                photo.style.transition = 'opacity 0.6s ease, transform 0.3s ease';
                photo.style.opacity = '1';
            }, index * 60);
        });
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
