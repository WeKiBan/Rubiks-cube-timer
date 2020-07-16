import {
  timesArray,
  renderStatsDisplay,
  clearHistory,
  resetAllTimerAndStats,
} from './data-and-controls';
import { filterDnfTimes } from './data-and-controls';
var moment = require('moment');
import Chart from 'chart.js';
var Tabulator = require('tabulator-tables');
import { renderTable } from './times-table';

// query selectors stats
const statsTab = document.querySelector('[data-stats-tab]');
const statsBtn = document.querySelector('[data-stats-btn]');
const filterBtn = document.querySelector('[data-filter');

//query selectors for time history tab
const timesHistoryTab = document.querySelector('[data-times-history-tab');
const timesHistoryBtn = document.querySelector('[data-times-history-btn');
const clearHistoryBtn = document.querySelector('[data-clear-history-btn');

//query selectors for time history modal
const clearTimeHistoryModal = document.querySelector(
  '[data-delete-history-modal]'
);
const cancelTimesHistoryBtn = document.querySelector(
  '[data-cancel-history-btn]'
);
const confirmDeleteHistoryBtn = document.querySelector(
  '[data-confirm-delete-history-btn]'
);

//query selectors for nav-btns
const navBtnsContainer = document.querySelector('[data-nav-btn-container]');

//query Selector for close btns
const closeTabBtns = Array.from(document.querySelectorAll('.close-btn'));


//query selector for chart options
const chartOptionsSelect = document.querySelector('[data-chart-options]')


// function to open and close stats menu
export function controlStatsMenu() {
  timesHistoryTab.classList.remove('times-history-tab-open');
  statsTab.classList.toggle('stats-tab-open');
  statsBtn.blur();
}

//function to open and close times history tab
function controlTimesHistoryTab() {
  statsTab.classList.remove('stats-tab-open');
  timesHistoryTab.classList.toggle('times-history-tab-open');
  timesHistoryBtn.blur();
  renderTable(timesArray);
}

// function to hide and show nav buttons in the top bar
export function hideShowNavButtons() {
  navBtnsContainer.classList.toggle('hidden');
}

// event listeners for stats
statsBtn.addEventListener('click', function () {
  controlStatsMenu();
  // if stats tab is open create the chart on opening
  if (statsTab.classList.contains('stats-tab-open')) {
    chartOptionsSelect.value = 'all';
    createChart(filterArray(chartOptionsSelect.value));
  }
});

// function to close tabs when cross is clicked

function closeTabs() {
  statsTab.classList.remove('stats-tab-open');
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

clearHistoryBtn.addEventListener('click', function () {
  clearTimeHistoryModal.style.display = 'flex';
});

// resize settings/stats dropdown boxes when window is resized
window.addEventListener('resize', function () {
  statsTab.style.height = '';
  timesHistoryTab.style.height = '';
});

// modal btn event listeners
//confirm delete time
confirmDeleteHistoryBtn.addEventListener('click', function (e) {
  clearTimeHistoryModal.style.display = 'none';
  resetAllTimerAndStats();
  clearHistory();
  controlTimesHistoryTab();
});

//cancel delete and close modal
cancelTimesHistoryBtn.addEventListener('click', function () {
  clearTimeHistoryModal.style.display = 'none';
});

// close modal if click outside

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
  if (event.target == clearTimeHistoryModal) {
    clearTimeHistoryModal.style.display = 'none';
  }
});

//event listener for chart options
chartOptionsSelect.addEventListener('change', function(e){
  createChart(filterArray(e.target.value));
})

// chart on stats tab
var CHART = document.getElementById('lineChart');

export function createChart(filteredArray) {
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
              beginAtZero: true,
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
              display: false,
              fontColor: '#fff',
            },
            gridLines: {
              display: false,
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

//function to filter array
function filterArray(arrayLength) {
  let filteredArray = filterDnfTimes()
    .map((item) => (item.recordedTime / 1000).toFixed(3))
    .reverse();
  if (arrayLength === 'all') {
    return filteredArray;
  }
  if (arrayLength === '5') {
    return filteredArray.slice(0, 6);
  }
  if (arrayLength === '10') {
    return filteredArray.slice(0, 11);
  }
  if (arrayLength === '50') {
    return filteredArray.slice(0, 51);
  }
  if (arrayLength === '100') {
    return filteredArray.slice(0, 101);
  }
  if (arrayLength === '1000') {
    return filteredArray.slice(0, 1001);
  }
}
