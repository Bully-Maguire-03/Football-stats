const STORAGE_KEYS = { players: 'pitchrank_players_v2', history: 'pitchrank_history', adminEmail: 'pitchrank_admin_email' };
const DEFAULT_ADMIN_EMAIL = 'yourname@gmail.com';

const eventMap = {
  GK: ['Save Made', 'Claim', 'Long Kick', 'Clean Sheet', 'Goal Conceded', 'Dropped Ball'],
  DF: ['Successful Tackle', 'Interception', 'Aerial Duel Won', 'Beaten 1v1', 'Caught Out of Position', 'Clean Sheet'],
  MF: ['Assist', 'Chance Created', 'Completed Pass', 'Successful Dribble', 'Ball Loss', 'Defensive Tackle'],
  AT: ['Goal Scored', 'Shot on Target', 'Big Chance Missed', 'Shot Off-Target', 'Successful Dribble', 'Attacking Run']
};

const positionRules = {
  GK: { 'Save Made': 0.15, Claim: 0.20, 'Long Kick': 0.10, 'Clean Sheet': 0.40, 'Goal Conceded': -0.20, 'Dropped Ball': -0.25 },
  DF: { 'Successful Tackle': 0.25, Interception: 0.20, 'Aerial Duel Won': 0.15, 'Beaten 1v1': -0.15, 'Caught Out of Position': -0.20, 'Clean Sheet': 0.30 },
  MF: { Assist: 0.30, 'Chance Created': 0.15, 'Completed Pass': 0.02, 'Successful Dribble': 0.15, 'Ball Loss': -0.12, 'Defensive Tackle': 0.15 },
  AT: { 'Goal Scored': 0.35, 'Shot on Target': 0.10, 'Big Chance Missed': -0.25, 'Shot Off-Target': -0.05, 'Successful Dribble': 0.15, 'Attacking Run': 0.10 }
};

const defaultPlayers = [
  { id: 'gk-1', name: 'Zishan', club: 'Barça', position: 'GK', totalPoints: 0 },
  { id: 'df-1', name: 'Naresh', club: 'Barça', position: 'DF', totalPoints: 0 },
  { id: 'df-2', name: 'Ibrahim', club: 'Barça', position: 'DF', totalPoints: 0 },
  { id: 'mf-1', name: 'Ihsan', club: 'Barça', position: 'MF', totalPoints: 0 },
  { id: 'mf-2', name: 'M.Akhsar', club: 'Barça', position: 'MF', totalPoints: 0 },
  { id: 'mf-3', name: 'Rusndi', club: 'Barça', position: 'MF', totalPoints: 0 },
  { id: 'mf-4', name: 'Suhail', club: 'Barça', position: 'MF', totalPoints: 0 },
  { id: 'at-1', name: 'Vaibhav', club: 'Barça', position: 'AT', totalPoints: 0 },
  { id: 'at-2', name: 'M.Ali', club: 'Barça', position: 'AT', totalPoints: 0 },
  { id: 'gk-2', name: 'Isam', club: 'Madrid', position: 'GK', totalPoints: 0 },
  { id: 'df-3', name: 'Parthiv', club: 'Madrid', position: 'DF', totalPoints: 0 },
  { id: 'df-4', name: 'Shahbaz', club: 'Madrid', position: 'DF', totalPoints: 0 },
  { id: 'mf-5', name: 'Khush', club: 'Madrid', position: 'MF', totalPoints: 0 },
  { id: 'mf-6', name: 'Ishan', club: 'Madrid', position: 'MF', totalPoints: 0 },
  { id: 'mf-7', name: 'Mishal', club: 'Madrid', position: 'MF', totalPoints: 0 },
  { id: 'mf-8', name: 'Zayan', club: 'Madrid', position: 'MF', totalPoints: 0 },
  { id: 'at-3', name: 'Sayed', club: 'Madrid', position: 'AT', totalPoints: 0 },
  { id: 'at-4', name: 'Dhruvlal', club: 'Madrid', position: 'AT', totalPoints: 0 }
];

let currentAdminEmail = localStorage.getItem(STORAGE_KEYS.adminEmail) || DEFAULT_ADMIN_EMAIL;

function getPlayers() {
  const raw = localStorage.getItem(STORAGE_KEYS.players);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(defaultPlayers));
    return [...defaultPlayers];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [...defaultPlayers];
  }
}

function savePlayers(players) {
  localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(players));
}

function getHistory() {
  const raw = localStorage.getItem(STORAGE_KEYS.history);
  try {
    return JSON.parse(raw) || [];
  } catch (e) {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
}

function applyEvent(playerId, eventType, quantity) {
  const players = getPlayers();
  const player = players.find(p => p.id === playerId);
  if (!player) return;

  const multiplier = positionRules[player.position]?.[eventType] || 0;
  const pointsAdded = multiplier * quantity;
  player.totalPoints += pointsAdded;

  const history = getHistory();
  history.push({
    timestamp: new Date().toISOString(),
    playerId,
    playerName: player.name,
    event: eventType,
    quantity,
    pointsAdded,
    newTotal: player.totalPoints
  });
  saveHistory(history);
  savePlayers(players);

  return { pointsAdded, newTotal: player.totalPoints };
}

function undoLast() {
  const history = getHistory();
  if (history.length === 0) return false;

  const lastEntry = history.pop();
  const players = getPlayers();
  const player = players.find(p => p.id === lastEntry.playerId);
  if (player) {
    player.totalPoints = lastEntry.newTotal - lastEntry.pointsAdded;
    savePlayers(players);
  }
  saveHistory(history);
  return true;
}

function getSortedPlayersByPosition(position, searchTerm = '') {
  return [...getPlayers()]
    .filter(p => p.position === position && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

function renderRankings() {
  const grid = document.getElementById('rankingGrid');
  const searchTerm = document.getElementById('searchInput').value;
  const filterPos = document.getElementById('filterPosition').value;
  const positions = filterPos ? [filterPos] : ['GK', 'DF', 'MF', 'AT'];

  grid.innerHTML = positions.map(pos => {
    const players = getSortedPlayersByPosition(pos, searchTerm);
    const cards = players.map((p, idx) => `
      <article class="player-card">
        <div class="player-card-top">
          <span style="font-weight:600;">#${idx + 1}</span>
          <span class="player-points">${p.totalPoints.toFixed(2)} pts</span>
        </div>
        <div class="player-row">
          <span class="player-name">${p.name}</span>
          <span class="player-club">${p.club}</span>
        </div>
      </article>
    `).join('');

    return `
      <section class="position-panel ${pos}">
        <div class="position-header">
          <h3>${pos === 'GK' ? '🧤 Goalkeepers' : pos === 'DF' ? '🛡️ Defenders' : pos === 'MF' ? '⚙️ Midfielders' : '🚀 Attackers'}</h3>
          <span class="position-badge">${pos}</span>
        </div>
        <div class="player-card-list">${cards || '<div style="padding:10px;color:var(--muted);">No players</div>'}</div>
      </section>
    `;
  }).join('');
}

function renderSummary() {
  const players = getPlayers();
  document.getElementById('summaryGK').textContent = players.filter(p => p.position === 'GK').length;
  document.getElementById('summaryDF').textContent = players.filter(p => p.position === 'DF').length;
  document.getElementById('summaryMF').textContent = players.filter(p => p.position === 'MF').length;
  document.getElementById('summaryAT').textContent = players.filter(p => p.position === 'AT').length;
}

function renderEventSelects() {
  const players = getPlayers();
  const playerSelect = document.getElementById('eventPlayerSelect');
  playerSelect.innerHTML = players.map(p => `<option value="${p.id}">${p.name} (${p.position})</option>`).join('');

  updateEventTypes();
}

function updateEventTypes() {
  const playerSelect = document.getElementById('eventPlayerSelect');
  const eventTypeSelect = document.getElementById('eventTypeSelect');
  const playerId = playerSelect.value;
  const player = getPlayers().find(p => p.id === playerId);
  const events = player ? eventMap[player.position] || [] : [];
  eventTypeSelect.innerHTML = events.map(e => `<option value="${e}">${e}</option>`).join('');
}

function renderHistory() {
  const history = getHistory();
  const list = document.getElementById('historyList');
  if (history.length === 0) {
    list.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px;">No events logged yet</p>';
    return;
  }
  list.innerHTML = [...history].reverse().map(h => `
    <div class="history-item">
      <div class="history-info">
        <div class="history-player">${h.playerName}</div>
        <div class="history-event">${h.event} x${h.quantity} • ${new Date(h.timestamp).toLocaleString()}</div>
      </div>
      <div class="history-value" style="background: ${h.pointsAdded >= 0 ? 'rgba(126,228,174,0.2)' : 'rgba(255,120,110,0.2)'};">⚡ ${h.pointsAdded >= 0 ? '+' : ''}${h.pointsAdded.toFixed(2)}</div>
    </div>
  `).join('');
}

function setTab(tabName) {
  document.querySelectorAll('.tab-button').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('hidden', !p.id.startsWith(tabName)));
  if (tabName === 'events') renderEventSelects();
  if (tabName === 'history') renderHistory();
}

function init() {
  renderSummary();
  renderRankings();
  renderEventSelects();
  
  document.querySelectorAll('.tab-button').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
  document.getElementById('searchInput').addEventListener('input', renderRankings);
  document.getElementById('filterPosition').addEventListener('change', renderRankings);
  document.getElementById('sortToggle').addEventListener('click', renderRankings);
  document.getElementById('eventPlayerSelect').addEventListener('change', updateEventTypes);
  
  document.getElementById('applyEventBtn').addEventListener('click', () => {
    const playerId = document.getElementById('eventPlayerSelect').value;
    const eventType = document.getElementById('eventTypeSelect').value;
    const quantity = parseInt(document.getElementById('eventQuantity').value) || 1;
    applyEvent(playerId, eventType, quantity);
    renderSummary();
    renderRankings();
    renderHistory();
    document.getElementById('eventQuantity').value = '1';
  });
  
  document.getElementById('undoLastBtn').addEventListener('click', () => {
    if (undoLast()) {
      renderSummary();
      renderRankings();
      renderHistory();
    }
  });
  
  document.getElementById('adminToggleBtn').addEventListener('click', () => {
    document.getElementById('adminPanel').classList.toggle('hidden');
  });
  
  document.getElementById('closeAdminPanelBtn').addEventListener('click', () => {
    document.getElementById('adminPanel').classList.add('hidden');
  });
  
  document.getElementById('unlockAdminBtn').addEventListener('click', () => {
    const email = document.getElementById('adminEmailInput').value.toLowerCase();
    if (email === currentAdminEmail.toLowerCase() || email === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
      currentAdminEmail = email;
      localStorage.setItem(STORAGE_KEYS.adminEmail, currentAdminEmail);
      document.getElementById('adminEditor').classList.remove('hidden');
    }
  });
  
  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    const data = { players: getPlayers(), history: getHistory() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pitchrank_${Date.now()}.json`;
    a.click();
  });
  
  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const players = getPlayers();
    let csv = 'Name,Club,Position,Total Points\n';
    players.forEach(p => csv += `${p.name},${p.club},${p.position},${p.totalPoints}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pitchrank_${Date.now()}.csv`;
    a.click();
  });
  
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  
  document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.players) localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(data.players));
        if (data.history) localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(data.history));
        renderSummary();
        renderRankings();
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  });
  
  document.getElementById('adminPanel').classList.add('hidden');
}

init();