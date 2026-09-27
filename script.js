* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #0b1220;
  --bg-2: #111d2e;
  --panel: rgba(16, 26, 38, 0.94);
  --panel-strong: rgba(11, 18, 30, 0.96);
  --line: rgba(133, 178, 255, 0.18);
  --text: #eef5ff;
  --muted: #a7b8cf;
  --blue: #55a9ff;
  --cyan: #71e7ff;
  --green: #8be7ae;
  --orange: #ffb36a;
  --red: #ff7b73;
  --shadow: rgba(2, 8, 18, 0.55);
}

body {
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(85, 169, 255, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(113, 231, 255, 0.12), transparent 35%),
    linear-gradient(135deg, #08111d 0%, #0d1728 42%, #101d2d 100%);
  color: var(--text);
}

button, input, select {
  font: inherit;
}

.app-shell {
  max-width: 1480px;
  margin: 0 auto;
  padding: 28px 18px 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 20px 26px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(18, 28, 40, 0.96), rgba(21, 33, 51, 0.95));
  box-shadow: 0 18px 45px var(--shadow);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #0d49b5, #c71d26);
  font-size: 1.4rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
}

.brand-copy .brand-kicker {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cyan);
}

.brand-copy h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 2.6vw, 2.6rem);
  font-weight: 700;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-button,
.admin-toggle-btn,
.unlock-btn,
.save-btn,
.apply-event-btn,
.undo-btn,
.export-btn,
.import-btn,
.claim-btn {
  border: 1px solid rgba(128, 175, 255, 0.32);
  color: var(--text);
  background: rgba(17, 28, 42, 0.9);
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s ease;
}

.tab-button:hover,
.admin-toggle-btn:hover,
.unlock-btn:hover,
.save-btn:hover,
.apply-event-btn:hover,
.undo-btn:hover,
.export-btn:hover,
.import-btn:hover,
.claim-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(87, 176, 255, 0.7);
}

.tab-button.active {
  background: linear-gradient(135deg, rgba(73,166,255,0.28), rgba(111,232,255,0.14));
  border-color: rgba(111,232,255,0.7);
}

.main-area { margin-top: 24px; }
.tab-panel.hidden { display: none; }

.player-access-box {
  margin: 20px 0 24px;
}

.player-access-header {
  margin-bottom: 12px;
}

.player-claim-section label {
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.claim-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.claim-row input {
  flex: 1;
  min-width: 180px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(128,175,255,0.22);
  background: rgba(16,25,38,0.9);
  color: var(--text);
}

.player-profile-card {
  margin-top: 14px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(17,25,38,0.9);
}

.hidden { display: none !important; }

.player-card-mini {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.player-mini-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.controls-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.search-box,
.filter-select,
.form-row input,
.form-row select,
.admin-login-box input,
.editor-row select,
.player-form input {
  background: rgba(16, 25, 38, 0.9);
  color: var(--text);
  border: 1px solid rgba(128,175,255,0.22);
  border-radius: 12px;
  padding: 10px 12px;
}

.search-box,
.filter-select {
  flex: 1;
  min-width: 180px;
}

.summary-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(14,24,37,0.86);
  border: 1px solid rgba(255,255,255,0.08);
}

.summary-card span {
  color: var(--muted);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.summary-card strong {
  font-size: 1.35rem;
  font-weight: 700;
}

.summary-card.accent { border-color: rgba(111,232,255,0.35); }
.summary-card.blue { border-color: rgba(73,166,255,0.35); }
.summary-card.green { border-color: rgba(126,228,174,0.32); }
.summary-card.orange { border-color: rgba(255,176,103,0.34); }

.ranking-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(255px, 1fr));
  gap: 18px;
}

.position-panel {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(15,24,36,0.96), rgba(18,28,43,0.94));
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(7,14,24,0.35);
}

.position-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 18px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.position-header h3 {
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.position-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #08131d;
}

.position-panel.GK .position-badge { background: linear-gradient(135deg, #8ec7ff, #64dbff); }
.position-panel.DF .position-badge { background: linear-gradient(135deg, #7ee4ae, #54d4e0); }
.position-panel.MF .position-badge { background: linear-gradient(135deg, #f0c96d, #ffc778); }
.position-panel.AT .position-badge { background: linear-gradient(135deg, #ffb067, #ff8f6d); }

.player-card-list {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player-card {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  background: rgba(21,32,49,0.82);
  padding: 14px;
  transition: 0.2s ease;
}

.player-card:hover {
  border-color: rgba(110,232,255,0.35);
  box-shadow: 0 12px 20px rgba(8,14,24,0.22);
}

.player-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.player-points {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #08131d;
  background: linear-gradient(135deg, #a6edff, #77d4ff);
}

.player-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.player-name {
  font-weight: 600;
  font-size: 1.03rem;
}

.player-club {
  color: var(--muted);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.team-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  padding: 6px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.08);
}

.team-badge.barca { background: rgba(198, 40, 40, 0.18); color: #ff8d8d; }
.team-badge.madrid { background: rgba(42, 112, 255, 0.18); color: #8db9ff; }

.stat-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(114,152,214,0.12);
  border: 1px solid rgba(161,205,255,0.12);
  color: var(--muted);
  font-size: 0.68rem;
  font-weight: 600;
}

.stat-pill strong {
  color: var(--text);
}

.panel-card {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(15,24,36,0.95);
  padding: 24px;
  box-shadow: 0 14px 30px rgba(7,14,24,0.24);
}

.event-logger h2,
.panel-card h2 {
  margin-bottom: 18px;
  font-size: 1.4rem;
}

.event-form {
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 12px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row label {
  color: var(--muted);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 16px;
  background: rgba(18, 29, 42, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
}

.history-info {
  flex: 1;
}

.history-player {
  font-weight: 600;
  margin-bottom: 4px;
}

.history-event {
  color: var(--muted);
  font-size: 0.82rem;
}

.history-value {
  min-width: 90px;
  text-align: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
}

.export-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.export-preview {
  background: rgba(9, 15, 24, 0.95);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px;
  min-height: 180px;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  overflow: auto;
}

.player-dashboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 16px;
}

.dashboard-card {
  padding: 18px;
  border-radius: 16px;
  background: rgba(18, 29, 42, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
}

.dashboard-card h3 {
  margin-bottom: 8px;
}

.admin-panel {
  position: fixed;
  top: 22px;
  right: 22px;
  width: min(440px, calc(100vw - 28px));
  padding: 18px;
  border-radius: 20px;
  background: rgba(9, 17, 28, 0.97);
  border: 1px solid rgba(111,232,255,0.28);
  box-shadow: 0 24px 60px rgba(2,10,17,0.42);
  z-index: 40;
  max-height: 82vh;
  overflow-y: auto;
}

.admin-panel.hidden { display: none; }

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.panel-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.02);
  color: var(--text);
  cursor: pointer;
}

.admin-login-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.admin-login-box label,
.editor-row label {
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin-editor.hidden { display: none; }

.editor-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.player-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 12px;
  max-height: 360px;
  overflow-y: auto;
}

.player-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 0.7rem;
  text-transform: uppercase;
}

@media (max-width: 1120px) {
  .ranking-grid { grid-template-columns: repeat(2, minmax(260px, 1fr)); }
  .event-form { grid-template-columns: 1fr; }
  .player-dashboard { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .topbar { flex-direction: column; align-items: flex-start; }
  .header-actions { width: 100%; justify-content: flex-start; }
  .summary-strip, .ranking-grid { grid-template-columns: 1fr; }
  .claim-row { flex-direction: column; align-items: stretch; }
}
