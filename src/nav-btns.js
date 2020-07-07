// query selectors settings
const settingsTab = document.querySelector('[data-settings-tab]');
const settingsBtn = document.querySelector('[data-settings-btn]');

// query selectors stats
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');

//query selectors for nav-btns
const navBtnsContainer = document.querySelector('[data-nav-btn-container]');

// function to open and close settings menu
export function controlSettingsMenu() {
  settingsTab.classList.toggle('settings-tab-open');
}

// function to open and close stats menu
export function controlStatsMenu() {
  statsTab.classList.toggle('stats-tab-open');
}

// function to hide and show nav buttons in the top bar
export function hideShowNavButtons() {
  navBtnsContainer.classList.toggle('hidden');
}

// event listeners for settings
settingsBtn.onclick = controlSettingsMenu;

// event listeners for stats
statsBtn.onclick = controlStatsMenu;
