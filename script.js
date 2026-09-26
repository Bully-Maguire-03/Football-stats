// ===== SETTINGS PANEL TOGGLE =====
function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  panel.classList.toggle('active');
}

document.addEventListener('click', (e) => {
  const panel = document.getElementById('settingsPanel');
  const settingsBtn = document.querySelector('.settings-btn');

  if (!panel.contains(e.target) && !settingsBtn.contains(e.target)) {
    panel.classList.remove('active');
  }
});

function toggleTheme() {
  const toggle = document.getElementById('themeToggle');
  document.body.classList.toggle('light-mode', toggle.checked);
  localStorage.setItem('theme', toggle.checked ? 'light' : 'dark');
}

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.getElementById('themeToggle').checked = true;
    document.body.classList.add('light-mode');
  }
});

function changeBackground() {
  const bgColor = document.getElementById('bgColor').value;
  const bgImage = document.getElementById('bgImage').value;

  if (bgImage) {
    document.body.style.background = `url('${bgImage}') center/cover no-repeat`;
  } else {
    document.body.style.background = bgColor;
  }

  localStorage.setItem('bgColor', bgColor);
  localStorage.setItem('bgImage', bgImage);
}

window.addEventListener('load', () => {
  const savedBgColor = localStorage.getItem('bgColor');
  const savedBgImage = localStorage.getItem('bgImage');

  if (savedBgColor) {
    document.getElementById('bgColor').value = savedBgColor;
  }
  if (savedBgImage) {
    document.getElementById('bgImage').value = savedBgImage;
    document.body.style.background = `url('${savedBgImage}') center/cover no-repeat`;
  }
});

let currentPlaylist = [];
let currentMusicIndex = 0;

function toggleMusicPlayer() {
  const toggle = document.getElementById('musicToggle');
  const player = document.getElementById('musicPlayer');

  if (toggle.checked) {
    player.style.display = 'block';
  } else {
    player.style.display = 'none';
    stopMusic();
  }
}

function addPresetMusic(url) {
  document.getElementById('musicUrl').value = url;
  loadMusic();
}

function loadMusic() {
  const musicUrl = document.getElementById('musicUrl').value.trim();

  if (!musicUrl) {
    alert('Please enter a music URL');
    return;
  }

  const audio = document.getElementById('audioPlayer');
  const musicTitle = document.getElementById('musicTitle');
  const toggle = document.getElementById('musicToggle');

  const fileName = musicUrl.split('/').pop().split('?')[0] || 'Music';

  audio.src = musicUrl;
  musicTitle.textContent = `🎵 ${fileName}`;
  toggle.checked = true;
  document.getElementById('musicPlayer').style.display = 'block';
  playPauseMusic();
}

function playPauseMusic() {
  const audio = document.getElementById('audioPlayer');
  const playBtn = document.querySelector('.play-btn');

  if (audio.paused) {
    audio.play().catch(() => {
      alert('Error playing music. Check the URL.');
    });
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function stopMusic() {
  const audio = document.getElementById('audioPlayer');
  const playBtn = document.querySelector('.play-btn');

  audio.pause();
  audio.currentTime = 0;
  playBtn.textContent = '▶️';
}

function removeMusic() {
  const audio = document.getElementById('audioPlayer');
  const musicTitle = document.getElementById('musicTitle');
  const musicUrl = document.getElementById('musicUrl');
  const toggle = document.getElementById('musicToggle');

  stopMusic();
  audio.src = '';
  musicTitle.textContent = 'No Music Loaded';
  musicUrl.value = '';
  toggle.checked = false;
  document.getElementById('musicPlayer').style.display = 'none';
}

function setVolume() {
  const volumeSlider = document.getElementById('volumeSlider');
  const audio = document.getElementById('audioPlayer');
  audio.volume = volumeSlider.value / 100;
}

function addColumn() {
  const container = document.getElementById('columnsContainer');
  const columnId = `column-${Date.now()}`;

  const card = document.createElement('div');
  card.className = 'column-card';
  card.id = columnId;
  card.innerHTML = `
    <h3>Player Name</h3>
    <input type="text" class="player-name" placeholder="Enter player name..." value="Player Name">
    <textarea class="player-stats" placeholder="Add player stats, position, rating, etc..." rows="5">Add stats here</textarea>
    <button class="delete-btn" onclick="deleteColumn('${columnId}')">🗑️ Delete</button>
  `;

  container.appendChild(card);
  saveColumns();

  card.querySelector('.player-name').addEventListener('input', (e) => {
    card.querySelector('h3').textContent = e.target.value || 'Player Name';
    saveColumns();
  });

  card.querySelector('.player-stats').addEventListener('input', saveColumns);
}

function deleteColumn(columnId) {
  const column = document.getElementById(columnId);
  column.remove();
  saveColumns();
}

function saveColumns() {
  const columns = [];
  const cards = document.querySelectorAll('.column-card');

  cards.forEach(card => {
    const playerName = card.querySelector('.player-name').value;
    const playerStats = card.querySelector('.player-stats').value;

    columns.push({ playerName, playerStats });
  });

  localStorage.setItem('columns', JSON.stringify(columns));
}

function loadColumns() {
  const saved = localStorage.getItem('columns');

  if (saved) {
    const columns = JSON.parse(saved);
    columns.forEach(({ playerName, playerStats }) => {
      addColumn();
      const card = document.querySelector('.column-card:last-child');
      card.querySelector('.player-name').value = playerName;
      card.querySelector('h3').textContent = playerName;
      card.querySelector('.player-stats').value = playerStats;
    });
  }
}

window.addEventListener('load', () => {
  loadColumns();
  setVolume();

  if (document.querySelectorAll('.column-card').length === 0) {
    addColumn();
  }
});
