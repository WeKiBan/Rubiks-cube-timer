// query selectors
const settingsTab = document.querySelector('[data-settings-tab]');
const settingsBtn = document.querySelector('[data-settings-btn]');



// controls to open and close menus
 export function controlSettingsMenu() {
  settingsTab.classList.toggle('settings-tab-open');
}

// event listeners
settingsBtn.onclick = controlSettingsMenu;