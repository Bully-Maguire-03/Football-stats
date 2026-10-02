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
function withStats(player) { return { ...player, stats: player.stats || { shooting: player.values[0], passing: player.values[1], dribbling: player.values[2], defending: player.values[3], physical: player.values[4], pace: Math.round(player.values.reduce((sum, value) => sum + value, 0) / player.values.length) }, matchStats: player.matchStats || Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0])) }; }
let players = (JSON.parse(localStorage.getItem(ROSTER_KEY) || 'null') || STARTER).map(withStats);
let claims = JSON.parse(localStorage.getItem(CLAIMS_KEY) || 'null') || [];
let editingId = null;
let role = sessionStorage.getItem('pitchboard-role') || 'admin';
const positionSelect = $('#playerPosition');
const filterPosition = $('#filterPosition');
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
function renderBoard() {
  const search = $('#searchInput').value.toLowerCase(); const filter = filterPosition.value;
  const visible = players.filter(player => player.name.toLowerCase().includes(search) && (filter === 'ALL' || player.position === filter)).sort((a, b) => impactScore(b) - impactScore(a));
  const featuredIds = new Set([...players].sort((a, b) => impactScore(b) - impactScore(a)).slice(0, 10).map(player => player.id));
  $('#leaderboard').innerHTML = visible.map((player, index) => { const data = POSITION_DATA[player.position]; const bars = Object.keys(MATCH_EVENTS).slice(0, 6).map(eventKey => `<i style="height:${Math.max(4, Math.min(30, player.matchStats[eventKey] * 2))}px;background:${data.color}"></i>`).join(''); const actions = role === 'admin' ? `<button class="row-action" title="Edit player" data-action="edit" data-id="${player.id}">✎</button><button class="row-action" title="Delete player" data-action="delete" data-id="${player.id}">×</button>` : '<span class="player-lock">view only</span>'; const totalLine = `Goals ${player.matchStats.goal || 0} / Assists ${player.matchStats.assist || 0} / Chances ${player.matchStats.keyPass || 0}`; return `<article class="player-row${featuredIds.has(player.id) ? ' featured' : ''}"><span class="player-rank">${String(index + 1).padStart(2, '0')}</span><div class="player-info"><span class="avatar" style="background:${data.color}">${initials(player.name)}</span><div><div class="player-name">${player.name}</div><div class="player-position">${data.label}</div><div class="player-totals">${totalLine}</div></div></div><span class="tag">${player.position}</span><div class="mini-bars" aria-label="${player.name} match profile">${bars}</div><strong class="rating"><small>IMPACT</small>${impactScore(player).toFixed(2)}</strong><div class="row-actions">${actions}</div></article>`; }).join('');
  $('#emptyState').classList.toggle('hidden', visible.length > 0); $('#heroCount').textContent = String(players.length).padStart(2, '0');
  $('#lastUpdated').textContent = `Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
function renderTopTen() { const topTen = [...players].sort((a, b) => impactScore(b) - impactScore(a)).slice(0, 10); $('#topTenGrid').innerHTML = topTen.map((player, index) => `<div class="top-ten-card"><span class="top-ten-rank">${String(index + 1).padStart(2, '0')}</span><div><strong>${player.name}</strong><span>${player.position} / ${POSITION_DATA[player.position].label}</span></div><b>${impactScore(player).toFixed(2)}<small> impact</small></b></div>`).join(''); }
function renderMethod() { $('#methodWeights').innerHTML = [36, 32, 30].map(weight => `<i style="width:${weight}%"></i>`).join(''); $('#roleList').innerHTML = [['CF / LW / RW', 'Attackers', '+0.36 goal'], ['CM / CAM / CDM', 'Midfielders', '+0.32 assist'], ['CB / LB / RB / GK', 'Defenders', '+0.30 tackle']].map(([code, name, value]) => `<div class="role-item"><strong>${code}</strong><div class="role-track"><span style="width:${parseFloat(value.slice(1)) * 100}%"></span></div><em>${name} / ${value}</em></div>`).join(''); }
function resetForm() { editingId = null; $('#formTitle').textContent = 'Edit player stats'; $('#submitLabel').textContent = 'Save stats'; $('#cancelEdit').classList.add('hidden'); $('#playerForm').reset(); positionSelect.value = 'CF'; renderMetrics(); renderMatchStats(); }
positionSelect.addEventListener('change', () => renderMetrics());
$('#playerForm').addEventListener('submit', event => { event.preventDefault(); if (role !== 'admin') return; const existing = players.find(item => item.id === editingId); const player = { id: editingId || Date.now(), name: $('#playerName').value.trim(), position: positionSelect.value, stats: existing?.stats || {}, matchStats: currentMatchStats() }; players = editingId ? players.map(item => item.id === editingId ? player : item) : [...players, player]; localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); resetForm(); renderBoard(); });
$('#cancelEdit').addEventListener('click', resetForm);
$('#searchInput').addEventListener('input', renderBoard); filterPosition.addEventListener('change', renderBoard);
$('#matchForm').addEventListener('submit', event => { event.preventDefault(); if (role !== 'admin') return; const player = players.find(item => item.id === Number($('#matchPlayer').value)); const eventKey = $('#matchEvent').value; const [label, stat] = MATCH_EVENTS[eventKey]; const count = Number($('#matchCount').value); player.matchStats[eventKey] = (player.matchStats[eventKey] || 0) + count; localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); renderBoard(); renderMatchStats(player.matchStats); $('#matchFeedback').textContent = `${player.name}: ${label} x${count} at ${positionDelta(player, eventKey) > 0 ? '+' : ''}${positionDelta(player, eventKey).toFixed(2)} each.`; });
$('#leaderboard').addEventListener('click', event => { const button = event.target.closest('[data-action]'); if (!button || role !== 'admin') return; const id = Number(button.dataset.id); const player = players.find(item => item.id === id); if (button.dataset.action === 'delete') { players = players.filter(item => item.id !== id); localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); renderBoard(); } else { editingId = id; $('#formTitle').textContent = 'Edit player stats'; $('#submitLabel').textContent = 'Save stats'; $('#cancelEdit').classList.remove('hidden'); $('#playerName').value = player.name; positionSelect.value = player.position; renderMetrics(player.stats); renderMatchStats(player.matchStats); populateEventOptions(player.position); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
$('#matchPlayer').addEventListener('change', () => { const player = players.find(item => item.id === Number($('#matchPlayer').value)); if (player) { renderMatchStats(player.matchStats); populateEventOptions(player.position); } });
$('#resetPlayerStats').addEventListener('click', () => { if (role !== 'admin') return; const player = players.find(item => item.id === Number($('#matchPlayer').value)); if (!player) return; player.matchStats = Object.fromEntries(MATCH_STAT_KEYS.map(key => [key, 0])); localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); renderMatchStats(player.matchStats); renderBoard(); $('#matchFeedback').textContent = `${player.name}: match stats reset.`; });
$('#resetData').addEventListener('click', () => { players = STARTER.map(withStats); localStorage.setItem(ROSTER_KEY, JSON.stringify(players)); resetForm(); renderBoard(); $('#matchPlayer').innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join(''); });
$('#authButton').addEventListener('click', () => { role = role === 'admin' ? 'player' : 'admin'; sessionStorage.setItem('pitchboard-role', role); $('#authStatus').textContent = role === 'admin' ? 'SIGNED IN / ADMIN' : 'PLAYER VIEW'; $('#authButton').textContent = role === 'admin' ? 'Preview player view' : 'Return to admin'; $('#adminConsole').classList.toggle('hidden', role !== 'admin'); $('#claimPanel').classList.toggle('hidden', role === 'admin'); $('#claimsPanel').classList.toggle('hidden', role !== 'admin'); $('#feedbackInbox').classList.toggle('hidden', role !== 'admin'); renderBoard(); });
$('#claimForm').addEventListener('submit', event => { event.preventDefault(); const request = { id: Date.now(), name: $('#claimName').value.trim(), position: $('#claimPosition').value, email: $('#claimEmail').value.trim() }; const requests = JSON.parse(localStorage.getItem('pitchboard-claims-v1') || '[]'); requests.push(request); localStorage.setItem('pitchboard-claims-v1', JSON.stringify(requests)); $('#claimForm').reset(); $('#claimFeedback').textContent = 'Request sent. Your admin must approve access.'; });
$('#googleButton').addEventListener('click', () => { $('#claimFeedback').textContent = 'Google sign-in needs a server OAuth client ID. The claim form is ready for that connection.'; });
function renderFeedback() { const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]'); $('#feedbackList').innerHTML = feedback.length ? feedback.map(item => `<div class="claim-row"><div><strong>${item.name} / ${item.type}</strong><span>${item.message}</span></div><button class="small-button" data-feedback="clear" data-id="${item.id}">Clear</button></div>`).join('') : '<p class="muted-copy">No player suggestions yet.</p>'; }
$('#feedbackForm').addEventListener('submit', event => { event.preventDefault(); const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]'); feedback.push({ id: Date.now(), name: $('#feedbackName').value.trim(), type: $('#feedbackType').value, message: $('#feedbackMessage').value.trim() }); localStorage.setItem('pitchboard-feedback-v1', JSON.stringify(feedback)); $('#feedbackForm').reset(); $('#feedbackStatus').textContent = 'Sent to the admin inbox.'; renderFeedback(); });
$('#feedbackList').addEventListener('click', event => { const button = event.target.closest('[data-feedback]'); if (!button) return; const feedback = JSON.parse(localStorage.getItem('pitchboard-feedback-v1') || '[]').filter(item => item.id !== Number(button.dataset.id)); localStorage.setItem('pitchboard-feedback-v1', JSON.stringify(feedback)); renderFeedback(); });
function renderClaims() { const requests = JSON.parse(localStorage.getItem(CLAIMS_KEY) || '[]'); $('#claimList').innerHTML = requests.length ? requests.map(request => `<div class="claim-row"><div><strong>${request.name}</strong><span>${request.email || 'Google account pending'} / ${request.position}</span></div><div class="claim-actions"><button class="small-button" data-claim="approve" data-id="${request.id}">Approve</button><button class="small-button ghost" data-claim="deny" data-id="${request.id}">Deny</button></div></div>`).join('') : '<p class="muted-copy">No pending account claims.</p>'; }
$('#claimList').addEventListener('click', event => { const button = event.target.closest('[data-claim]'); if (!button) return; const requests = JSON.parse(localStorage.getItem(CLAIMS_KEY) || '[]').filter(request => request.id !== Number(button.dataset.id)); localStorage.setItem(CLAIMS_KEY, JSON.stringify(requests)); renderClaims(); });
positionSelect.value = 'CF'; $('#matchPlayer').innerHTML = players.map(player => `<option value="${player.id}">${player.name} / ${player.position}</option>`).join(''); populateEventOptions(players[0].position); renderMetrics(); renderMatchStats(); renderBoard(); renderMethod(); renderDeltaTable(); $('#adminConsole').classList.toggle('hidden', role !== 'admin'); $('#claimPanel').classList.toggle('hidden', role === 'admin'); $('#claimsPanel').classList.toggle('hidden', role !== 'admin'); $('#feedbackInbox').classList.toggle('hidden', role !== 'admin'); $('#authStatus').textContent = role === 'admin' ? 'SIGNED IN / ADMIN' : 'PLAYER VIEW';
renderClaims();
renderFeedback();
