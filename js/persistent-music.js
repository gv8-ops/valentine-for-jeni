// Persistent Music Player - Works across all pages
// Uses localStorage to maintain playback state

class PersistentMusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [
            { title: "Song 1", file: "assets/music/song1.mp3" },
            { title: "Song 2", file: "assets/music/song2.mp3" },
            { title: "Song 3", file: "assets/music/song3.mp3" },
            { title: "Song 4", file: "assets/music/song4.mp3" },
            { title: "Song 5", file: "assets/music/song5.mp3" },
            { title: "Song 6", file: "assets/music/song6.mp3" },
            { title: "Song 7", file: "assets/music/song7.mp3" },
            { title: "Song 8", file: "assets/music/song8.mp3" },
            { title: "Song 9", file: "assets/music/song9.mp3" },
            { title: "Song 10", file: "assets/music/song10.mp3" }
        ];
        this.currentIndex = 0;
        this.isPlaying = false;

        this.init();
    }

    init() {
        // Check if music was playing from previous page
        const savedState = localStorage.getItem('musicPlayerState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.currentIndex = state.currentIndex || 0;

            // Load the song immediately
            this.audio.src = this.playlist[this.currentIndex].file;
            this.audio.currentTime = state.currentTime || 0;

            // If it was playing, resume immediately
            if (state.isPlaying) {
                this.isPlaying = true;
                // Use a promise to handle audio playback
                this.audio.play().catch(err => {
                    console.log('Autoplay prevented:', err);
                    this.isPlaying = false;
                });
                this.updateDisplay();
            }
        }

        // Save state before page unload
        window.addEventListener('beforeunload', () => this.saveState());

        // Auto-play next song when current ends
        this.audio.addEventListener('ended', () => this.next());

        // Update state periodically (less frequently to reduce overhead)
        this.audio.addEventListener('timeupdate', () => {
            if (this.isPlaying) {
                this.saveState();
            }
        });
    }

    loadSong(index) {
        this.currentIndex = index;
        this.audio.src = this.playlist[index].file;
        this.updateDisplay();
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.updateDisplay();
        this.saveState();
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateDisplay();
        this.saveState();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadSong(this.currentIndex);
        if (this.isPlaying) {
            this.play();
        }
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadSong(this.currentIndex);
        if (this.isPlaying) {
            this.play();
        }
    }

    saveState() {
        const state = {
            currentIndex: this.currentIndex,
            currentTime: this.audio.currentTime,
            isPlaying: this.isPlaying
        };
        localStorage.setItem('musicPlayerState', JSON.stringify(state));
    }

    updateDisplay() {
        const titleEl = document.getElementById('floatingMusicTitle');
        const playBtn = document.getElementById('floatingPlayBtn');
        const playerBar = document.getElementById('floatingMusicPlayer');

        if (titleEl) {
            titleEl.textContent = this.playlist[this.currentIndex].title;
        }

        if (playBtn) {
            playBtn.innerHTML = this.isPlaying ?
                '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>' :
                '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
        }

        if (playerBar) {
            if (this.isPlaying || this.currentIndex > 0) {
                playerBar.classList.add('active');
            }
        }
    }

    getCurrentSong() {
        return this.playlist[this.currentIndex];
    }
}

// Initialize player globally
let musicPlayer;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize music player
    musicPlayer = new PersistentMusicPlayer();

    // Always create floating player (on all pages)
    createFloatingMusicPlayer();

    // Setup button handlers
    setupFloatingPlayerControls();

    // Trigger initial display update after a short delay
    setTimeout(() => {
        if (musicPlayer) {
            musicPlayer.updateDisplay();
        }
    }, 200);
});

function createFloatingMusicPlayer() {
    const playerHTML = `
        <div id="floatingMusicPlayer" class="floating-music-player">
            <div class="floating-player-content">
                <div class="floating-music-info">
                    <svg viewBox="0 0 24 24" width="20" height="20" style="color: #d687a6; margin-right: 10px;">
                        <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    <span id="floatingMusicTitle">No song playing</span>
                </div>
                <div class="floating-music-controls">
                    <button id="floatingPrevBtn" class="floating-control-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                    </button>
                    <button id="floatingPlayBtn" class="floating-control-btn floating-play-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <button id="floatingNextBtn" class="floating-control-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playerHTML);
}

function setupFloatingPlayerControls() {
    const playBtn = document.getElementById('floatingPlayBtn');
    const prevBtn = document.getElementById('floatingPrevBtn');
    const nextBtn = document.getElementById('floatingNextBtn');

    if (playBtn) {
        playBtn.addEventListener('click', () => musicPlayer.togglePlay());
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => musicPlayer.prev());
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => musicPlayer.next());
    }
}

// Export for use in music.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersistentMusicPlayer;
}
