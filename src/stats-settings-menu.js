import { timesArray } from './data-and-controls';
import { filterDnfTimes } from './data-and-controls';
var moment = require('moment');
import Chart from 'chart.js';

// query selectors settings
const settingsTab = document.querySelector('[data-settings-tab]');
const settingsBtn = document.querySelector('[data-settings-btn]');

// query selectors stats
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');
const filterBtn = document.querySelector('[data-filter');

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
statsBtn.addEventListener('click', function(){
  controlStatsMenu();
  // if stats tab is open create the chart on opening
  if(statsTab.classList.contains('stats-tab-open')){
    createChart();
  }
}) 

// chart on stats tab
var CHART = document.getElementById('lineChart');

export function createChart() {
  let filteredArray = filterDnfTimes().map((item) => item.recordedTime / 1000);
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
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time in seconds'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Solves'
          }
        }]
      }
    },
  });
}


