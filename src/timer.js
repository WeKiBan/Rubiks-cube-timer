// required modules to make stopwatch work
const Stopwatch = require('statman-stopwatch');
var moment = require('moment');
var momentDurationFormatSetup = require('moment-duration-format');
import { updateScrambleDisplay } from './scramble';
import { hideShowNavButtons } from './stats-settings-menu';
import { showTimerMessage, timesArray } from './data-and-controls';
import { hideTimerMessage } from './data-and-controls';
import { showControlBtns } from './data-and-controls';
import { hideControlBtns } from './data-and-controls';
import { deselectDnfBtn } from './data-and-controls';
import { pushNewTime } from './data-and-controls';
import { renderStatsDisplay } from './data-and-controls';
import { currentScramble, scrambleDisplay } from './scramble';
import { saveToLocalStorage } from './data-and-controls';

// query selectors for timer
const timerDisplay = document.querySelector('[data-timer-display]');
export const timerContainer = document.querySelector('[data-timer-container]');

// variables for stopwatch
const stopwatch = new Stopwatch();
let stopwatchRunning = false;
let time;
let timerInterval;

// color variables
const blue = '#8585ff';
const red = '#ff7070';
const green = '#8deb8d';
const orange = '#ffc077';

// event listeners for stopwatch

document.addEventListener('keyup', (e) => {
  if (!stopwatchRunning && e.code === 'Space') {
    startStopwatch();
  } else if (stopwatchRunning && e.code === 'Space') {
    stopStopwatch();
  }
});


timerContainer.addEventListener('click', function (e) {
  if (!stopwatchRunning) {
    startStopwatch();
  } else if (stopwatchRunning) {
    stopStopwatch();
  }
});



//functions to start and stop stopwatch

function stopStopwatch() {
  //change background color
  changeBackgroundColor();
  //stop the stop watch and update stopwatchRunning to false
  stopwatch.stop();
  stopwatchRunning = false;
  //show nav btns
  hideShowNavButtons();
  //show control btns
  showControlBtns();
  // clear the interval timer
  clearInterval(timerInterval);
  // read the time from the stopwatch
  time = stopwatch.read();
  // update timer display with formatted time;
  timerDisplay.textContent = formatTime(time);
  //push the time to the times array
  pushNewTime(time, currentScramble);
  //render the stats display
  renderStatsDisplay();
  //reset the stopwatch
  stopwatch.reset();
  updateScrambleDisplay();
  saveToLocalStorage();
}

//changes background color to orange while spacebar is held down before timer starts
document.body.onkeydown = function (e) {
  if (!stopwatchRunning && e.code === 'Space') {
    timerContainer.style.backgroundColor = orange;
  }
};

//changes background color to orange on mousedown befre time starts
timerContainer.addEventListener('mousedown', function(e){
  if (!stopwatchRunning && e.target.type !== 'submit') {
    timerContainer.style.backgroundColor = orange;
  }
})

timerContainer.addEventListener('touchstart', function(e){
  if (!stopwatchRunning && e.target.type !== 'submit') {
    timerContainer.style.backgroundColor = orange;
  }
})


function startStopwatch() {
  //hide nav btns, control btns and timer message and deselect dnf btn
  hideShowNavButtons();
  hideTimerMessage();
  hideControlBtns();
  deselectDnfBtn();
  //change background color
  changeBackgroundColor();
  // start stopwatch and update stopwatchRunning to true;
  stopwatch.start();
  stopwatchRunning = true;
  //set timer interval to update every millisecond
  timerInterval = setInterval(() => {
    time = stopwatch.read();
    // update timer display with formatted time;
    timerDisplay.textContent = formatTime(time);
  }, 1);
}

// function to format time into readable format
export function formatTime(time) {
  return moment
    .duration(time, 'milliseconds')
    .format('mm:ss.SSS', { trim: false });
}
// function to change background color
function changeBackgroundColor() {
  if (stopwatchRunning) {
    timerContainer.style.backgroundColor = red;
  } else if (!stopwatchRunning) {
    timerContainer.style.backgroundColor = green;
  }
}

// function to reset the stopwatch and the display
export function resetStopWatchDisplay() {
  timerContainer.style.backgroundColor = blue;
  stopwatch.reset();
  time = moment.duration(stopwatch.read(), 'milliseconds');
  timerDisplay.textContent = formatTime(time);
}
