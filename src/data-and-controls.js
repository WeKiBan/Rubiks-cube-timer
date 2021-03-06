import { relativeTimeThreshold } from 'moment';
import { formatTime } from './timer';
import { timerContainer } from './timer';
import { resetStopWatchDisplay } from './timer';
import moment from 'moment';
import { renderTable } from './times-table';

// query selector for message under timer and control buttons
const timerMessage = document.querySelector('[data-timer-message]');
const controlBtnsContainer = document.querySelector(
  '[data-control-btns-container]'
);
const deleteBtn = controlBtnsContainer.querySelector('[data-delete-btn]');
const dnfBtn = controlBtnsContainer.querySelector('[data-dnf-btn]');

//query selectors for delete time modal
const deleteTimeModal = document.querySelector('[data-delete-time-modal]');
const confirmDeleteBtn = document.querySelector(
  '[data-confirm-delete-time-btn]'
);
const cancelDeleteBtn = document.querySelector('[data-cancel-delete-btn]');

//query selectors for stats display
const fastestOfFiveDisplay = document.querySelector('[data-fastest-5]');
const slowestOfFiveDisplay = document.querySelector('[data-slowest-5]');
const averageOfFiveDisplay = document.querySelector('[data-average-5]');
const averageOfTwelveDisplay = document.querySelector('[data-average-12]');
const slowestOfAllDisplay = document.querySelector('[data-slowest-all]');
const fastestOfAllDisplay = document.querySelector('[data-fastest-all]');
const numberOfSolvesDisplay = document.querySelector('[data-number-solves]');
const overallAverageDisplay = document.querySelector('[data-average-all]');

// array of time objects and local storage key
const LOCAL_STORAGE_LIST_KEY = 'saved.times';
export let timesArray =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// function to save to local storage
export function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(timesArray));
}

//class to create time objects
export class Time {
  constructor(recordedTime, scramble) {
    this.recordedTime = recordedTime;
    this.dnfValue = false;
    this.id = Date.now() + Math.random();
    this.formattedTime = formatTime(this.recordedTime);
    this.scramble = scramble;
    this.date = moment();
  }
  //function to toggle dnf value between true and false
  setDnf() {
    if (this.dnfValue) {
      this.dnfValue = false;
    } else if (!this.dnf) {
      this.dnfValue = true;
    }
  }
}

//function to push new time to times array
export function pushNewTime(recordedTime, scramble) {
  timesArray.unshift(new Time(recordedTime, scramble));
}

//functions to hide and show timer message
export function hideTimerMessage() {
  timerMessage.classList.add('hidden');
}

export function showTimerMessage() {
  timerMessage.classList.remove('hidden');
}

//functions to hide show control buttons
export function hideControlBtns() {
  controlBtnsContainer.classList.add('hidden');
}

export function showControlBtns() {
  controlBtnsContainer.classList.remove('hidden');
}

//function to toggle selected class on dnf btn
export function deselectDnfBtn() {
  dnfBtn.classList.remove('selected');
}

// function to delete time from array
function deleteCurrentTime() {
  let timeId = timesArray[0].id;
  timesArray = timesArray.filter((times) => times.id !== timeId);
}

// function to filter out the times where the cube was not finished
export function filterDnfTimes() {
  let filteredArray = timesArray.filter((time) => time.dnfValue === false);
  return filteredArray;
}

//function to render stats display
export function renderStatsDisplay() {
  fastestOfFiveDisplay.textContent = findFastestOfFive();
  averageOfFiveDisplay.textContent = findAverageOfFive();
  slowestOfFiveDisplay.textContent = findSlowestOfFive();
  averageOfTwelveDisplay.textContent = findAverageOfTwelve();
  overallAverageDisplay.textContent = findAverageOfAll();
  slowestOfAllDisplay.textContent = findSlowestOverall();
  fastestOfAllDisplay.textContent = findFastestOverall();
  numberOfSolvesDisplay.textContent = findAmountOfSolves();
}
// functions to calculate each stat in display
// calculates the fastest of the last 5
function findFastestOfFive() {
  let filteredArray = filterDnfTimes().slice(0, 6);
  if (filteredArray.length < 5) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.sort((a, b) => a.recordedTime - b.recordedTime)[0]
        .recordedTime
    );
  }
}
// calculates the average of the last 5
function findAverageOfFive() {
  let filteredArray = filterDnfTimes().slice(0, 6);
  if (filteredArray.length < 5) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.reduce((a, b) => a + b.recordedTime, 0) / 5
    );
  }
}

// calculates the slowest of 5
function findSlowestOfFive() {
  let filteredArray = filterDnfTimes().slice(0, 6);
  if (filteredArray.length < 5) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.sort((a, b) => b.recordedTime - a.recordedTime)[0]
        .recordedTime
    );
  }
}

// calculates the average of 12
function findAverageOfTwelve() {
  let filteredArray = filterDnfTimes().slice(0, 13);
  if (filteredArray.length < 12) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.reduce((a, b) => a + b.recordedTime, 0) / 12
    );
  }
}

// calculates the average of all
function findAverageOfAll() {
  let filteredArray = filterDnfTimes();
  if (filteredArray.length <= 1) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.reduce((a, b) => a + b.recordedTime, 0) /
        filteredArray.length
    );
  }
}

// calculates the slowest of all
function findSlowestOverall() {
  let filteredArray = filterDnfTimes();
  if (filteredArray.length < 1) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.sort((a, b) => b.recordedTime - a.recordedTime)[0]
        .recordedTime
    );
  }
}

// calculates fastest overall
function findFastestOverall() {
  let filteredArray = filterDnfTimes();
  if (filteredArray.length < 1) {
    return 'N/A';
  } else {
    return formatTime(
      filteredArray.sort((a, b) => a.recordedTime - b.recordedTime)[0]
        .recordedTime
    );
  }
}

//finds the overall number of solves not including unfinished
function findAmountOfSolves() {
  let filteredArray = filterDnfTimes();
  if (filteredArray.length < 1) {
    return 'N/A';
  } else {
    return filteredArray.length;
  }
}

// function to clear history
export function clearHistory() {
  localStorage.clear();
  timesArray = [];
  saveToLocalStorage();
  resetStopWatchDisplay();
  hideControlBtns();
  showTimerMessage();
  renderStatsDisplay();
  renderTable(timesArray);
}

// function to delete time from time array
export function deleteTimes(e) {
  if (timesArray.length === 0) {
    return;
  }
  timesArray = timesArray.filter((time) => time.id != e.target.id);
  resetStopWatchDisplay();
  hideControlBtns();
  showTimerMessage();
  saveToLocalStorage();
  renderStatsDisplay();
  renderTable(timesArray);
}

export function resetAllTimerAndStats(){
  resetStopWatchDisplay();
  hideControlBtns();
  showTimerMessage();
  renderStatsDisplay();
  saveToLocalStorage();
}

// event listeners for control btns

deleteBtn.addEventListener('click', function (e) {
  deleteTimeModal.style.display = 'flex';
  e.stopPropagation();
});

dnfBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  dnfBtn.classList.toggle('selected');
  timesArray[0].setDnf();
  renderStatsDisplay();
  timerMessage.focus();
  dnfBtn.blur();
  saveToLocalStorage();
});

// modal btn event listeners
//confirm delete time
confirmDeleteBtn.addEventListener('click', function (e) {
  deleteTimeModal.style.display = 'none';
  deleteCurrentTime();
  resetAllTimerAndStats();
});

//cancel delete and close modal
cancelDeleteBtn.addEventListener('click', function () {
  deleteTimeModal.style.display = 'none';
  resetAllTimerAndStats();
});

// close modal if click outside

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
  if (event.target == deleteTimeModal) {
    deleteTimeModal.style.display = 'none';
  }
});
