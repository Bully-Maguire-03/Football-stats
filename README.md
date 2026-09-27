<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PitchRank | Player Rankings</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand-block">
        <div class="crest crest-barca">FC</div>
        <div class="brand-copy">
          <span class="brand-kicker">PitchRank</span>
          <h1>Football Player Rankings</h1>
        </div>
      </div>

      <div class="header-actions">
        <button class="tab-button active" data-tab="rankings">Rankings</button>
        <button class="tab-button" data-tab="events">Match Events</button>
        <button class="tab-button" data-tab="history">History</button>
        <button class="tab-button" data-tab="export">Export</button>
        <button id="adminToggleBtn" class="admin-toggle-btn">Admin</button>
      </div>
    </header>

    <aside id="adminPanel" class="admin-panel hidden">
      <div class="admin-header">
        <h3>⚙️ Admin Panel</h3>
        <button id="closeAdminPanelBtn" class="panel-close-btn">✕</button>
      </div>

      <div class="admin-login-box">
        <label for="adminEmailInput">Admin Gmail</label>
        <input id="adminEmailInput" type="email" placeholder="yourname@gmail.com" />
        <button id="unlockAdminBtn" class="unlock-btn">Unlock Editing</button>
      </div>

      <div id="adminEditor" class="admin-editor hidden">
        <div class="editor-row">
          <label for="playerSelect">Select Player</label>
          <select id="playerSelect"></select>
        </div>
        <div id="playerForm" class="player-form"></div>
        <button id="savePlayerBtn" class="save-btn">Save Changes</button>
      </div>
    </aside>

    <main class="main-area">
      <!-- RANKINGS TAB -->
      <section id="rankingsTab" class="tab-panel active">
        <div class="controls-bar">
          <input type="text" id="searchInput" placeholder="🔍 Search player..." class="search-box" />
          <select id="filterPosition" class="filter-select">
            <option value="">All Positions</option>
            <option value="GK">Goalkeepers</option>
            <option value="DF">Defenders</option>
            <option value="MF">Midfielders</option>
            <option value="AT">Attackers</option>
          </select>
          <button id="sortToggle" class="sort-toggle">⬇️ Sort by Points</button>
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

      <!-- MATCH EVENTS TAB -->
      <section id="eventsTab" class="tab-panel hidden">
        <div class="event-logger">
          <h2>📝 Log Match Event</h2>
          <div class="event-form">
            <div class="form-row">
              <label>Player</label>
              <select id="eventPlayerSelect"></select>
            </div>
            <div class="form-row">
              <label>Event Type</label>
              <select id="eventTypeSelect"></select>
            </div>
            <div class="form-row">
              <label>Quantity</label>
              <input type="number" id="eventQuantity" value="1" min="1" />
            </div>
            <button id="applyEventBtn" class="apply-event-btn">⚡ Apply Event</button>
            <button id="undoLastBtn" class="undo-btn">↶ Undo Last</button>
          </div>
        </div>
      </section>

      <!-- HISTORY TAB -->
      <section id="historyTab" class="tab-panel hidden">
        <h2>📋 Match History</h2>
        <div id="historyList" class="history-list"></div>
      </section>

      <!-- EXPORT TAB -->
      <section id="exportTab" class="tab-panel hidden">
        <h2>💾 Data Export & Import</h2>
        <div class="export-controls">
          <button id="exportJsonBtn" class="export-btn">📥 Export as JSON</button>
          <button id="exportCsvBtn" class="export-btn">📥 Export as CSV</button>
          <button id="importBtn" class="import-btn">📤 Import Data</button>
          <input type="file" id="importFile" accept=".json" style="display:none;" />
        </div>
        <div id="exportPreview" class="export-preview"></div>
      </section>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>