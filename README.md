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
        <button class="tab-button" data-tab="squad">Squad</button>
        <button id="adminToggleBtn" class="admin-toggle-btn">Admin</button>
      </div>
    </header>

    <aside id="adminPanel" class="admin-panel hidden">
      <div class="admin-header">
        <h3>Admin Panel</h3>
        <button id="closeAdminPanelBtn" class="panel-close-btn" aria-label="Close admin panel">✕</button>
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

      <section id="squadTab" class="tab-panel hidden">
        <div id="squadGrid" class="squad-grid"></div>
      </section>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>
