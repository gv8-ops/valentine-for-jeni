// Music Player JavaScript
// Handles audio playback, playlist, and controls

document.addEventListener('DOMContentLoaded', function () {
    const startMusicBtn = document.getElementById('startMusicBtn');
    const musicPlayer = document.getElementById('musicPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const viewPlaylistBtn = document.getElementById('viewPlaylistBtn');
    const playlistModal = document.getElementById('playlistModal');
    const closePlaylist = document.querySelector('.close-playlist');
    const playlistItems = document.getElementById('playlistItems');

    // PLAYLIST CONFIGURATION
    // Add your music files to assets/music/ folder
    const playlist = [
        { title: 'Song Title 1', file: 'assets/music/song1.mp3' },
        { title: 'Song Title 2', file: 'assets/music/song2.mp3' },
        { title: 'Song Title 3', file: 'assets/music/song3.mp3' },
        { title: 'Song Title 4', file: 'assets/music/song4.mp3' },
        { title: 'Song Title 5', file: 'assets/music/song5.mp3' },
        { title: 'Song Title 6', file: 'assets/music/song6.mp3' },
        { title: 'Song Title 7', file: 'assets/music/song7.mp3' },
        { title: 'Song Title 8', file: 'assets/music/song8.mp3' },
        { title: 'Song Title 9', file: 'assets/music/song9.mp3' },
        { title: 'Song Title 10', file: 'assets/music/song10.mp3' },
        // Add more songs as needed (up to 15)
    ];

    let currentTrack = 0;
    let isPlaying = false;

    // Create floating hearts
    createFloatingHearts();

    // Generate playlist
    generatePlaylist();

    // Start music button
    startMusicBtn.addEventListener('click', function () {
        this.style.display = 'none';
        musicPlayer.classList.add('active');
        loadTrack(0);
        playAudio();
    });

    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Previous button
    prevBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        playAudio();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playAudio();
    });

    // Progress bar click
    progressBar.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    // Audio time update
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Audio ended - play next
    audioPlayer.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playAudio();
    });

    // View playlist button
    viewPlaylistBtn.addEventListener('click', () => {
        playlistModal.classList.add('active');
    });

    // Close playlist
    closePlaylist.addEventListener('click', () => {
        playlistModal.classList.remove('active');
    });

    playlistModal.addEventListener('click', function (e) {
        if (e.target === playlistModal) {
            playlistModal.classList.remove('active');
        }
    });

    function loadTrack(index) {
        currentTrack = index;
        audioPlayer.src = playlist[index].file;
        currentSongTitle.textContent = playlist[index].title;
        updatePlaylistHighlight();
    }

    function playAudio() {
        audioPlayer.play();
        isPlaying = true;
        updatePlayPauseButton();
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    function updatePlayPauseButton() {
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');

        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    function updateProgress() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + '%';

        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationEl.textContent = formatTime(audioPlayer.duration);
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function generatePlaylist() {
        playlistItems.innerHTML = '';

        playlist.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.innerHTML = `
                <span class="playlist-item-number">${index + 1}.</span>
                <span>${song.title}</span>
            `;

            item.addEventListener('click', () => {
                loadTrack(index);
                playAudio();
                playlistModal.classList.remove('active');
            });

            playlistItems.appendChild(item);
        });
    }

    function updatePlaylistHighlight() {
        const items = playlistItems.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === currentTrack) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
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
