// query selectors
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');

// function to open and close stats menu
export function controlStatsMenu() {
  statsTab.classList.toggle('stats-tab-open');
}

// event listeners
statsBtn.onclick = controlStatsMenu;
