import { relativeTimeThreshold } from 'moment';
import { formatTime } from './timer';
import { timerContainer } from './timer';
import { resetStopWatchDisplay } from './timer';
// query selector for message under timer and control buttons
const timerMessage = document.querySelector('[data-timer-message]');
const controlBtnsContainer = document.querySelector(
  '[data-control-btns-container'
);
const deleteBtn = controlBtnsContainer.querySelector('[data-delete-btn]');
const dnfBtn = controlBtnsContainer.querySelector('[data-dnf-btn]');

//query selectors for stats display
const fastestOfFiveDisplay = document.querySelector('[data-fastest-5]');
const slowestOfFiveDisplay = document.querySelector('[data-slowest-5]');
const averageOfFiveDisplay = document.querySelector('[data-average-5]');
const averageOfTwelveDisplay = document.querySelector('[data-average-12]');
const slowestOfAllDisplay = document.querySelector('[data-slowest-all]');
const fastestOfAllDisplay = document.querySelector('[data-fastest-all]');
const numberOfSolvesDisplay = document.querySelector('[data-number-solves]');
const overallAverageDisplay = document.querySelector('[data-average-all]');

// array of time objects
let timesArray = [];

//class to create time objects
export class Time {
  constructor(recordedTime, scramble) {
    this.recordedTime = recordedTime;
    this.dnfValue = false;
    this.id = Date.now() + Math.random();
    this.formattedTime = formatTime(this.recordedTime);
    this.scramble = scramble;
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
function deleteTime(timeId) {
    timesArray = timesArray.filter(times => times.id !== timeId);
}

function filterDnfTimes() {
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
        filteredArray.reduce((a, b) => a + b.recordedTime, 0) / filteredArray.length
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

  function findAmountOfSolves(){
    let filteredArray = filterDnfTimes();
    if(filteredArray.length < 1){
        return 'N/A';
    } else {
        return filteredArray.length
    }
  }

// event listeners for control btns

deleteBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  let currentId = timesArray[0].id;
  deleteTime(currentId);
  resetStopWatchDisplay();
  hideControlBtns();
  showTimerMessage();
  renderStatsDisplay();
});

dnfBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  dnfBtn.classList.toggle('selected');
  timesArray[0].setDnf();
  renderStatsDisplay();
});
