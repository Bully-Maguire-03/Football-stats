<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Football Stats</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <button class="settings-btn" onclick="toggleSettings()">⚙️ Settings</button>

  <div class="settings-panel" id="settingsPanel">
    <div class="settings-content">
      <h2>Settings</h2>
      <button class="close-btn" onclick="toggleSettings()">✕</button>

      <div class="setting-item">
        <label for="themeToggle">Dark Mode:</label>
        <input type="checkbox" id="themeToggle" onchange="toggleTheme()" />
      </div>

      <div class="setting-item">
        <label for="bgColor">Background Color:</label>
        <input type="color" id="bgColor" onchange="changeBackground()" />
      </div>

      <div class="setting-item">
        <label for="bgImage">Background Image URL:</label>
        <input type="text" id="bgImage" placeholder="Enter image URL..." onchange="changeBackground()" />
      </div>

      <div class="setting-item">
        <label for="musicToggle">Enable Music Player:</label>
        <input type="checkbox" id="musicToggle" onchange="toggleMusicPlayer()" />
      </div>

      <div class="setting-item">
        <label for="musicUrl">Music URL:</label>
        <input type="text" id="musicUrl" placeholder="Enter music file URL..." />
      </div>

      <button onclick="loadMusic()" class="load-music-btn">Load Music</button>
    </div>
  </div>

  <div class="music-player" id="musicPlayer" style="display: none;">
    <div class="player-controls">
      <button onclick="playPauseMusic()">▶️ Play</button>
      <button onclick="stopMusic()">⏹️ Stop</button>
      <input type="range" id="volumeSlider" min="0" max="100" value="50" onchange="setVolume()" />
      <span id="musicTitle">No Music Loaded</span>
    </div>
    <audio id="audioPlayer"></audio>
  </div>

  <div class="top-column">
    <h3>Stats Overview</h3>
    <div id="topColumnContent">
      <p>Add your stats here</p>
    </div>
  </div>

  <div class="main-container">
    <div class="columns-container" id="columnsContainer"></div>
    <button class="add-column-btn" onclick="addColumn()">+ Add Column</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
