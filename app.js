const POSITION_DATA = {
  GK: { label: 'Goalkeeper', color: '#4475ff', note: 'Shot-stopping, command and courage between the posts.', metrics: [['Reflexes', 25], ['Handling', 20], ['Distribution', 10], ['Positioning', 25], ['Bravery', 20]] },
  CB: { label: 'Centre Back', color: '#ff765f', note: 'Defensive IQ and physical presence at the heart of the line.', metrics: [['Tackling', 25], ['Strength', 25], ['Aerial', 18], ['Pace', 12], ['Awareness', 20]] },
  LB: { label: 'Left Back', color: '#ff765f', note: 'Defensive reliability with the pace to own the flank.', metrics: [['Tackling', 22], ['Strength', 16], ['Aerial', 12], ['Pace', 25], ['Awareness', 25]] },
  RB: { label: 'Right Back', color: '#ff765f', note: 'Defensive reliability with the pace to own the flank.', metrics: [['Tackling', 22], ['Strength', 16], ['Aerial', 12], ['Pace', 25], ['Awareness', 25]] },
  CM: { label: 'Midfielder', color: '#c5902d', note: 'Tempo, technique and the engine to connect both boxes.', metrics: [['Passing', 23], ['Stamina', 20], ['Ball Control', 22], ['Work Rate', 20], ['Vision', 15]] },
  CAM: { label: 'Attacking Mid', color: '#c5902d', note: 'Creative control with a threat from every angle.', metrics: [['Passing', 20], ['Stamina', 15], ['Ball Control', 22], ['Work Rate', 13], ['Vision', 30]] },
  CDM: { label: 'Defensive Mid', color: '#c5902d', note: 'The metronome and shield in front of the defense.', metrics: [['Passing', 23], ['Stamina', 22], ['Ball Control', 18], ['Work Rate', 22], ['Vision', 15]] },
  LW: { label: 'Left Winger', color: '#b65c9c', note: 'Explosive movement and final product from wide areas.', metrics: [['Finishing', 20], ['Dribbling', 22], ['Pace', 25], ['Movement', 20], ['Shot Power', 13]] },
  RW: { label: 'Right Winger', color: '#b65c9c', note: 'Explosive movement and final product from wide areas.', metrics: [['Finishing', 20], ['Dribbling', 22], ['Pace', 25], ['Movement', 20], ['Shot Power', 13]] },
  CF: { label: 'Centre Forward', color: '#b65c9c', note: 'Efficiency, movement and composure in the final third.', metrics: [['Finishing', 30], ['Dribbling', 15], ['Pace', 25], ['Movement', 20], ['Shot Power', 10]] }
};
const POSITION_GROUP = { GK: 'defenders', CB: 'defenders', LB: 'defenders', RB: 'defenders', CM: 'midfielders', CAM: 'midfielders', CDM: 'midfielders', LW: 'attackers', RW: 'attackers', CF: 'attackers' };
const STAT_NAMES = ['shooting', 'passing', 'dribbling', 'defending', 'physical', 'pace'];
const STAT_LABELS = { shooting: 'Shooting', passing: 'Passing', dribbling: 'Dribbling', defending: 'Defending', physical: 'Physical', pace: 'Pace' };
const WEIGHTS = { attackers: { shooting: .35, pace: .25, dribbling: .20, passing: .10, physical: .10 }, midfielders: { passing: .35, dribbling: .25, physical: .15, shooting: .15, defending: .10 }, defenders: { defending: .45, physical: .25, pace: .15, passing: .10, shooting: .05 } };
const POSITION_OVERALL_WEIGHTS = {
  GK: { defending: .30, physical: .20, pace: .15, passing: .15, vision: .10, control: .10 },
  CB: { defending: .35, physical: .25, pace: .15, passing: .10, control: .10, vision: .05 },
  LB: { defending: .35, physical: .25, pace: .15, passing: .10, control: .10, vision: .05 },
  RB: { defending: .35, physical: .25, pace: .15, passing: .10, control: .10, vision: .05 },
  CM: { passing: .30, vision: .25, control: .20, defending: .10, physical: .10, pace: .05 },
  CAM: { passing: .30, vision: .25, control: .20, defending: .10, physical: .10, pace: .05 },
  CDM: { passing: .30, vision: .25, control: .20, defending: .10, physical: .10, pace: .05 },
  LW: { shooting: .30, pace: .25, control: .20, passing: .10, physical: .10, defending: .05 },
  RW: { shooting: .30, pace: .25, control: .20, passing: .10, physical: .10, defending: .05 },
  CF: { shooting: .35, pace: .25, control: .20, passing: .10, physical: .05, defending: .05 }
};
const MATCH_EVENTS = { goal: ['Goals', 'shooting', .30], shotOnTarget: ['Shots on target', 'shooting', .10], shotOffTarget: ['Shots off-target', 'shooting', -.05], bigChanceMissed: ['Big chances missed', 'shooting', -.25], assist: ['Assists', 'passing', .25], keyPass: ['Chances created', 'passing', .15], successfulDribble: ['Successful dribbles', 'dribbling', .15], dispossessed: ['Dispossessed', 'dribbling', -.10], tackle: ['Tackles', 'defending', .20], interception: ['Interceptions', 'defending', .15], recovery: ['Ball recoveries', 'physical', .08], foul: ['Fouls committed', 'physical', -.05], redCard: ['Red cards', 'physical', -.50] };
const POSITION_DELTAS = {
  attackers: { goal: .36, shotOnTarget: .12, shotOffTarget: -.05, bigChanceMissed: -.25, assist: .25, keyPass: .15, successfulDribble: .15, dispossessed: -.05, tackle: .10, interception: .07, recovery: .08, foul: -.05, redCard: -.50 },
  midfielders: { goal: .30, shotOnTarget: .10, shotOffTarget: -.05, bigChanceMissed: -.25, assist: .32, keyPass: .20, successfulDribble: .15, dispossessed: -.12, tackle: .20, interception: .15, recovery: .08, foul: -.05, redCard: -.50 },
  defenders: { goal: .30, shotOnTarget: .10, shotOffTarget: -.02, bigChanceMissed: -.12, assist: .25, keyPass: .15, successfulDribble: .15, dispossessed: -.10, tackle: .30, interception: .22, recovery: .08, foul: -.05, redCard: -.50 }
};
const MATCH_STAT_KEYS = Object.keys(MATCH_EVENTS);
const STARTER = [
  { id: 1, name: 'Zishan', position: 'GK', points: 3, values: [72, 70, 68, 74, 71] },
  { id: 2, name: 'Advittyiya', position: 'CB', points: 5, values: [74, 72, 70, 67, 73] },
  { id: 3, name: 'Shahbaz', position: 'CB', points: 6, values: [78, 76, 74, 71, 77] },
  { id: 4, name: 'Pranav.R', position: 'LB', points: 5, values: [74, 71, 69, 78, 75] },
  { id: 5, name: 'Ihsan', position: 'CAM', points: 8, values: [78, 75, 80, 76, 83] },
  { id: 6, name: 'Rushdi', position: 'CM', points: 15, values: [87, 86, 84, 89, 82] },
  { id: 7, name: 'Vaibhav', position: 'CF', points: 12, values: [85, 78, 82, 83, 80] },
  { id: 8, name: 'Suhail', position: 'LW', points: 20, values: [90, 92, 94, 89, 84] },
  { id: 9, name: 'M.Ali', position: 'RW', points: 14, values: [86, 88, 91, 85, 82] },
  { id: 10, name: 'Naresh', position: 'LB', points: 5, values: [73, 70, 68, 76, 74] },
  { id: 11, name: 'Ibrahim', position: 'RB', points: 5, values: [74, 71, 69, 77, 75] },
  { id: 12, name: 'Isam', position: 'GK', points: 6, values: [79, 77, 73, 80, 76] },
  { id: 13, name: 'Ishan', position: 'CDM', points: 4, values: [72, 75, 74, 78, 70] },
  { id: 14, name: 'Pranav.S', position: 'RB', points: 6, values: [78, 74, 72, 80, 77] },
  { id: 15, name: 'M.Akhsar', position: 'CM', points: 10, values: [82, 80, 81, 84, 79] },
  { id: 16, name: 'Zayan.sy', position: 'LW', points: 5, values: [76, 80, 84, 78, 73] },
  { id: 17, name: 'Sayed', position: 'CF', points: 5, values: [75, 71, 74, 76, 72] },
  { id: 18, name: 'Dhruval', position: 'RW', points: 7, values: [80, 84, 87, 81, 76] },
  { id: 19, name: 'Parthiv', position: 'LB', points: 3, values: [69, 67, 65, 72, 70] },
  { id: 20, name: 'Mishal', position: 'CAM', points: 4, values: [73, 70, 76, 72, 78] },
  { id: 21, name: 'Abhinav', position: 'CM', points: 3, values: [70, 72, 71, 74, 68] },
  { id: 22, name: 'Khush', position: 'CB', points: 6, values: [77, 75, 73, 69, 76] }
];
const $ = (selector) => document.querySelector(selector);
const ROSTER_KEY = 'pitchboard-players-v2';
const CLAIMS_KEY = 'pitchboard-claims-v1';
function normalizeFcCard(card) {
  const safeStats = card?.stats || {};
  const numberOrNull = value => value === null || value === undefined || String(value).trim() === ''
    ? null
    : Number.isFinite(Number(value)) ? Number(value) : null;
  return {
    overall: numberOrNull(card?.overall),
    trait: String(card?.trait || '').trim(),
    stats: {
      passing: numberOrNull(safeStats.passing),
      vision: numberOrNull(safeStats.vision),
      control: numberOrNull(safeStats.control),
      defending: numberOrNull(safeStats.defending),
      pace: numberOrNull(safeStats.pace),
      physical: numberOrNull(safeStats.physical),
    }
  };
}
function withStats(player) { return { ...player, stats: player.stats || { shooting: player.values[0], passing: player.values[1], dribbling: player.values[2], defending: player.values[3], physical: player.values[4], pace: Math.round(player.values.reduce((sum, value) => sum + value, 0) / player.values.length) }, matchStats: player.matchStats || Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0])), fcCard: normalizeFcCard(player.fcCard) }; }
let players = (JSON.parse(localStorage.getItem(ROSTER_KEY) || 'null') || STARTER).map(withStats);
let claims = JSON.parse(localStorage.getItem(CLAIMS_KEY) || 'null') || [];
let editingId = null;
const ADMIN_EMAIL = 'mohammedakhsar2020@gmail.com';
const AUTH_KEY = 'pitchboard-auth-v1';
const PROFILE_KEY = 'pitchboard-user-profile-v1';
let role = sessionStorage.getItem('pitchboard-role') || 'admin';
let currentUser = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null') || { email: ADMIN_EMAIL, name: 'Mohammed Akhsar', role: 'admin', playerId: null, avatar: '' };
const positionSelect = $('#playerPosition');
const filterPosition = $('#filterPosition');

function normalizeEmail(value) { return String(value || '').trim().toLowerCase(); }
function persistAuth(authData) { currentUser = authData; localStorage.setItem(AUTH_KEY, JSON.stringify(authData)); sessionStorage.setItem('pitchboard-role', authData.role); role = authData.role; }
function applyAuthState(authData = currentUser) {
  const nextRole = authData?.role || 'admin';
  role = nextRole;
  sessionStorage.setItem('pitchboard-role', nextRole);
  $('#authStatus').textContent = nextRole === 'admin' ? 'SIGNED IN / ADMIN' : `SIGNED IN / ${String(authData?.name || 'PLAYER').toUpperCase()}`;
  $('#authButton').textContent = nextRole === 'admin' ? 'Preview player view' : 'Return to admin';
  $('#adminConsole').classList.toggle('hidden', nextRole !== 'admin');
  $('#editorPanel').classList.toggle('hidden', nextRole !== 'admin');
  $('#roster').classList.toggle('viewer-mode', nextRole !== 'admin');
  $('#claimPanel').classList.toggle('hidden', nextRole === 'admin');
  $('#claimsPanel').classList.toggle('hidden', nextRole !== 'admin');
  $('#feedbackInbox').classList.toggle('hidden', nextRole !== 'admin');
  $('#positionRankingsPanel').classList.toggle('hidden', nextRole === 'admin');
  if (nextRole === 'admin' && authData?.email === ADMIN_EMAIL) {
    $('#claimFeedback').textContent = `Admin access granted to ${authData.email}.`;
  }
}
function setGoogleAvatarPreview(file) {
  const preview = $('#googleAvatarPreview');
  if (!file) {
    preview.innerHTML = '<span class="avatar-silhouette">👤</span>';
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    preview.innerHTML = `<img src="${event.target.result}" alt="Selected avatar preview" />`;
  };
  reader.readAsDataURL(file);
}
function populateGooglePlayerOptions() {
  const select = $('#googlePlayerSelect');
  if (!select) return;
  select.innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join('');
}
function refreshPlayerSelectors() {
  const matchPlayer = $('#matchPlayer');
  const selectedId = matchPlayer.value;
  matchPlayer.innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join('');
  if (players.some(player => String(player.id) === selectedId)) matchPlayer.value = selectedId;
  const selectedPlayer = players.find(player => String(player.id) === matchPlayer.value);
  if (selectedPlayer) {
    renderMatchStats(selectedPlayer.matchStats);
    populateEventOptions(selectedPlayer.position);
  }
  populateGooglePlayerOptions();
}
function openGoogleModal() {
  const modal = $('#googleModal');
  const emailInput = $('#googleEmailInput');
  if (emailInput) emailInput.value = currentUser?.email || ADMIN_EMAIL;
  populateGooglePlayerOptions();
  modal.classList.remove('hidden');
}
function closeGoogleModal() {
  $('#googleModal').classList.add('hidden');
  $('#googleModalMessage').textContent = 'Use the registered admin email to unlock admin controls.';
  $('#googleAvatarInput').value = '';
  setGoogleAvatarPreview(null);
}
function getOverallStatValue(player, statKey) {
  const cardStats = player.fcCard?.stats || {};
  const fallbackStats = player.stats || {};
  const statValue = {
    passing: cardStats.passing ?? fallbackStats.passing ?? 0,
    vision: cardStats.vision ?? fallbackStats.vision ?? fallbackStats.passing ?? 0,
    control: cardStats.control ?? fallbackStats.control ?? fallbackStats.dribbling ?? 0,
    defending: cardStats.defending ?? fallbackStats.defending ?? 0,
    physical: cardStats.physical ?? fallbackStats.physical ?? 0,
    pace: cardStats.pace ?? fallbackStats.pace ?? 0,
    shooting: cardStats.shooting ?? fallbackStats.shooting ?? 0
  }[statKey];
  return Number.isFinite(statValue) ? statValue : 0;
}
function calculateOverall(player) {
  const weights = POSITION_OVERALL_WEIGHTS[player.position] || WEIGHTS[POSITION_GROUP[player.position]] || { shooting: 0.2, passing: 0.2, dribbling: 0.2, defending: 0.2, physical: 0.1, pace: 0.1 };
  const total = Object.entries(weights).reduce((sum, [key, weight]) => {
    const statKey = key === 'vision' ? 'vision' : key === 'control' ? 'control' : key;
    return sum + (getOverallStatValue(player, statKey) * weight);
  }, 0);
  return Math.max(45, Math.min(99, Math.round(total)));
}
function buildPreviewCard(player) {
  const avatar = getStoredProfile(player.id)?.avatar || '';
  const cardStats = player.fcCard?.stats || {};
  const overall = calculateOverall(player);
  const statMap = { PASS: cardStats.passing ?? player.stats?.passing ?? 0, VIS: cardStats.vision ?? player.stats?.vision ?? player.stats?.passing ?? 0, CON: cardStats.control ?? player.stats?.control ?? player.stats?.dribbling ?? 0, DEF: cardStats.defending ?? player.stats?.defending ?? 0, PAC: cardStats.pace ?? player.stats?.pace ?? 0, PHY: cardStats.physical ?? player.stats?.physical ?? 0 };
  const formDelta = Math.max(-4, Math.min(9, Math.round(impactScore(player) / 4)));
  const formText = `${formDelta >= 0 ? '+' : ''}${formDelta}`;
  const trait = player.fcCard?.trait || positionTrait(player.position);
  const value = `$${((player.points || 5) * 4.2).toFixed(1)}M`;
  return `
    <div class="fc-card-preview">
      <div class="fc-card-header"><span>⚡ IN-FORM</span></div>
      <div class="fc-card-toprow">
        <div class="fc-card-ovr"><span>OVR</span><strong>${overall}</strong></div>
        <div class="fc-card-pos"><span>POS</span><strong>${player.position}</strong></div>
      </div>
      <div class="fc-card-body">
        <div class="fc-card-figure">
          <div class="fc-silhouette ${avatar ? 'has-image' : ''}" style="${avatar ? `background-image:url('${avatar}')` : ''}"></div>
        </div>
        <div class="fc-card-meta">
          <div class="fc-card-name">${player.name.toUpperCase()}</div>
          <div class="fc-card-value">VALUE: ${value}</div>
          <div class="fc-card-form">FORM: ${formDelta >= 0 ? '⬆️' : '⬇️'} (${formText})</div>
        </div>
      </div>
      <div class="fc-card-stats">
        <span>${Math.round(statMap.PASS)} PAS</span>
        <span>${Math.round(statMap.VIS)} VIS</span>
        <span>${Math.round(statMap.CON)} CON</span>
        <span>${Math.round(statMap.DEF)} DEF</span>
        <span>${Math.round(statMap.PAC)} PAC</span>
        <span>${Math.round(statMap.PHY)} PHY</span>
      </div>
      <div class="fc-card-traits">🏆 TRAITS: [${trait}]</div>
    </div>
  `;
}
function positionTrait(position) {
  const traitMap = { GK: 'Shot-stopper', CB: 'Leader', LB: 'Runner', RB: 'Runner', CM: 'Playmaker', CAM: 'Creator', CDM: 'Shield', LW: 'Winger', RW: 'Winger', CF: 'Finisher' };
  return traitMap[position] || 'Leader';
}
function getStoredProfile(playerId = null) {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
  if (playerId !== null && profiles[playerId]) return profiles[playerId];
  return currentUser?.avatar ? { avatar: currentUser.avatar } : null;
}
function saveProfileData(profile) {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
  if (profile.playerId) profiles[profile.playerId] = { avatar: profile.avatar, name: profile.name, email: profile.email };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
}

function applySavedAuth() {
  const saved = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  if (saved) {
    currentUser = saved;
    applyAuthState(saved);
  } else {
    currentUser = { email: ADMIN_EMAIL, name: 'Mohammed Akhsar', role: 'admin', playerId: null, avatar: '' };
    persistAuth(currentUser);
    applyAuthState(currentUser);
  }
}
Object.entries(POSITION_DATA).forEach(([key, data]) => {
  positionSelect.insertAdjacentHTML('beforeend', `<option value="${key}">${key} / ${data.label}</option>`);
  filterPosition.insertAdjacentHTML('beforeend', `<option value="${key}">${key}</option>`);
});
function positionDelta(player, eventKey) { return POSITION_DELTAS[POSITION_GROUP[player.position]][eventKey]; }
function impactScore(player) { return Object.entries(player.matchStats).reduce((sum, [eventKey, count]) => sum + count * positionDelta(player, eventKey), 0); }
function initials(name) { return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); }
function renderMetrics() {
  const group = POSITION_GROUP[positionSelect.value];
  $('#positionNote').textContent = `Position multipliers are active for ${group}. Edit the match totals below.`;
  $('#metricList').innerHTML = '<p class="console-copy">This board records match actions, not subjective pace, dribbling, or overall ratings.</p>';
  $('#weightSummary').textContent = Object.entries(POSITION_DELTAS[group]).map(([eventKey, delta]) => `${MATCH_EVENTS[eventKey][0]} ${delta > 0 ? '+' : ''}${delta.toFixed(2)}`).join(' / ');
  $('#liveOverall').textContent = '--';
}
function renderMatchStats(stats = Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0]))) { $('#matchStatsList').innerHTML = MATCH_STAT_KEYS.map(key => `<label class="compact-field">${MATCH_EVENTS[key][0]}<input type="number" min="0" value="${stats[key] || 0}" data-match-stat="${key}" /></label>`).join(''); }
function renderDeltaTable() { $('#deltaTableBody').innerHTML = MATCH_STAT_KEYS.map(eventKey => { const [label] = MATCH_EVENTS[eventKey]; return `<tr><td>${label}</td><td class="${POSITION_DELTAS.attackers[eventKey] >= 0 ? 'positive' : 'negative'}">${POSITION_DELTAS.attackers[eventKey] > 0 ? '+' : ''}${POSITION_DELTAS.attackers[eventKey].toFixed(2)}</td><td class="${POSITION_DELTAS.midfielders[eventKey] >= 0 ? 'positive' : 'negative'}">${POSITION_DELTAS.midfielders[eventKey] > 0 ? '+' : ''}${POSITION_DELTAS.midfielders[eventKey].toFixed(2)}</td><td class="${POSITION_DELTAS.defenders[eventKey] >= 0 ? 'positive' : 'negative'}">${POSITION_DELTAS.defenders[eventKey] > 0 ? '+' : ''}${POSITION_DELTAS.defenders[eventKey].toFixed(2)}</td></tr>`; }).join(''); }
function populateEventOptions(position) { const group = POSITION_GROUP[position]; $('#matchEvent').innerHTML = Object.entries(MATCH_EVENTS).map(([key, [label]]) => { const delta = POSITION_DELTAS[group][key]; return `<option value="${key}">${label} (${delta > 0 ? '+' : ''}${delta.toFixed(2)} ${group})</option>`; }).join(''); }
function currentMatchStats() { return Object.fromEntries([...document.querySelectorAll('#matchStatsList input')].map(input => [input.dataset.matchStat, Number(input.value)])); }
let expandedPlayerId = null;
function renderBoard() {
  const search = $('#searchInput').value.toLowerCase(); const filter = filterPosition.value;
  const visible = players.filter(player => player.name.toLowerCase().includes(search) && (filter === 'ALL' || player.position === filter)).sort((a, b) => impactScore(b) - impactScore(a));
  const featuredIds = new Set([...players].sort((a, b) => impactScore(b) - impactScore(a)).slice(0, 10).map(player => player.id));
  $('#leaderboard').innerHTML = visible.map((player, index) => {
    const data = POSITION_DATA[player.position];
    const bars = Object.keys(MATCH_EVENTS).slice(0, 6).map(eventKey => `<i style="height:${Math.max(4, Math.min(30, player.matchStats[eventKey] * 2))}px;background:${data.color}"></i>`).join('');
    const actions = role === 'admin' ? `<button class="row-action" title="Edit player" data-action="edit" data-id="${player.id}">✎</button><button class="row-action" title="Delete player" data-action="delete" data-id="${player.id}">×</button>` : '<span class="player-lock">view only</span>';
    const totalLine = `Goals ${player.matchStats.goal || 0} / Assists ${player.matchStats.assist || 0} / Chances ${player.matchStats.keyPass || 0}`;
    const avatar = getStoredProfile(player.id)?.avatar || '';
    const card = buildPreviewCard(player);
    const isOpen = expandedPlayerId === player.id;
    const coreStats = STAT_NAMES.map(key => `<div class="detail-stat"><span>${STAT_LABELS[key]}</span><strong>${Math.round(player.stats?.[key] ?? 0)}</strong></div>`).join('');
    const fcStats = Object.entries({ Overall: calculateOverall(player), Passing: player.fcCard?.stats?.passing ?? player.stats?.passing ?? 0, Vision: player.fcCard?.stats?.vision ?? player.stats?.vision ?? player.stats?.passing ?? 0, Control: player.fcCard?.stats?.control ?? player.stats?.control ?? player.stats?.dribbling ?? 0, Defending: player.fcCard?.stats?.defending ?? player.stats?.defending ?? 0, Pace: player.fcCard?.stats?.pace ?? player.stats?.pace ?? 0, Physical: player.fcCard?.stats?.physical ?? player.stats?.physical ?? 0 }).map(([label, value]) => `<div class="detail-stat"><span>${label}</span><strong>${Math.round(value)}</strong></div>`).join('');
    const matchStats = MATCH_STAT_KEYS.map(key => `<div class="detail-stat"><span>${MATCH_EVENTS[key][0]}</span><strong>${player.matchStats[key] || 0}</strong></div>`).join('');
    const details = isOpen ? `<section class="player-detail-panel" id="player-details-${player.id}" aria-label="${player.name} full stats"><div class="detail-heading"><span class="detail-kicker">PLAYER FILE / ${player.position}</span><span>${data.label.toUpperCase()}</span></div><div class="detail-columns"><div><h3>Player ratings</h3><div class="detail-stat-grid">${coreStats}</div></div><div><h3>FC card ratings</h3><div class="detail-stat-grid">${fcStats}</div></div><div class="detail-match-column"><h3>Match totals</h3><div class="detail-stat-grid">${matchStats}</div></div></div></section>` : '';
    return `<article class="player-row${featuredIds.has(player.id) ? ' featured' : ''}${isOpen ? ' is-open' : ''}"><span class="player-rank">${String(index + 1).padStart(2, '0')}</span><div class="player-info"><span class="avatar" style="background:${data.color};${avatar ? `background-image:url('${avatar}');background-size:cover;background-position:center;` : ''}">${avatar ? '' : initials(player.name)}</span><div><button type="button" class="player-name-button" data-player-toggle="${player.id}" aria-expanded="${isOpen ? 'true' : 'false'}" aria-controls="player-details-${player.id}">${player.name}</button><div class="player-position">${data.label}</div><div class="player-totals">${totalLine}</div></div></div><span class="tag">${player.position}</span><div class="mini-bars" aria-label="${player.name} match profile">${bars}</div><strong class="rating"><small>IMPACT</small>${impactScore(player).toFixed(2)}</strong><div class="row-actions">${actions}</div>${card}${details}</article>`;
  }).join('');
  renderPositionRankings();
  $('#emptyState').classList.toggle('hidden', visible.length > 0); $('#heroCount').textContent = String(players.length).padStart(2, '0');
  $('#lastUpdated').textContent = `Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
function renderPositionRankings() {
  $('#positionRankings').innerHTML = Object.entries(POSITION_DATA).map(([position, data]) => {
    const rankedPlayers = players.filter(player => player.position === position).sort((a, b) => impactScore(b) - impactScore(a));
    if (!rankedPlayers.length) return '';
    const rows = rankedPlayers.map((player, index) => `<div class="position-rank-row"><span>${String(index + 1).padStart(2, '0')}</span><strong>${player.name}</strong><b>${impactScore(player).toFixed(2)}</b></div>`).join('');
    return `<section class="position-rank-group"><header><strong>${position}</strong><span>${data.label}</span></header>${rows}</section>`;
  }).join('');
}
function renderTopTen() { const topTen = [...players].sort((a, b) => impactScore(b) - impactScore(a)).slice(0, 10); $('#topTenGrid').innerHTML = topTen.map((player, index) => `<div class="top-ten-card"><span class="top-ten-rank">${String(index + 1).padStart(2, '0')}</span><div><strong>${player.name}</strong><span>${player.position} / ${POSITION_DATA[player.position].label}</span></div><b>${impactScore(player).toFixed(2)}<small> impact</small></b></div>`).join(''); }
function renderMethod() { $('#methodWeights').innerHTML = [36, 32, 30].map(weight => `<i style="width:${weight}%"></i>`).join(''); $('#roleList').innerHTML = [['CF / LW / RW', 'Attackers', '+0.36 goal'], ['CM / CAM / CDM', 'Midfielders', '+0.32 assist'], ['CB / LB / RB / GK', 'Defenders', '+0.30 tackle']].map(([code, name, value]) => `<div class="role-item"><strong>${code}</strong><div class="role-track"><span style="width:${parseFloat(value.slice(1)) * 100}%"></span></div><em>${name} / ${value}</em></div>`).join(''); }
function clearFcCardForm() {
  $('#fcOverall').value = '';
  $('#fcTrait').value = '';
  $('#fcPassing').value = '';
  $('#fcVision').value = '';
  $('#fcControl').value = '';
  $('#fcDefending').value = '';
  $('#fcPace').value = '';
  $('#fcPhysical').value = '';
}
function resetForm() { editingId = null; $('#formTitle').textContent = 'Edit player stats'; $('#submitLabel').textContent = 'Save stats'; $('#cancelEdit').classList.add('hidden'); $('#playerForm').reset(); clearFcCardForm(); positionSelect.value = 'CF'; renderMetrics(); renderMatchStats(); }
positionSelect.addEventListener('change', () => renderMetrics());
$('#playerForm').addEventListener('submit', event => {
  event.preventDefault();
  if (role !== 'admin') return;
  const existing = players.find(item => String(item.id) === String(editingId));
  const cardValue = id => {
    const value = $('#'+id).value.trim();
    return value === '' ? null : Number(value);
  };
  const fcCard = normalizeFcCard({
    overall: cardValue('fcOverall'),
    trait: $('#fcTrait').value.trim(),
    stats: {
      passing: cardValue('fcPassing'), vision: cardValue('fcVision'), control: cardValue('fcControl'),
      defending: cardValue('fcDefending'), pace: cardValue('fcPace'), physical: cardValue('fcPhysical')
    }
  });
  const playerId = existing?.id ?? Date.now();
  const player = {
    ...existing,
    id: playerId,
    name: $('#playerName').value.trim(),
    position: positionSelect.value,
    stats: existing?.stats || {},
    matchStats: existing ? currentMatchStats() : Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0])),
    fcCard
  };
  const nextPlayers = existing
    ? players.map(item => String(item.id) === String(existing.id) ? player : item)
    : [...players, player];
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(nextPlayers));
  } catch (error) {
    $('#playerSaveFeedback').textContent = 'Save failed. Browser storage may be full or unavailable.';
    return;
  }
  players = nextPlayers;
  if (currentUser?.playerId !== null && String(currentUser?.playerId) === String(playerId)) {
    currentUser = { ...currentUser, name: player.name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    applyAuthState(currentUser);
  }
  resetForm();
  refreshPlayerSelectors();
  renderBoard();
  $('#playerSaveFeedback').textContent = existing
    ? `${player.name} updated and saved on this device.`
    : `${player.name} added and saved on this device.`;
});
$('#cancelEdit').addEventListener('click', resetForm);
$('#searchInput').addEventListener('input', renderBoard); filterPosition.addEventListener('change', renderBoard);
$('#matchForm').addEventListener('submit', event => { event.preventDefault(); if (role !== 'admin') return; const player = players.find(item => item.id === Number($('#matchPlayer').value)); const eventKey = $('#matchEvent').value; const [label, stat] = MATCH_EVENTS[eventKey]; const count = Number($('#matchCount').value); player.matchStats[eventKey] = (player.matchStats[eventKey] || 0) + count; localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); renderBoard(); renderMatchStats(player.matchStats); $('#matchFeedback').textContent = `${player.name}: ${label} x${count} at ${positionDelta(player, eventKey) > 0 ? '+' : ''}${positionDelta(player, eventKey).toFixed(2)} each.`; });
$('#leaderboard').addEventListener('click', event => {
  const playerToggle = event.target.closest('[data-player-toggle]');
  if (playerToggle) {
    const nextId = Number(playerToggle.dataset.playerToggle);
    expandedPlayerId = expandedPlayerId === nextId ? null : nextId;
    renderBoard();
    return;
  }
  const button = event.target.closest('[data-action]');
  if (!button || role !== 'admin') return;
  const id = Number(button.dataset.id);
  const player = players.find(item => item.id === id);
  if (button.dataset.action === 'delete') {
    players = players.filter(item => item.id !== id);
    localStorage.setItem(ROSTER_KEY, JSON.stringify(players));
    renderBoard();
  } else {
    editingId = id;
    $('#formTitle').textContent = 'Edit player and FC card';
    $('#submitLabel').textContent = 'Save player and card';
    $('#cancelEdit').classList.remove('hidden');
    $('#playerName').value = player.name;
    positionSelect.value = player.position;
    $('#fcOverall').value = player.fcCard?.overall ?? '';
    $('#fcTrait').value = player.fcCard?.trait || '';
    $('#fcPassing').value = player.fcCard?.stats?.passing ?? '';
    $('#fcVision').value = player.fcCard?.stats?.vision ?? '';
    $('#fcControl').value = player.fcCard?.stats?.control ?? '';
    $('#fcDefending').value = player.fcCard?.stats?.defending ?? '';
    $('#fcPace').value = player.fcCard?.stats?.pace ?? '';
    $('#fcPhysical').value = player.fcCard?.stats?.physical ?? '';
    renderMetrics(player.stats);
    renderMatchStats(player.matchStats);
    populateEventOptions(player.position);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
$('#matchPlayer').addEventListener('change', () => { const player = players.find(item => item.id === Number($('#matchPlayer').value)); if (player) { renderMatchStats(player.matchStats); populateEventOptions(player.position); } });
$('#resetPlayerStats').addEventListener('click', () => { if (role !== 'admin') return; const player = players.find(item => item.id === Number($('#matchPlayer').value)); if (!player) return; player.matchStats = Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0])); localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); renderMatchStats(player.matchStats); renderBoard(); $('#matchFeedback').textContent = `${player.name}: match stats reset.`; });
$('#resetData').addEventListener('click', () => { players = STARTER.map(withStats); localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); resetForm(); renderBoard(); $('#matchPlayer').innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join(''); });
$('#authButton').addEventListener('click', () => { role = role === 'admin' ? 'player' : 'admin'; applyAuthState({ ...currentUser, role }); renderBoard(); });
$('#claimForm').addEventListener('submit', event => { event.preventDefault(); const request = { id: Date.now(), name: $('#claimName').value.trim(), position: $('#claimPosition').value, email: $('#claimEmail').value.trim() }; const requests = JSON.parse(localStorage.getItem('pitchboard-claims-v1') || '[]'); requests.push(request); localStorage.setItem('pitchboard-claims-v1', JSON.stringify(requests)); $('#claimForm').reset(); $('#claimFeedback').textContent = 'Request sent. Your admin must approve access.'; });
$('#topGoogleButton').addEventListener('click', openGoogleModal);
$('#closeGoogleModal').addEventListener('click', closeGoogleModal);
$('#googleButton').addEventListener('click', openGoogleModal);
$('#googleAvatarInput').addEventListener('change', (event) => setGoogleAvatarPreview(event.target.files?.[0] || null));
$('#continueGoogleButton').addEventListener('click', () => {
  const email = normalizeEmail($('#googleEmailInput').value);
  const playerId = Number($('#googlePlayerSelect').value);
  const avatar = $('#googleAvatarPreview').querySelector('img')?.src || '';
  const selectedPlayer = players.find(player => player.id === playerId) || players[0];

  if (!email) {
    $('#googleModalMessage').textContent = 'Please enter a valid Google email to continue.';
    return;
  }

  const nextUser = email === ADMIN_EMAIL
    ? { email, name: 'Mohammed Akhsar', role: 'admin', playerId: null, avatar }
    : { email, name: selectedPlayer?.name || 'Player', role: 'player', playerId: selectedPlayer?.id || null, avatar };

  persistAuth(nextUser);
  saveProfileData({ playerId: nextUser.playerId, avatar: nextUser.avatar, name: nextUser.name, email: nextUser.email });
  applyAuthState(nextUser);
  closeGoogleModal();
  renderBoard();
  $('#claimFeedback').textContent = `Signed in as ${nextUser.name} (${nextUser.email}).`;
});
function renderFeedback() { const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]'); $('#feedbackList').innerHTML = feedback.length ? feedback.map(item => `<div class="claim-row"><div><strong>${item.name} / ${item.type}</strong><span>${item.message}</span></div><button class="small-button" data-feedback="clear" data-id="${item.id}">Clear</button></div>`).join('') : '<p class="muted-copy">No player suggestions yet.</p>'; }
$('#feedbackForm').addEventListener('submit', event => { event.preventDefault(); const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]'); feedback.push({ id: Date.now(), name: $('#feedbackName').value.trim(), type: $('#feedbackType').value, message: $('#feedbackMessage').value.trim() }); localStorage.setItem('pitchboard-feedback-v1', JSON.stringify(feedback)); $('#feedbackForm').reset(); $('#feedbackStatus').textContent = 'Sent to the admin inbox.'; renderFeedback(); });
$('#feedbackList').addEventListener('click', event => { const button = event.target.closest('[data-feedback]'); if (!button) return; const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]').filter(item => item.id !== Number(button.dataset.id)); localStorage.setItem('pitchboard-feedback-v1', JSON.stringify(feedback)); renderFeedback(); });
function renderClaims() { const requests = JSON.parse(localStorage.getItem(CLAIMS_KEY) || '[]'); $('#claimList').innerHTML = requests.length ? requests.map(request => `<div class="claim-row"><div><strong>${request.name}</strong><span>${request.email || 'Google account pending'} / ${request.position}</span></div><div class="claim-actions"><button class="small-button" data-claim="approve" data-id="${request.id}">Approve</button><button class="small-button ghost" data-claim="deny" data-id="${request.id}">Deny</button></div></div>`).join('') : '<p class="muted-copy">No pending account claims.</p>'; }
$('#claimList').addEventListener('click', event => { const button = event.target.closest('[data-claim]'); if (!button) return; const requests = JSON.parse(localStorage.getItem(CLAIMS_KEY) || '[]').filter(request => request.id !== Number(button.dataset.id)); localStorage.setItem(CLAIMS_KEY, JSON.stringify(requests)); renderClaims(); });
positionSelect.value = 'CF'; $('#matchPlayer').innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join(''); populateEventOptions(players[0].position); renderMetrics(); renderMatchStats(); renderBoard(); renderMethod(); renderDeltaTable(); applySavedAuth(); populateGooglePlayerOptions(); renderClaims(); renderFeedback();
