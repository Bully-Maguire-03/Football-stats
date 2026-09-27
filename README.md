<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PitchRank | Football Player Rankings</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand-block">
        <div class="brand-mark">⚽</div>
        <div class="brand-copy">
          <span class="brand-kicker">PitchRank</span>
          <h1>Football Player Rankings</h1>
        </div>
      </div>

      <nav class="header-actions">
        <button class="tab-button active" data-tab="rankings">Rankings</button>
        <button class="tab-button" data-tab="events">Match Events</button>
        <button class="tab-button" data-tab="history">History</button>
        <button class="tab-button" data-tab="export">Export</button>
        <button class="tab-button" data-tab="playerview">Player View</button>
        <button id="adminBtn" class="admin-toggle-btn">Admin</button>
      </nav>
    </header>

    <section class="player-access-box panel-card">
      <div class="player-access-header">
        <h2>Player Access</h2>
      </div>

      <div id="playerClaimSection" class="player-claim-section">
        <label for="claimPlayerInput">Claim your profile</label>
        <div class="claim-row">
          <input id="claimPlayerInput" type="text" placeholder="Enter your player name" />
          <button id="claimPlayerBtn" class="claim-btn">Claim</button>
        </div>
      </div>

      <div id="playerProfileCard" class="player-profile-card hidden"></div>
    </section>

    <aside id="adminPanel" class="admin-panel hidden">
      <div class="admin-header">
        <h3>Admin Panel</h3>
        <button id="closeAdminBtn" class="panel-close-btn" aria-label="Close admin panel">✕</button>
      </div>

      <div class="admin-login-box">
        <label for="adminEmailInput">Admin Gmail</label>
        <input id="adminEmailInput" type="email" placeholder="yourname@gmail.com" />
        <button id="unlockAdminBtn" class="unlock-btn">Unlock Editing</button>
      </div>

      <div id="adminEditor" class="admin-editor hidden">
        <div class="editor-row">
          <label for="playerSelect">Player</label>
          <select id="playerSelect"></select>
        </div>
        <div id="playerForm" class="player-form"></div>
        <button id="savePlayerBtn" class="save-btn">Save Changes</button>
      </div>
    </aside>

    <main class="main-area">
      <section id="rankingsTab" class="tab-panel active">
        <div class="controls-bar">
          <input id="searchInput" class="search-box" type="text" placeholder="Search player..." />
          <select id="filterPosition" class="filter-select">
            <option value="">All positions</option>
            <option value="GK">Goalkeepers</option>
            <option value="DF">Defenders</option>
            <option value="MF">Midfielders</option>
            <option value="AT">Attackers</option>
          </select>
        </div>

        <div class="summary-strip">
          <div class="summary-card accent">
            <span>Goalkeepers</span>
            <strong id="summaryGK">0</strong>
          </div>
          <div class="summary-card blue">
            <span>Defenders</span>
            <strong id="summaryDF">0</strong>
          </div>
          <div class="summary-card green">
            <span>Midfielders</span>
            <strong id="summaryMF">0</strong>
          </div>
          <div class="summary-card orange">
            <span>Attackers</span>
            <strong id="summaryAT">0</strong>
          </div>
        </div>

        <div id="rankingGrid" class="ranking-grid"></div>
      </section>

      <section id="eventsTab" class="tab-panel hidden">
        <div class="event-logger panel-card">
          <h2>⚡ Match Event Logger</h2>
          <div class="event-form">
            <div class="form-row">
              <label>Player</label>
              <select id="eventPlayerSelect"></select>
            </div>
            <div class="form-row">
              <label>Event</label>
              <select id="eventTypeSelect"></select>
            </div>
            <div class="form-row">
              <label>Quantity</label>
              <input id="eventQuantity" type="number" min="1" value="1" />
            </div>
            <button id="applyEventBtn" class="apply-event-btn">Apply Event</button>
            <button id="undoLastBtn" class="undo-btn">Undo Last</button>
          </div>
        </div>
      </section>

      <section id="historyTab" class="tab-panel hidden">
        <div class="panel-card">
          <h2>📋 Match History</h2>
          <div id="historyList" class="history-list"></div>
        </div>
      </section>

      <section id="exportTab" class="tab-panel hidden">
        <div class="panel-card">
          <h2>💾 Export & Import</h2>
          <div class="export-controls">
            <button id="exportJsonBtn" class="export-btn">Export JSON</button>
            <button id="exportCsvBtn" class="export-btn">Export CSV</button>
            <button id="importBtn" class="import-btn">Import Data</button>
            <input id="importFile" type="file" accept=".json" style="display:none" />
          </div>
          <div id="exportPreview" class="export-preview"></div>
        </div>
      </section>

      <section id="playerviewTab" class="tab-panel hidden">
        <div class="panel-card">
          <h2>🧑‍💼 Player Dashboard</h2>
          <div id="playerDashboard" class="player-dashboard"></div>
        </div>
      </section>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>
