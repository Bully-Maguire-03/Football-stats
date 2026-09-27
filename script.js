const STORAGE_KEY = 'pitchrank_pro_app_v1';
const ADMIN_EMAIL = 'mohammedakhsar2020@gmail.com';

const positionLabels = {
  GK: 'Goalkeepers',
  DF: 'Defenders',
  MF: 'Midfielders',
  AT: 'Attackers'
};

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

const adminUser = {
  name: 'Mohammed Akhsar',
  email: ADMIN_EMAIL,
  playerName: 'Mohammed Akhsar',
  provider: 'Google',
  isAdmin: true
};

const seedState = {
  players: defaultPlayers,
  history: [],
  suggestions: [],
  activeUser: adminUser
};

const els = {
  userBadge: document.getElementById('userBadge'),
  searchInput: document.getElementById('searchInput'),
  positionFilter: document.getElementById('positionFilter'),
  sortFilter: document.getElementById('sortFilter'),
  summaryTiles: document.getElementById('summaryTiles'),
  overallLeaderboard: document.getElementById('overallLeaderboard'),
  positionBoards: document.getElementById('positionBoards'),
  eventPlayerSelect: document.getElementById('eventPlayerSelect'),
  eventTypeSelect: document.getElementById('eventTypeSelect'),
  eventQuantity: document.getElementById('eventQuantity'),
  historyList: document.getElementById('historyList'),
  profileCard: document.getElementById('profileCard'),
  playerStatsGrid: document.getElementById('playerStatsGrid'),
  profileStatus: document.getElementById('profileStatus'),
  suggestionForm: document.getElementById('suggestionForm'),
  suggestionInput: document.getElementById('suggestionInput'),
  sentSuggestions: document.getElementById('sentSuggestions'),
  publicSuggestions: document.getElementById('publicSuggestions'),
  authModal: document.getElementById('authModal'),
  authNameInput: document.getElementById('authNameInput'),
  authEmailInput: document.getElementById('authEmailInput'),
  authPlayerInput: document.getElementById('authPlayerInput'),
  adminPanel: document.getElementById('adminPanel'),
  adminEmailInput: document.getElementById('adminEmailInput'),
  adminEditor: document.getElementById('adminEditor'),
  adminPlayerSelect: document.getElementById('adminPlayerSelect'),
  adminPlayerForm: document.getElementById('adminPlayerForm'),
  claimedPlayersList: document.getElementById('claimedPlayersList'),
  playerModal: document.getElementById('playerModal'),
  playerModalTitle: document.getElementById('playerModalTitle'),
  playerModalContent: document.getElementById('playerModalContent')
};

function getState() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  const state = stored || seedState;
  if (!state.activeUser) {
    state.activeUser = adminUser;
  }
  return state;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getRulesForPosition(position) {
  return [...(pointRules[position] || []), ...pointRules.ALL];
}

function calculatePlayerPoints(player) {
  const rules = getRulesForPosition(player.position);
  return Number(rules.reduce((total, rule) => {
    const [label, stat, factor] = rule;
    const statValue = Number(player.stats[stat] || 0);
    return total + statValue * factor;
  }, 0).toFixed(2));
}

function syncPlayerPoints() {
  const state = getState();
  state.players = state.players.map((player) => ({
    ...player,
    totalPoints: calculatePlayerPoints(player)
  }));
  saveState(state);
  return state;
}

function getCurrentUser() {
  return getState().activeUser;
}

function isAdminUser(user) {
  return Boolean(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
}

function applyAdminLogin() {
  const state = getState();
  state.activeUser = { ...adminUser };
  saveState(state);
  renderUserBadge();
}

function renderUserBadge() {
  const user = getCurrentUser();
  if (!user) {
    els.userBadge.innerHTML = '<span class="mini-avatar">⚽</span><span class="name">Guest</span>';
    return;
  }

  const adminText = isAdminUser(user) ? 'Admin' : 'User';
  els.userBadge.innerHTML = `
    <span class="mini-avatar">${user.name.charAt(0).toUpperCase()}</span>
    <div>
      <div class="name">${user.name}</div>
      <small>${adminText}</small>
    </div>
  `;
}

function renderSummary() {
  const state = getState();
  const counts = { GK: 0, DF: 0, MF: 0, AT: 0 };
  state.players.forEach((player) => {
    counts[player.position] += 1;
  });

  els.summaryTiles.innerHTML = ['GK', 'DF', 'MF', 'AT'].map((pos) => `
    <div class="summary-tile">
      <span>${positionLabels[pos]}</span>
      <strong>${counts[pos]}</strong>
    </div>
  `).join('');
}

function renderOverallLeaderboard() {
  const state = getState();
  const sorted = [...state.players].sort((a, b) => calculatePlayerPoints(b) - calculatePlayerPoints(a));

  els.overallLeaderboard.innerHTML = `
    <div class="overall-title">
      <h3>Overall leaderboard</h3>
      <span class="chip">Top performers</span>
    </div>
    <table class="overall-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Club</th>
          <th>Position</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.slice(0, 10).map((player, index) => `
          <tr>
            <td>${index + 1}</td>
            <td><button class="link-btn" data-player-id="${player.id}">${player.name}</button></td>
            <td>${player.club}</td>
            <td>${player.position}</td>
            <td>${calculatePlayerPoints(player).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.querySelectorAll('.link-btn').forEach((button) => {
    button.addEventListener('click', () => openPlayerModal(button.dataset.playerId));
  });
}

function getFilteredPlayers() {
  const query = (els.searchInput.value || '').trim().toLowerCase();
  const posFilter = els.positionFilter.value;
  const sortMode = els.sortFilter.value;
  const state = getState();

  let players = state.players.filter((player) => {
    const matchesQuery = !query || player.name.toLowerCase().includes(query);
    const matchesPos = !posFilter || player.position === posFilter;
    return matchesQuery && matchesPos;
  });

  players.sort((a, b) => {
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    if (sortMode === 'club') return a.club.localeCompare(b.club);
    return calculatePlayerPoints(b) - calculatePlayerPoints(a);
  });

  return players;
}

function renderPositionBoards() {
  const players = getFilteredPlayers();
  const filter = els.positionFilter.value;
  const positions = ['GK', 'DF', 'MF', 'AT'];

  els.positionBoards.innerHTML = positions.filter((pos) => !filter || pos === filter).map((pos) => {
    const posPlayers = players.filter((player) => player.position === pos);
    const cards = posPlayers.map((player, index) => {
      const clubClass = player.club.toLowerCase().includes('bar') ? 'barca' : 'madrid';
      const points = calculatePlayerPoints(player);
      const pills = Object.entries(player.stats || {}).slice(0, 4).map(([key, value]) => `
        <span class="stat-pill">${key}<strong>${value}</strong></span>
      `).join('');

      return `
        <article class="player-card ${index < 10 ? 'top-ten' : ''}" data-player-id="${player.id}">
          <div class="player-head">
            <span class="player-rank">#${index + 1}</span>
            <span class="player-points">${points.toFixed(2)} pts</span>
          </div>
          <div class="player-main">
            <span class="player-name">${player.name}</span>
            <span class="club-badge ${clubClass}">${player.club}</span>
          </div>
          <div class="stat-stack">${pills}</div>
        </article>
      `;
    }).join('') || '<div class="player-card"><p class="muted">No players found.</p></div>';

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

  document.querySelectorAll('.player-card').forEach((card) => {
    card.addEventListener('click', () => openPlayerModal(card.dataset.playerId));
  });
}

function populateEventPlayerSelect() {
  const state = getState();
  els.eventPlayerSelect.innerHTML = state.players.map((player) => `
    <option value="${player.id}">${player.name} (${player.position})</option>
  `).join('');
  updateEventChoices();
}

function updateEventChoices() {
  const state = getState();
  const selectedId = els.eventPlayerSelect.value;
  const player = state.players.find((entry) => entry.id === selectedId) || state.players[0];
  const rules = getRulesForPosition(player.position);
  els.eventTypeSelect.innerHTML = rules.map(([label]) => `<option value="${label}">${label}</option>`).join('');
}

function renderHistory() {
  const state = getState();
  if (!state.history.length) {
    els.historyList.innerHTML = '<div class="history-item"><div class="history-meta"><div class="history-name">No match events logged yet.</div><div class="history-detail">Use the event logger to record updates.</div></div></div>';
    return;
  }

  els.historyList.innerHTML = [...state.history].reverse().map((entry) => {
    const delta = Number(entry.delta || 0);
    const tone = delta >= 0 ? 'background: rgba(138,232,176,0.12); color: var(--green);' : 'background: rgba(255,125,115,0.12); color: var(--red);';
    return `
      <div class="history-item">
        <div class="history-meta">
          <div class="history-name">${entry.playerName}</div>
          <div class="history-detail">${entry.eventLabel} × ${entry.quantity} • ${entry.timestamp}</div>
        </div>
        <div class="history-delta" style="${tone}">${delta > 0 ? '+' : ''}${delta.toFixed(2)}</div>
      </div>
    `;
  }).join('');
}

function applyEvent() {
  const state = getState();
  const playerId = els.eventPlayerSelect.value;
  const player = state.players.find((entry) => entry.id === playerId);
  const eventLabel = els.eventTypeSelect.value;
  const quantity = Math.max(1, Number(els.eventQuantity.value || 1));

  if (!player) return;
  const rule = getRulesForPosition(player.position).find(([label]) => label === eventLabel);
  if (!rule) return;

  const delta = Number((rule[2] * quantity).toFixed(2));
  const statKey = rule[1];
  player.stats[statKey] = Number(((player.stats[statKey] || 0) + rule[2] * quantity).toFixed(2));

  state.history.push({
    playerName: player.name,
    eventLabel,
    quantity,
    delta,
    timestamp: new Date().toLocaleString()
  });

  saveState(state);
  renderRankings();
  renderHistory();
  renderProfile();
  renderAdminEditor();
}

function renderProfile() {
  const user = getCurrentUser();
  const state = getState();

  if (!user) {
    els.profileStatus.textContent = 'Signed out';
    els.profileStatus.className = 'status-pill neutral';
    els.profileCard.innerHTML = '<p>Sign in to view your linked player profile and suggestions.</p>';
    els.playerStatsGrid.innerHTML = '<div class="stat-box"><span>No player linked</span></div>';
    return;
  }

  const linkedPlayer = state.players.find((player) => {
    return player.claimedBy && player.claimedBy.toLowerCase() === user.email.toLowerCase();
  }) || state.players.find((player) => player.name.toLowerCase() === (user.playerName || '').toLowerCase()) || null;

  if (!linkedPlayer) {
    els.profileStatus.textContent = isAdminUser(user) ? 'Admin access' : 'Signed in';
    els.profileStatus.className = isAdminUser(user) ? 'status-pill green' : 'status-pill neutral';
    els.profileCard.innerHTML = `
      <div class="topline">
        <strong>${user.name}</strong>
        <span class="status-pill neutral">${user.provider || 'User'}</span>
      </div>
      <div class="meta">${user.email}</div>
      <p>You are signed in, but no linked player profile is assigned yet.</p>
    `;
    els.playerStatsGrid.innerHTML = '<div class="stat-box"><span>No stats available</span></div>';
    return;
  }

  linkedPlayer.claimedBy = user.email;
  state.activeUser = { ...user, playerName: linkedPlayer.name };
  saveState(state);

  els.profileStatus.textContent = isAdminUser(user) ? 'Admin access' : 'Player linked';
  els.profileStatus.className = isAdminUser(user) ? 'status-pill green' : 'status-pill neutral';

  const points = calculatePlayerPoints(linkedPlayer);
  els.profileCard.innerHTML = `
    <div class="topline">
      <strong>${linkedPlayer.name}</strong>
      <span class="status-pill green">${linkedPlayer.position}</span>
    </div>
    <div class="meta">${linkedPlayer.club} • ${user.email}</div>
    <p>Total points: <strong>${points.toFixed(2)}</strong></p>
  `;

  const stats = Object.entries(linkedPlayer.stats || {}).map(([key, value]) => `
    <div class="stat-box">
      <span>${key}</span>
      <strong>${value}</strong>
    </div>
  `).join('');
  els.playerStatsGrid.innerHTML = stats;
}

function renderSuggestions() {
  const state = getState();
  const user = getCurrentUser();

  if (!user) {
    els.sentSuggestions.innerHTML = '<div class="sent-item"><div class="message"><strong>Please sign in first.</strong></div></div>';
  } else {
    const mySuggestions = state.suggestions.filter((item) => item.userEmail.toLowerCase() === user.email.toLowerCase());
    els.sentSuggestions.innerHTML = mySuggestions.length ? mySuggestions.map((item) => `
      <div class="sent-item">
        <div class="message">
          <strong>${item.title}</strong>
          <div>${item.message}</div>
          <small>${new Date(item.createdAt).toLocaleString()}</small>
        </div>
      </div>
    `).join('') : '<div class="sent-item"><div class="message"><strong>No suggestions sent yet.</strong></div></div>';
  }

  els.publicSuggestions.innerHTML = state.suggestions.length ? state.suggestions.slice().reverse().map((item) => `
    <div class="public-suggestion">
      <div class="message">
        <strong>${item.title}</strong>
        <div>${item.message}</div>
        <small>${item.userEmail} • ${new Date(item.createdAt).toLocaleString()}</small>
      </div>
    </div>
  `).join('') : '<div class="public-suggestion"><div class="message"><strong>No suggestions yet.</strong></div></div>';
}

function handleSuggestionSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  const text = els.suggestionInput.value.trim();

  if (!user) {
    alert('Sign in to send a suggestion.');
    return;
  }

  if (!text) {
    alert('Write your suggestion first.');
    return;
  }

  const state = getState();
  state.suggestions.push({
    title: 'Player / app feedback',
    message: text,
    userEmail: user.email,
    createdAt: new Date().toISOString()
  });
  saveState(state);
  els.suggestionInput.value = '';
  renderSuggestions();
}

function renderAdminEditor() {
  const state = getState();
  const user = getCurrentUser();
  if (!isAdminUser(user) || !els.adminEditor || els.adminEditor.classList.contains('hidden')) return;

  els.adminPlayerSelect.innerHTML = state.players.map((player) => `
    <option value="${player.id}">${player.name} (${player.position})</option>
  `).join('');

  const selectedPlayer = state.players.find((player) => player.id === els.adminPlayerSelect.value) || state.players[0];

  const statsFields = Object.entries(selectedPlayer.stats || {}).map(([key, value]) => `
    <label>
      <span>${key}</span>
      <input name="${key}" value="${value}" />
    </label>
  `).join('');

  els.adminPlayerForm.innerHTML = `
    <label class="wide-field">
      <span>Name</span>
      <input name="name" value="${selectedPlayer.name}" />
    </label>
    <label>
      <span>Club</span>
      <input name="club" value="${selectedPlayer.club}" />
    </label>
    <label>
      <span>Position</span>
      <select name="position">
        ${['GK', 'DF', 'MF', 'AT'].map((pos) => `<option value="${pos}" ${selectedPlayer.position === pos ? 'selected' : ''}>${pos}</option>`).join('')}
      </select>
    </label>
    ${statsFields}
  `;

  els.claimedPlayersList.innerHTML = state.players.filter((player) => player.claimedBy).map((player) => `
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
  const state = getState();
  const playerId = els.adminPlayerSelect.value;
  const player = state.players.find((entry) => entry.id === playerId);
  if (!player) return;

  const fieldMap = {};
  els.adminPlayerForm.querySelectorAll('input, select').forEach((field) => {
    fieldMap[field.name] = field.value;
  });

  player.name = fieldMap.name || player.name;
  player.club = fieldMap.club || player.club;
  player.position = fieldMap.position || player.position;

  const nextStats = {};
  Object.keys(player.stats || {}).forEach((key) => {
    nextStats[key] = Number(fieldMap[key]) || 0;
  });
  player.stats = nextStats;

  saveState(state);
  syncPlayerPoints();
  renderSummary();
  renderOverallLeaderboard();
  renderPositionBoards();
  renderProfile();
  renderAdminEditor();
}

function openPlayerModal(playerId) {
  const state = getState();
  const player = state.players.find((entry) => entry.id === playerId);
  if (!player) return;

  const statBoxes = Object.entries(player.stats || {}).map(([key, value]) => `
    <div class="detail-box">
      <span>${key}</span>
      <strong>${value}</strong>
    </div>
  `).join('');

  els.playerModalTitle.textContent = `${player.name} • ${player.position}`;
  els.playerModalContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-box"><span>Club</span><strong>${player.club}</strong></div>
      <div class="detail-box"><span>Points</span><strong>${calculatePlayerPoints(player).toFixed(2)}</strong></div>
      <div class="detail-box"><span>Claimed by</span><strong>${player.claimedBy || 'Unclaimed'}</strong></div>
      <div class="detail-box"><span>Position</span><strong>${player.position}</strong></div>
    </div>
    <div class="detail-grid">${statBoxes}</div>
  `;

  els.playerModal.classList.remove('hidden');
}

function closePlayerModal() {
  els.playerModal.classList.add('hidden');
}

function openAuthModal() {
  els.authModal.classList.remove('hidden');
}

function closeAuthModal() {
  els.authModal.classList.add('hidden');
}

function signInWithGoogle() {
  const state = getState();
  const autoUser = { name: 'Mohammed Akhsar', email: ADMIN_EMAIL, playerName: 'Mohammed Akhsar', provider: 'Google', isAdmin: true };
  state.activeUser = autoUser;
  saveState(state);
  renderUserBadge();
  renderProfile();
  renderSuggestions();
  closeAuthModal();
}

function handleAuthSubmit() {
  const name = (els.authNameInput.value || '').trim();
  const email = (els.authEmailInput.value || '').trim();
  const playerName = (els.authPlayerInput.value || '').trim();

  if (!name || !email) {
    alert('Please enter a name and email.');
    return;
  }

  const state = getState();
  state.activeUser = {
    name,
    email,
    playerName: playerName || name,
    provider: 'Email',
    isAdmin: email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  };

  const linkedPlayer = state.players.find((player) => player.name.toLowerCase() === playerName.toLowerCase() || player.name.toLowerCase() === name.toLowerCase());
  if (linkedPlayer) {
    linkedPlayer.claimedBy = email;
  }

  saveState(state);
  closeAuthModal();
  renderUserBadge();
  renderProfile();
  renderSuggestions();
  renderAdminEditor();
}

function toggleAdminPanel() {
  els.adminPanel.classList.toggle('hidden');
  if (!els.adminPanel.classList.contains('hidden')) {
    renderAdminEditor();
  }
}

function unlockAdmin() {
  const adminEmail = (els.adminEmailInput.value || '').trim().toLowerCase();
  if (adminEmail !== ADMIN_EMAIL.toLowerCase()) {
    alert('Access denied. Use the admin email associated with this app.');
    return;
  }

  els.adminEditor.classList.remove('hidden');
  renderAdminEditor();
}

function bindEvents() {
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.panel;
      document.querySelectorAll('.panel-section').forEach((panel) => panel.classList.add('hidden'));
      document.getElementById(`${target}Panel`).classList.remove('hidden');
      document.querySelectorAll('.nav-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
    });
  });

  document.getElementById('adminToggleBtn').addEventListener('click', toggleAdminPanel);
  document.getElementById('closeAdminPanelBtn').addEventListener('click', () => els.adminPanel.classList.add('hidden'));
  document.getElementById('closeAuthModal').addEventListener('click', closeAuthModal);
  document.getElementById('submitAuthBtn').addEventListener('click', handleAuthSubmit);
  document.getElementById('googleSignInBtn').addEventListener('click', signInWithGoogle);
  document.getElementById('unlockAdminBtn').addEventListener('click', unlockAdmin);
  document.getElementById('saveAdminPlayerBtn').addEventListener('click', saveAdminPlayer);
  document.getElementById('closePlayerModal').addEventListener('click', closePlayerModal);
  document.getElementById('applyEventBtn').addEventListener('click', applyEvent);
  els.suggestionForm.addEventListener('submit', handleSuggestionSubmit);
  els.searchInput.addEventListener('input', renderPositionBoards);
  els.positionFilter.addEventListener('change', renderPositionBoards);
  els.sortFilter.addEventListener('change', renderPositionBoards);
  els.eventPlayerSelect.addEventListener('change', updateEventChoices);
  els.adminPlayerSelect.addEventListener('change', renderAdminEditor);

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      closeAuthModal();
      closePlayerModal();
    }
  });
}

function renderRankings() {
  renderSummary();
  renderOverallLeaderboard();
  renderPositionBoards();
}

function initialize() {
  const state = getState();
  if (!state.activeUser) {
    state.activeUser = adminUser;
    saveState(state);
  }

  syncPlayerPoints();
  renderUserBadge();
  renderRankings();
  populateEventPlayerSelect();
  renderHistory();
  renderProfile();
  renderSuggestions();
  bindEvents();
  renderAdminEditor();
  document.getElementById('adminEmailInput').value = ADMIN_EMAIL;
}

initialize();
