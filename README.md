# 🌸 Valentine's Website for Jeni - Instructions 🌸

## Overview
This is a romantic, interactive Valentine's Day website created specifically for Jeni. The website features a dreamy pink aesthetic with whimsical animations, floating hearts, and multiple interactive sections.

---

## 📁 Project Structure

```
Valentine/
├── index.html          (Landing page - "Will You Be My Valentine?")
├── hub.html           (Navigation hub with 4 cards)
├── timeline.html      (Your journey together)
├── gallery.html       (Photo memories)
├── music.html         (Music player with playlist)
├── letter.html        (Love letter with scroll reveal)
├── css/
│   └── styles.css     (All styling)
├── js/
│   ├── landing.js     (Landing page interactions)
│   ├── hub.js         (Hub page animations)
│   ├── timeline.js    (Timeline functionality)
│   ├── gallery.js     (Photo gallery)
│   ├── music.js       (Music player)
│   └── letter.js      (Letter scroll effects)
└── assets/
    ├── images/
    │   ├── couple-illustration.png    (Your couple sticker for landing page)
    │   ├── gallery/                   (15-20 photos of you two)
    │   │   ├── photo1.jpg
    │   │   ├── photo2.jpg
    │   │   └── ... (up to photo20.jpg)
    │   └── timeline/                  (Photos for timeline memories)
    │       ├── memory1.jpg
    │       ├── memory2.jpg
    │       └── ... (as many as you need)
    └── music/
        ├── song1.mp3
        ├── song2.mp3
        └── ... (up to 10-15 songs)
```

---

## 🎨 How to Add Your Content

### 1. **Add Your Couple Illustration** (Landing Page)
- Place your couple illustration/sticker image at: `assets/images/couple-illustration.png`
- Supported formats: PNG, JPG, WEBP
- Recommended size: 300-500px width

### 2. **Add Gallery Photos** (Us Page)
- Add 15-20 photos to: `assets/images/gallery/`
- Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
- Supported formats: JPG, PNG, WEBP
- Recommended size: 800x800px or larger

If you have more or fewer than 15 photos, edit `gallery.html` and add/remove `<img>` tags:
```html
<img src="assets/images/gallery/photoXX.jpg" alt="Memory XX" class="gallery-photo">
```

### 3. **Add Timeline Memories** (Timeline Page)
Edit `timeline.html` to customize your timeline:

1. **Change dates**: Edit the `<div class="node-date">` text
2. **Add descriptions**: Edit the `<p class="node-description">` text  
3. **Add photos**: Place images in `assets/images/timeline/` and update image paths

Example node:
```html
<div class="timeline-node" data-node="1">
    <div class="node-dot"></div>
    <div class="node-date">January 14, 2024</div>
    <div class="node-content">
        <img src="assets/images/timeline/first-date.jpg" alt="Our First Date">
        <p class="node-description">The day we first met at the coffee shop. I knew you were special from the moment I saw your smile.</p>
    </div>
</div>
```

To add more nodes, copy the entire `timeline-node` div structure.

### 4. **Add Music** (Music Page)
1. **Add song files**: Place your 10-15 MP3 files in `assets/music/`
   - Name them: `song1.mp3`, `song2.mp3`, etc.

2. **Update playlist**: Edit `js/music.js` (line 17-32)
   ```javascript
   const playlist = [
       { title: 'Beautiful by Bazzi', file: 'assets/music/song1.mp3' },
       { title: 'Perfect by Ed Sheeran', file: 'assets/music/song2.mp3' },
       { title: 'All of Me by John Legend', file: 'assets/music/song3.mp3' },
       // Add your actual song titles and file names
   ];
   ```

### 5. **Write Your Love Letter** (For My Valentine Page)
Edit `letter.html` to replace the placeholder text with your heartfelt message:

1. Replace the greeting if desired (line 21):
   ```html
   <h1 class="letter-greeting">My Dearest Jeni,</h1>
   ```

2. Replace paragraph placeholders with your actual letter (lines 23-42):
   ```html
   <p class="letter-paragraph">
       Your actual heartfelt message here...
   </p>
   ```

3. Add more paragraphs as needed - just copy the `<p class="letter-paragraph">` structure

4. The signature appears at the end - you can keep the heart or add your actual signature

---

## 🚀 How to Share with Jeni

### Option 1: Send as ZIP File via Email
1. Compress the entire `Valentine` folder into a ZIP file
2. Attach to email with a sweet message
3. She downloads, extracts, and opens `index.html` in her browser

### Option 2: Host Online (Free Options)

#### Using GitHub Pages:
1. Create a free GitHub account
2. Create a new repository named "for-jeni"
3. Upload all files
4. Go to Settings → Pages → Enable GitHub Pages
5. Share the link: `https://yourusername.github.io/for-jeni/`

#### Using Netlify (Easiest):
1. Create a free Netlify account
2. Drag and drop the `Valentine` folder onto Netlify
3. Get a shareable link immediately
4. Can customize the URL

### Option 3: USB Drive
1. Copy the `Valentine` folder to a USB drive
2. Give her the USB with instructions to open `index.html`

---

## ✨ Features & User Experience

### Landing Page
- "WILL YOU BE MY VALENTINE?" with your couple sticker
- "No" button floats away when hovered (she can't say no! 😄)
- "Yes" button creates a beautiful flower burst animation

### Hub Page  
- 4 icon cards fly in with animation
- Each card leads to a different section
- Flower burst on card clicks

### Timeline
- Vertical timeline of your relationship
- Click nodes to expand and see photos + descriptions
- Previous nodes collapse when new ones open

### Gallery (Us)
- 15-20 photos scattered artistically
- Random rotations for playful look
- Click any photo to view fullscreen

### Music Player
- 10-15 songs she loves
- Play/pause, next/previous controls
- Progress bar
- View full playlist
- Auto-plays next song

### Love Letter
- Scroll-reveal effect (like unrolling an ancient scroll - her favorite!)
- Text fades in as she scrolls
- Beautiful typography

### Throughout
- Floating hearts on every page
- Dreamy pink gradients
- Elegant script fonts
- Smooth animations

---

## 🎯 Testing Before Sending

1. **Open** `index.html` in a web browser
2. **Test the landing page**: Try hovering over "No" and clicking "Yes"
3. **Navigate through all sections** using the hub page
4. **Check timeline**: Click each node to ensure they expand/collapse
5. **Verify gallery**: Click photos to ensure modal works
6. **Test music player**: Make sure songs are named correctly and play
7. **Read the letter**: Scroll to see the reveal effect

---

## 💡 Tips

- **Image sizes**: Keep images under 2MB each for faster loading
- **Music files**: MP3 format works best, keep under 10MB per song
- **Browser compatibility**: Works best in Chrome, Firefox, Safari, or Edge
- **Mobile-friendly**: The site is responsive and works on phones too!

---

## 🐛 Troubleshooting

**Images not showing:**
- Check file names match exactly (case-sensitive!)
- Ensure images are in correct folders
- Use supported formats (JPG, PNG, WEBP)

**Music not playing:**
- Verify MP3 files are in `assets/music/`
- Check file names in `js/music.js` match actual file names
- Some browsers block autoplay - user must click "Start Playing"

**Animations not working:**
- Make sure JavaScript files are linked correctly
- Try refreshing the page
- Check browser console for errors (F12)

---

## ❤️ Final Touch

Before sending:
- [ ] Add couple illustration
- [ ] Add all gallery photos
- [ ] Update timeline with your memories
- [ ] Add music files and update titles
- [ ] Write your love letter
- [ ] Test everything!
- [ ] Create a sweet email/message to send it with

---

**Made with love for Jeni** 💕

Enjoy creating this special gift! Take your time making it perfect. She's going to love it! 🌸
