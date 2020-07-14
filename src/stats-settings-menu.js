import {
  timesArray,
  renderStatsDisplay,
  clearHistory,
} from './data-and-controls';
import { filterDnfTimes } from './data-and-controls';
var moment = require('moment');
import Chart from 'chart.js';
var Tabulator = require('tabulator-tables');
import {renderTable} from './times-table'

// query selectors settings
const settingsTab = document.querySelector('[data-settings-tab]');
const settingsBtn = document.querySelector('[data-settings-btn]');
const clearHistoryBtn = document.querySelector('[data-clear-history-btn');

// query selectors stats
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');
const filterBtn = document.querySelector('[data-filter');

//query selectors for time history tab
const timesHistoryTab = document.querySelector('[data-times-history-tab');
const timesHistoryBtn = document.querySelector('[data-times-history-btn');

//query selectors for nav-btns
const navBtnsContainer = document.querySelector('[data-nav-btn-container]');

//query Selector for close btns
const closeTabBtns = Array.from(document.querySelectorAll('.close-btn'));

// function to open and close settings menu
export function controlSettingsMenu() {
  statsTab.classList.remove('stats-tab-open');
  timesHistoryTab.classList.remove('times-history-tab-open');
  settingsTab.classList.toggle('settings-tab-open');
}

// function to open and close stats menu
export function controlStatsMenu() {
  settingsTab.classList.remove('settings-tab-open');
  timesHistoryTab.classList.remove('times-history-tab-open');
  statsTab.classList.toggle('stats-tab-open');
  statsBtn.blur();
}

//function to open and close times history tab
function controlTimesHistoryTab() {
  statsTab.classList.remove('stats-tab-open');
  settingsTab.classList.remove('settings-tab-open');
  timesHistoryTab.classList.toggle('times-history-tab-open');
  timesHistoryBtn.blur();
  renderTable(timesArray);
}

// function to hide and show nav buttons in the top bar
export function hideShowNavButtons() {
  navBtnsContainer.classList.toggle('hidden');
}

// event listeners for settings
settingsBtn.addEventListener('click', function (e) {
  controlSettingsMenu();
  settingsBtn.blur();
});

clearHistoryBtn.addEventListener('click', function () {
  clearHistory();
});

// event listeners for stats
statsBtn.addEventListener('click', function () {
  controlStatsMenu();
  // if stats tab is open create the chart on opening
  if (statsTab.classList.contains('stats-tab-open')) {
    createChart();
  }
});

// function to close tabs when cross is clicked

function closeTabs() {
  statsTab.classList.remove('stats-tab-open');
  settingsTab.classList.remove('settings-tab-open');
  timesHistoryTab.classList.remove('times-history-tab-open');
}

//event listeners for close tab btns

closeTabBtns.forEach((btn) => {
  btn.addEventListener('click', closeTabs);
});

// events listeners for times history tabs
timesHistoryBtn.addEventListener('click', function () {
  controlTimesHistoryTab();
});

// resize settings/stats dropdown boxes when window is resized
window.addEventListener('resize', function () {
  statsTab.style.height = '';
  settingsTab.style.height = '';
});

// chart on stats tab
var CHART = document.getElementById('lineChart');

export function createChart() {
  let filteredArray = filterDnfTimes()
    .map((item) => (item.recordedTime / 1000).toFixed(3))
    .reverse();
  let labels = [];
  for (let i = 1; i <= filteredArray.length; i++) {
    labels.push(i);
  }
  var myLineChart = new Chart(CHART, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          lineTension: 0,
          data: filteredArray,
          backgroundColor: 'rgba(255, 255, 255, 0.726)',
          borderColor: '#fff',
        },
      ],
    },
    options: {
      legend: {
        display: false,
        labels: {
          fontColor: '#fff',
        },
        title: {
          fontColor: '#fff',
        },
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Time in seconds',
              fontColor: '#fff',
            },
            ticks: {
              fontColor: '#fff',
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.726)',
              lineWidth: 1,
              zeroLineColor: 'rgba(255, 255, 255, 0.726)',
              zeroLineWidth: 1,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Solves',
              fontColor: '#fff',
            },
            ticks: {
              fontColor: '#fff',
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.726)',
              lineWidth: 1,
              zeroLineColor: 'rgba(255, 255, 255, 0.726)',
              zeroLineWidth: 1,
            },
          },
        ],
      },
    },
  });
}



