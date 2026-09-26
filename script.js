* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #0c1220;
  --bg-2: #111b2d;
  --panel: rgba(19, 28, 43, 0.95);
  --panel-alt: rgba(22, 33, 51, 0.94);
  --line: rgba(137, 185, 255, 0.18);
  --text: #edf4ff;
  --muted: #98a9c3;
  --blue: #49a6ff;
  --blue-strong: #1d7ff2;
  --cyan: #6fe8ff;
  --green: #7ee4ae;
  --gold: #f0c96d;
  --orange: #ffb067;
  --red: #ff786e;
  --shadow: rgba(8, 15, 30, 0.48);
}

body {
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(73, 166, 255, 0.15), transparent 28%),
    radial-gradient(circle at bottom right, rgba(110, 232, 255, 0.08), transparent 30%),
    linear-gradient(140deg, #071019 0%, #0b1220 25%, #101b2e 100%);
  color: var(--text);
  letter-spacing: 0.01em;
}

button,
input,
select {
  font: inherit;
}

.app-shell {
  max-width: 1480px;
  margin: 0 auto;
  padding: 28px 18px 50px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 18px 28px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(15, 22, 33, 0.96), rgba(25, 35, 55, 0.92));
  box-shadow: 0 18px 45px var(--shadow);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.crest {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: white;
  border: 2px solid rgba(255,255,255,0.25);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07);
}

.crest-barca {
  background: linear-gradient(135deg, #0d49b5, #c71d26);
}

.brand-copy .brand-kicker {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--cyan);
}

.brand-copy h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 2vw, 2.4rem);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-button,
.admin-toggle-btn,
.unlock-btn,
.save-btn,
.edit-btn,
.sort-toggle {
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
.edit-btn:hover,
.sort-toggle:hover {
  transform: translateY(-1px);
  border-color: rgba(87, 176, 255, 0.7);
}

.tab-button.active {
  background: linear-gradient(135deg, rgba(73,166,255,0.28), rgba(111,232,255,0.14));
  border-color: rgba(111,232,255,0.7);
  box-shadow: 0 0 0 1px rgba(111,232,255,0.15);
}

.main-area {
  margin-top: 24px;
}

.tab-panel.hidden {
  display: none;
}

.summary-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 26px;
}

.summary-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(14, 24, 37, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 14px 28px rgba(5, 9, 18, 0.2);
}

.summary-card span {
  color: var(--muted);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.summary-card strong {
  font-size: 1.4rem;
  font-weight: 700;
}

.summary-card.accent { border-color: rgba(111,232,255,0.35); }
.summary-card.blue { border-color: rgba(73,166,255,0.35); }
.summary-card.green { border-color: rgba(126,228,174,0.32); }
.summary-card.orange { border-color: rgba(255,176,103,0.34); }

.ranking-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(260px, 1fr));
  gap: 18px;
  align-items: start;
}

.position-panel {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(15,24,36,0.95), rgba(18,28,43,0.93));
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(7, 14, 24, 0.35);
}

.position-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 18px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.position-header h3 {
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}

.position-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bg);
  background: linear-gradient(135deg, #8ec7ff, #64dbff);
}

.position-panel.GK .position-badge { background: linear-gradient(135deg, #8ec7ff, #64dbff); }
.position-panel.DF .position-badge { background: linear-gradient(135deg, #7ee4ae, #54d4e0); }
.position-panel.MF .position-badge { background: linear-gradient(135deg, #f0c96d, #ffc778); }
.position-panel.AT .position-badge { background: linear-gradient(135deg, #ffb067, #ff8f6d); }

.player-card-list {
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player-card {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  background: rgba(21, 32, 49, 0.82);
  padding: 14px 14px 12px;
  transition: 0.2s ease;
}

.player-card:hover {
  border-color: rgba(110, 232, 255, 0.35);
  box-shadow: 0 12px 20px rgba(8, 14, 24, 0.22);
}

.player-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.player-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
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
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.player-name {
  font-weight: 600;
  font-size: 1.02rem;
}

.player-club {
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(114, 152, 214, 0.12);
  border: 1px solid rgba(161, 205, 255, 0.12);
  color: var(--muted);
  font-size: 0.7rem;
  font-weight: 600;
}

.stat-pill strong {
  color: var(--text);
  margin-left: 4px;
}

.squad-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.squad-card {
  padding: 16px;
  border-radius: 18px;
  background: rgba(18, 27, 40, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
}

.squad-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.squad-card h4 {
  font-size: 1.08rem;
  margin: 0;
}

.squad-card .pos-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(111,232,255,0.14);
  color: var(--cyan);
}

.squad-card .meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: 0.78rem;
  margin-bottom: 10px;
}

.squad-card .stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(90px, 1fr));
  gap: 8px;
  font-size: 0.75rem;
  color: var(--muted);
}

.admin-panel {
  position: fixed;
  top: 22px;
  right: 22px;
  z-index: 40;
  width: min(440px, calc(100vw - 28px));
  padding: 18px;
  border-radius: 20px;
  background: rgba(10, 17, 28, 0.96);
  border: 1px solid rgba(111,232,255,0.28);
  box-shadow: 0 24px 60px rgba(2, 10, 17, 0.42);
}

.admin-panel.hidden {
  display: none;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.admin-header h3 {
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin-login-box input,
.editor-row select,
.player-form input,
.player-form select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(128,175,255,0.22);
  background: rgba(16, 25, 38, 0.92);
  color: var(--text);
  padding: 10px 12px;
}

.unlock-btn,
.save-btn {
  width: 100%;
  margin-top: 4px;
  background: linear-gradient(135deg, rgba(73,166,255,0.2), rgba(111,232,255,0.12));
}

.admin-editor.hidden {
  display: none;
}

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
  margin-top: 10px;
}

.player-form .full-width {
  grid-column: 1 / -1;
}

.player-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 1120px) {
  .ranking-grid {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 760px) {
  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .summary-strip,
  .ranking-grid {
    grid-template-columns: 1fr;
  }

  .player-form {
    grid-template-columns: 1fr;
  }
}
