<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PitchRank - Football Player Rankings</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="header">
    <div class="header-content">
      <h1 class="site-title">⚽ PitchRank</h1>
      <p class="site-tagline">Rank Football Players Based on Match Performance</p>
    </div>
  </header>

  <button class="settings-btn" onclick="toggleSettings()">⚙️ Settings</button>

  <div class="settings-panel" id="settingsPanel">
    <div class="settings-content">
      <div class="settings-header">
        <h2>Settings</h2>
        <button class="close-btn" onclick="toggleSettings()">✕</button>
      </div>

      <div class="settings-section">
        <h3>Theme & Background</h3>
        <div class="setting-item">
          <label for="themeToggle">🌙 Dark Mode:</label>
          <input type="checkbox" id="themeToggle" onchange="toggleTheme()" />
        </div>

        <div class="setting-item">
          <label for="bgColor">🎨 Background Color:</label>
          <input type="color" id="bgColor" onchange="changeBackground()" />
        </div>

        <div class="setting-item">
          <label for="bgImage">🖼️ Background Image URL:</label>
          <input type="text" id="bgImage" placeholder="Enter image URL..." onchange="changeBackground()" />
        </div>
      </div>

      <div class="settings-section">
        <h3>Music Player</h3>
        <div class="setting-item">
          <label for="musicToggle">🎵 Enable Music:</label>
          <input type="checkbox" id="musicToggle" onchange="toggleMusicPlayer()" />
        </div>

        <div class="setting-item">
          <label for="musicUrl">🔗 Music URL:</label>
          <input type="text" id="musicUrl" placeholder="Enter .mp3 or .wav URL..." />
        </div>

        <div class="music-presets">
          <p>Quick Add:</p>
          <button class="preset-btn" onclick="addPresetMusic('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')">Sample Music 1</button>
          <button class="preset-btn" onclick="addPresetMusic('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3')">Sample Music 2</button>
          <button class="preset-btn" onclick="addPresetMusic('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3')">Sample Music 3</button>
        </div>

        <button onclick="loadMusic()" class="load-music-btn">+ Load Music</button>
      </div>
    </div>
  </div>

  <div class="music-player" id="musicPlayer" style="display: none;">
    <div class="player-controls">
      <button class="play-btn" onclick="playPauseMusic()">▶️</button>
      <button class="stop-btn" onclick="stopMusic()">⏹️</button>
      <div class="volume-control">
        <span>🔊</span>
        <input type="range" id="volumeSlider" min="0" max="100" value="50" onchange="setVolume()" />
      </div>
      <span id="musicTitle" class="music-title">No Music Loaded</span>
      <button class="remove-music-btn" onclick="removeMusic()">✕</button>
    </div>
    <audio id="audioPlayer"></audio>
  </div>

  <div class="container">
    <div class="top-column">
      <h2>📊 Stats Overview</h2>
      <div id="topColumnContent">
        <p>Add your stats here to track player performance</p>
      </div>
    </div>

    <div class="main-container">
      <div class="columns-container" id="columnsContainer"></div>
      <button class="add-column-btn" onclick="addColumn()">+ Add Player Column</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
