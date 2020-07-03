// query selectors 
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');

const settingsTab = document.querySelector('[data-settings-tab]');
const settingsBtn = document.querySelector('[data-settings-btn]');


// controls to open and close menus
function controlStatsMenu(){
    statsTab.classList.toggle("stats-tab-open");
}

function controlSettingsMenu(){
    settingsTab.classList.toggle("settings-tab-open");
}

// event listeners
statsBtn.onclick = controlStatsMenu;
settingsBtn.onclick = controlSettingsMenu;

