const STORAGE_KEY = 'pitchrank_merged_data_v2';
const ADMIN_EMAIL = 'yourname@gmail.com';

const pointRules = {
  GK: [
    ['Save Made', 'Reflexes', 0.15],
    ['Clean Sheet', 'Positioning', 0.4],
    ['Goal Conceded', 'Positioning', -0.2],
    ['Long Kick', 'Distribution', 0.1]
  ],
  DF: [
    ['Successful Tackle', 'Tackling', 0.25],
    ['Interception', 'Awareness', 0.2],
    ['Aerial Duel Won', 'Aerial Ability', 0.15],
    ['Clean Sheet', 'Awareness', 0.3]
  ],
  MF: [
    ['Assist', 'Vision', 0.3],
    ['Chance Created', 'Vision', 0.15],
    ['Successful Dribble', 'Ball Control', 0.15],
    ['Defensive Tackle', 'Defending', 0.15]
  ],
  AT: [
    ['Goal Scored', 'Finishing', 0.35],
    ['Shot on Target', 'Shot Power', 0.1],
    ['Big Chance Missed', 'Finishing', -0.25],
    ['Successful Dribble', 'Dribbling', 0.15]
  ],
  ALL: [
    ['Ball Recovery', 'Physical', 0.05],
    ['Sprint Won', 'Pace', 0.05],
    ['Foul Committed', 'Physical', -0.05],
    ['Red Card', 'Physical', -0.5]
  ]
};

const defaultPlayers = [
  { id: 'gk-1', name: 'Zishan', club: 'Barça', position: 'GK', claimedBy: null, email: '', stats: { Reflexes: 82, Positioning: 78, Handling: 79, Distribution: 74, Physical: 68, Pace: 70 } },
  { id: 'df-1', name: 'Naresh', club: 'Barça', position: 'DF', claimedBy: null, email: '', stats: { Tackling: 71, Awareness: 76, 'Aerial Ability': 72, Physical: 71, Pace: 72 } },
  { id: 'df-2', name: 'Ibrahim', club: 'Barça', position: 'DF', claimedBy: null, email: '', stats: { Tackling: 69, Awareness: 74, 'Aerial Ability': 70, Physical: 69, Pace: 73 } },
  { id: 'mf-1', name: 'Ihsan', club: 'Barça', position: 'MF', claimedBy: null, email: '', stats: { Vision: 81, Passing: 78, 'Ball Control': 80, Defending: 72, Physical: 74, Pace: 76 } },
  { id: 'mf-2', name: 'M.Akhsar', club: 'Barça', position: 'MF', claimedBy: null, email: '', stats: { Vision: 78, Passing: 77, 'Ball Control': 76, Defending: 68, Physical: 72, Pace: 79 } },
  { id: 'mf-3', name: 'Rusndi', club: 'Barça', position: 'MF', claimedBy: null, email: '', stats: { Vision: 72, Passing: 80, 'Ball Control': 73, Defending: 71, Physical: 75, Pace: 74 } },
  { id: 'mf-4', name: 'Suhail', club: 'Barça', position: 'MF', claimedBy: null, email: '', stats: { Vision: 77, Passing: 76, 'Ball Control': 74, Defending: 75, Physical: 76, Pace: 70 } },
  { id: 'at-1', name: 'Vaibhav', club: 'Barça', position: 'AT', claimedBy: null, email: '', stats: { Finishing: 79, 'Shot Power': 76, Dribbling: 75, Positioning: 72, Physical: 71, Pace: 82 } },
  { id: 'at-2', name: 'M.Ali', club: 'Barça', position: 'AT', claimedBy: null, email: '', stats: { Finishing: 70, 'Shot Power': 73, Dribbling: 78, Positioning: 70, Physical: 68, Pace: 80 } },
  { id: 'gk-2', name: 'Isam', club: 'Madrid', position: 'GK', claimedBy: null, email: '', stats: { Reflexes: 80, Positioning: 76, Handling: 78, Distribution: 72, Physical: 70, Pace: 69 } },
  { id: 'df-3', name: 'Parthiv', club: 'Madrid', position: 'DF', claimedBy: null, email: '', stats: { Tackling: 72, Awareness: 75, 'Aerial Ability': 71, Physical: 73, Pace: 74 } },
  { id: 'df-4', name: 'Shahbaz', club: 'Madrid', position: 'DF', claimedBy: null, email: '', stats: { Tackling: 66, Awareness: 70, 'Aerial Ability': 68, Physical: 67, Pace: 71 } },
  { id: 'mf-5', name: 'Khush', club: 'Madrid', position: 'MF', claimedBy: null, email: '', stats: { Vision: 73, Passing: 78, 'Ball Control': 79, Defending: 71, Physical: 72, Pace: 77 } },
  { id: 'mf-6', name: 'Ishan', club: 'Madrid', position: 'MF', claimedBy: null, email: '', stats: { Vision: 75, Passing: 73, 'Ball Control': 72, Defending: 70, Physical: 71, Pace: 75 } },
  { id: 'mf-7', name: 'Mishal', club: 'Madrid', position: 'MF', claimedBy: null, email: '', stats: { Vision: 74, Passing: 75, 'Ball Control': 77, Defending: 72, Physical: 73, Pace: 76 } },
  { id: 'mf-8', name: 'Zayan', club: 'Madrid', position: 'MF', claimedBy: null, email: '', stats: { Vision: 76, Passing: 74, 'Ball Control': 75, Defending: 73, Physical: 72, Pace: 78 } },
  { id: 'at-3', name: 'Sayed', club: 'Madrid', position: 'AT', claimedBy: null, email: '', stats: { Finishing: 72, 'Shot Power': 74, Dribbling: 76, Positioning: 71, Physical: 70, Pace: 81 } },
  { id: 'at-4', name: 'Dhruvlal', club: 'Madrid', position: 'AT', claimedBy: null, email: '', stats: { Finishing: 75, 'Shot Power': 73, Dribbling: 74, Positioning: 70, Physical: 72, Pace: 79 } }
];

const sessionDefaults = {
  activeUser: null,
  suggestions: []
};

const positionLabels = { GK: 'Goalkeepers', DF: 'Defenders', MF: 'Midfielders', AT: 'Attackers' };

const els = {
  rankingGrid: document.getElementById('rankingGrid'),
  summary: document.getElementById('leaderboardSummary'),
  searchInput: document.getElementById('searchInput'),
  positionFilter: document.getElementById('positionFilter'),
  sortFilter: document.getElementById('sortFilter'),
  eventPlayerSelect: document.getElementById('eventPlayerSelect'),
  eventTypeSelect: document.getElementById('eventTypeSelect'),
  eventQuantity: document.getElementById('eventQuantity'),
  historyList: document.getElementById('historyList'),
  loginStatusBox: document.getElementById('loginStatusBox'),
  playerClaimCard: document.getElementById('playerClaimCard'),
  playerStatsGrid: document.getElementById('playerStatsGrid'),
  suggestionForm: document.getElementById('suggestionForm'),
  suggestionText: document.getElementById('suggestionText'),
  suggestionList: document.getElementById('suggestionList'),
  publicSuggestions: document.getElementById('publicSuggestions'),
  authModal: document.getElementById('authModal'),
  authName: document.getElementById('authName'),
  authEmail: document.getElementById('authEmail'),
  authPlayer: document.getElementById('authPlayer'),
  adminPanel: document.getElementById('adminPanel'),
  adminEmailInput: document.getElementById('adminEmailInput'),
  adminPlayerSelect: document.getElementById('adminPlayerSelect'),
  adminPlayerForm: document.getElementById('adminPlayerForm'),
  claimedList: document.getElementById('claimedList'),
  adminEditor: document.getElementById('adminEditor'),
  adminTabBtn: document.getElementById('adminTabBtn')
};

function getStorageData() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  const base = {
    players: defaultPlayers,
    history: [],
    suggestions: [],
    activeUser: null
  };

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
    return base;
  }

  return {
    ...base,
    ...stored,
    players: Array.isArray(stored.players) && stored.players.length ? stored.players : defaultPlayers,
    history: Array.isArray(stored.history) ? stored.history : [],
    suggestions: Array.isArray(stored.suggestions) ? stored.suggestions : [],
    activeUser: stored.activeUser || null
  };
}

function saveStorageData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getData() {
  return getStorageData();
}

function getRulesForPosition(position) {
  return [...(pointRules[position] || []), ...pointRules.ALL];
}

function calculatePlayerPoints(player) {
  const rules = getRulesForPosition(player.position);
  return Number(rules.reduce((total, rule) => {
    const stat = rule[1];
    const value = Number(player.stats?.[stat] || 0);
    return total + value * rule[2];
  }, 0).toFixed(2));
}

function syncPlayerPoints() {
  const data = getData();
  data.players = data.players.map((player) => ({
    ...player,
    totalPoints: calculatePlayerPoints(player)
  }));
  saveStorageData(data);
  return data;
}

function getCurrentUser() {
  const data = getData();
  return data.activeUser;
}

function setCurrentUser(user) {
  const data = getData();
  data.activeUser = user;
  saveStorageData(data);
}

function getClaimedPlayer() {
  const data = getData();
  return data.players.find((player) => player.claimedBy && player.claimedBy === getCurrentUser()?.email);
}

function pickBackground() {
  const backgrounds = [
    'linear-gradient(135deg, rgba(8, 15, 28, 0.8), rgba(18, 34, 52, 0.8)), url("https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80") center/cover',
    'linear-gradient(135deg, rgba(7, 17, 28, 0.7), rgba(28, 42, 58, 0.8)), url("https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=1600&q=80") center/cover',
    'linear-gradient(135deg, rgba(8, 16, 28, 0.75), rgba(18, 32, 52, 0.85)), url("https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1600&q=80") center/cover',
    'linear-gradient(135deg, rgba(12, 18, 30, 0.72), rgba(26, 38, 56, 0.82)), url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80") center/cover'
  ];

  const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.body.style.background = bg;
}

function renderSummary() {
  const data = getData();
  const counts = { GK: 0, DF: 0, MF: 0, AT: 0 };
  data.players.forEach((player) => {
    counts[player.position] += 1;
  });

  els.summary.innerHTML = ['GK', 'DF', 'MF', 'AT'].map((pos) => `
    <div class="summary-tile">
      <span>${positionLabels[pos]}</span>
      <strong>${counts[pos]}</strong>
    </div>
  `).join('');
}

function getFilteredPlayers() {
  const search = (els.searchInput?.value || '').trim().toLowerCase();
  const filter = els.positionFilter?.value || '';
  const sortMode = els.sortFilter?.value || 'points';

  const data = getData();
  let players = data.players.filter((player) => {
    const matchesText = !search || player.name.toLowerCase().includes(search);
    const matchesPos = !filter || player.position === filter;
    return matchesText && matchesPos;
  });

  players.sort((a, b) => {
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    if (sortMode === 'club') return a.club.localeCompare(b.club);
    return (b.totalPoints || calculatePlayerPoints(b)) - (a.totalPoints || calculatePlayerPoints(a));
  });

  return players;
}

function renderRankings() {
  const players = getFilteredPlayers();
  const positions = ['GK', 'DF', 'MF', 'AT'];
  const filter = els.positionFilter.value;

  els.rankingGrid.innerHTML = positions.filter((pos) => !filter || pos === filter).map((pos) => {
    const list = players.filter((player) => player.position === pos);

    const cards = list.map((player, index) => {
      const teamClass = player.club.toLowerCase().includes('bar') ? 'barca' : 'madrid';
      const points = calculatePlayerPoints(player);
      const topList = Object.entries(player.stats || {}).slice(0, 4).map(([key, value]) => `
        <span class="stat-pill">${key}<strong>${value}</strong></span>
      `).join('');

      return `
        <article class="player-row-card ${index < 10 ? 'elite' : ''}">
          <div class="player-head">
            <span class="player-rank">#${index + 1}</span>
            <span class="player-points">${points.toFixed(2)} pts</span>
          </div>
          <div class="player-main">
            <span class="player-name">${player.name}</span>
            <span class="club-badge ${teamClass}">${player.club}</span>
          </div>
          <div class="stat-stack">${topList}</div>
        </article>
      `;
    }).join('') || '<div class="player-row-card"><p class="muted">No players found.</p></div>';

    return `
      <div class="position-column ${pos}">
        <div class="position-header">
          <h3>${positionLabels[pos]}</h3>
          <span class="position-badge">${pos}</span>
        </div>
        <div class="player-list">${cards}</div>
      </div>
    `;
  }).join('');
}

function updateEventChoices() {
  const data = getData();
  const player = data.players.find((entry) => entry.id === els.eventPlayerSelect.value) || data.players[0];
  const rules = getRulesForPosition(player.position);
  els.eventTypeSelect.innerHTML = rules.map(([label]) => `<option value="${label}">${label}</option>`).join('');
}

function populateEventPlayerSelect() {
  const data = getData();
  els.eventPlayerSelect.innerHTML = data.players.map((player) => `
    <option value="${player.id}">${player.name} (${player.position})</option>
  `).join('');
  updateEventChoices();
}

function renderHistory() {
  const data = getData();
  if (!data.history.length) {
    els.historyList.innerHTML = '<div class="history-item"><div class="history-meta"><div class="history-name">No events yet</div><div class="history-detail">Log the first match event from the Events tab.</div></div></div>';
    return;
  }

  els.historyList.innerHTML = [...data.history].reverse().map((entry) => {
    const delta = Number(entry.delta || 0);
    const tone = delta >= 0 ? 'background: rgba(134,239,179,0.12); color: var(--green);' : 'background: rgba(255,123,115,0.12); color: var(--red);';
    return `
      <div class="history-item">
        <div class="history-meta">
          <div class="history-name">${entry.playerName}</div>
          <div class="history-detail">${entry.eventLabel} × ${entry.quantity} • ${entry.timestamp}</div>
        </div>
        <div class="history-delta" style="${tone}">${delta >= 0 ? '+' : ''}${delta.toFixed(2)}</div>
      </div>
    `;
  }).join('');
}

function applyEvent() {
  const data = getData();
  const player = data.players.find((entry) => entry.id === els.eventPlayerSelect.value);
  if (!player) return;

  const eventLabel = els.eventTypeSelect.value;
  const quantity = Math.max(1, Number(els.eventQuantity.value || 1));
  const rule = getRulesForPosition(player.position).find(([label]) => label === eventLabel);
  if (!rule) return;

  const delta = Number((rule[2] * quantity).toFixed(2));
  player.stats[rule[1]] = Number(((player.stats[rule[1]] || 0) + rule[2] * quantity).toFixed(2));

  data.history.push({
    timestamp: new Date().toLocaleString(),
    playerName: player.name,
    eventLabel,
    quantity,
    delta
  });

  saveStorageData(data);
  renderRankings();
  renderHistory();
  renderPlayerDashboard();
  renderAdminEditor();
}

function renderAuthState() {
  const user = getCurrentUser();

  if (!user) {
    els.loginStatusBox.innerHTML = `
      <p>You are not signed in yet.</p>
      <button id="loginFromProfile" class="primary-btn small-btn">Sign in</button>
    `;
    document.getElementById('loginFromProfile').onclick = openAuthModal;
    els.playerClaimCard.classList.add('hidden');
    return;
  }

  const player = getData().players.find((entry) => entry.name.toLowerCase() === user.playerName.toLowerCase()) || null;

  els.loginStatusBox.innerHTML = `
    <p>Signed in as <strong>${user.name}</strong> (${user.email})</p>
    <button id="logoutBtn" class="primary-btn small-btn">Log out</button>
  `;
  document.getElementById('logoutBtn').onclick = () => {
    setCurrentUser(null);
    renderAuthState();
    renderPlayerDashboard();
  };

  if (!player) {
    els.playerClaimCard.classList.remove('hidden');
    els.playerClaimCard.innerHTML = `
      <div class="claim-header">
        <strong>${user.name}</strong>
        <span class="player-tag">Unlinked</span>
      </div>
      <p>You are signed in, but no player was linked. Use the admin or choose a matching player name.</p>
    `;
    return;
  }

  player.claimedBy = user.email;
  saveStorageData(getData());
  els.playerClaimCard.classList.remove('hidden');
  els.playerClaimCard.innerHTML = `
    <div class="claim-header">
      <strong>${player.name}</strong>
      <span class="player-tag">Claimed</span>
    </div>
    <p>${player.club} • ${player.position}</p>
    <p>Total points: <strong>${calculatePlayerPoints(player).toFixed(2)}</strong></p>
  `;
}

function renderPlayerDashboard() {
  const user = getCurrentUser();
  const data = getData();
  const player = data.players.find((entry) => {
    if (!user) return false;
    return entry.claimedBy === user.email || entry.name.toLowerCase() === user.playerName?.toLowerCase();
  });

  if (!player) {
    els.playerStatsGrid.innerHTML = '<div class="stat-box"><span>No linked player</span></div>';
    return;
  }

  const stats = Object.entries(player.stats || {});
  els.playerStatsGrid.innerHTML = stats.map(([key, value]) => `
    <div class="stat-box"><span>${key}</span><strong>${value}</strong></div>
  `).join('');
}

function renderSuggestions() {
  const data = getData();
  const user = getCurrentUser();

  if (!user) {
    els.suggestionList.innerHTML = '<div class="suggestion-item"><strong>Sign in to send suggestions</strong></div>';
  } else {
    els.suggestionList.innerHTML = data.suggestions.filter((item) => item.user === user.email).map((item) => `
      <div class="suggestion-item">
        <strong>${item.title}</strong>
        <div>${item.message}</div>
        <small>${new Date(item.createdAt).toLocaleString()}</small>
      </div>
    `).join('') || '<div class="suggestion-item"><strong>No suggestions sent yet.</strong></div>';
  }

  els.publicSuggestions.innerHTML = data.suggestions.length ? data.suggestions.slice().reverse().map((item) => `
    <div class="public-suggestion">
      <strong>${item.title}</strong>
      <div>${item.message}</div>
      <small>${item.user} • ${new Date(item.createdAt).toLocaleString()}</small>
    </div>
  `).join('') : '<div class="public-suggestion"><strong>No suggestions yet.</strong></div>';
}

function handleSuggestionSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    alert('Sign in before sending a suggestion.');
    return;
  }

  const text = els.suggestionText.value.trim();
  if (!text) {
    alert('Write a suggestion or report first.');
    return;
  }

  const data = getData();
  data.suggestions.push({
    title: 'Player feedback',
    message: text,
    user: user.email,
    createdAt: new Date().toISOString()
  });

  saveStorageData(data);
  els.suggestionText.value = '';
  renderSuggestions();
}

function openAuthModal() {
  els.authModal.classList.remove('hidden');
}

function closeAuthModal() {
  els.authModal.classList.add('hidden');
}

function handleAuthSubmit() {
  const name = els.authName.value.trim();
  const email = els.authEmail.value.trim();
  const playerName = els.authPlayer.value.trim();

  if (!name || !email) {
    alert('Please enter both your name and email.');
    return;
  }

  const payload = {
    name,
    email,
    playerName: playerName || name,
    signedInAt: new Date().toISOString()
  };

  setCurrentUser(payload);
  const data = getData();
  const match = data.players.find((player) => player.name.toLowerCase() === payload.playerName.toLowerCase());
  if (match) {
    match.claimedBy = payload.email;
  }
  saveStorageData(data);
  closeAuthModal();
  renderAuthState();
  renderPlayerDashboard();
  renderAdminEditor();
  renderRankings();
}

function renderAdminEditor() {
  const data = getData();
  const adminUnlocked = els.adminEditor && !els.adminEditor.classList.contains('hidden');

  if (!adminUnlocked) return;

  els.adminPlayerSelect.innerHTML = data.players.map((player) => `
    <option value="${player.id}">${player.name} (${player.position})</option>
  `).join('');

  const selected = data.players[0];
  const player = data.players.find((entry) => entry.id === els.adminPlayerSelect.value) || selected;

  const statFields = Object.entries(player.stats || {}).map(([key, value]) => `
    <label>
      <span>${key}</span>
      <input name="${key}" value="${value}" />
    </label>
  `).join('');

  els.adminPlayerForm.innerHTML = `
    <label class="wide-field">
      <span>Name</span>
      <input name="name" value="${player.name}" />
    </label>
    <label>
      <span>Club</span>
      <input name="club" value="${player.club}" />
    </label>
    <label>
      <span>Position</span>
      <select name="position">
        ${['GK','DF','MF','AT'].map((pos) => `<option value="${pos}" ${player.position === pos ? 'selected' : ''}>${pos}</option>`).join('')}
      </select>
    </label>
    ${statFields}
  `;

  els.claimedList.innerHTML = data.players.filter((p) => p.claimedBy).map((player) => `
    <div class="claimed-item">
      <div>
        <strong>${player.name}</strong>
        <small>${player.club}</small>
      </div>
      <span class="claim-badge">${player.claimedBy}</span>
    </div>
  `).join('') || '<div class="claimed-item"><div><strong>No claimed players</strong></div></div>';
}

function saveAdminPlayer() {
  const data = getData();
  const selectedId = els.adminPlayerSelect.value;
  const player = data.players.find((entry) => entry.id === selectedId);
  if (!player) return;

  const form = els.adminPlayerForm.querySelectorAll('input, select');
  const values = {};
  form.forEach((field) => {
    values[field.name] = field.value;
  });

  player.name = values.name || player.name;
  player.club = values.club || player.club;
  player.position = values.position || player.position;

  const nextStats = {};
  Object.entries(player.stats || {}).forEach(([key]) => {
    nextStats[key] = Number(values[key]) || 0;
  });

  player.stats = nextStats;
  saveStorageData(data);
  syncPlayerPoints();
  renderRankings();
  renderSummary();
  renderPlayerDashboard();
  renderAdminEditor();
}

function unlockAdmin() {
  const entered = (els.adminEmailInput.value || '').trim().toLowerCase();
  if (entered === ADMIN_EMAIL.toLowerCase()) {
    els.adminEditor.classList.remove('hidden');
    renderAdminEditor();
    return;
  }

  alert('Access denied. Use your admin email.');
}

function setupEvents() {
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.add('hidden'));
      if (target === 'rankings') document.getElementById('rankingsPanel').classList.remove('hidden');
      if (target === 'events') document.getElementById('eventsPanel').classList.remove('hidden');
      if (target === 'profile') document.getElementById('profilePanel').classList.remove('hidden');
      if (target === 'suggestions') document.getElementById('suggestionsPanel').classList.remove('hidden');
      document.querySelectorAll('.nav-btn').forEach((item) => item.classList.toggle('active', item === button));
    });
  });

  document.getElementById('adminTabBtn').addEventListener('click', () => {
    els.adminPanel.classList.remove('hidden');
  });

  document.getElementById('closeAdminPanel').addEventListener('click', () => {
    els.adminPanel.classList.add('hidden');
  });

  document.getElementById('lockAdminBtn')?.addEventListener('click', () => {
    els.adminPanel.classList.add('hidden');
  });

  document.getElementById('loginBtn').addEventListener('click', openAuthModal);
  document.getElementById('loginFromProfile').addEventListener('click', openAuthModal);
  document.getElementById('closeAuthModal').addEventListener('click', closeAuthModal);
  document.getElementById('submitAuth').addEventListener('click', handleAuthSubmit);

  document.getElementById('unlockAdminBtn').addEventListener('click', unlockAdmin);
  document.getElementById('saveAdminPlayer').addEventListener('click', saveAdminPlayer);
  els.adminPlayerSelect.addEventListener('change', renderAdminEditor);

  els.searchInput.addEventListener('input', renderRankings);
  els.positionFilter.addEventListener('change', renderRankings);
  els.sortFilter.addEventListener('change', renderRankings);

  els.eventPlayerSelect.addEventListener('change', updateEventChoices);
  document.getElementById('applyEventBtn').addEventListener('click', applyEvent);

  els.suggestionForm.addEventListener('submit', handleSuggestionSubmit);
}

function initialize() {
  pickBackground();
  syncPlayerPoints();
  renderSummary();
  renderRankings();
  populateEventPlayerSelect();
  renderHistory();
  renderAuthState();
  renderPlayerDashboard();
  renderSuggestions();
  setupEvents();
  renderAdminEditor();
}

initialize();
console.log('PitchRank app initialized');
