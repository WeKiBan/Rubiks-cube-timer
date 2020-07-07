// required modules to make stopwatch work
const Stopwatch = require('statman-stopwatch');
var moment = require('moment');
var momentDurationFormatSetup = require('moment-duration-format');
import { updateScrambleDisplay } from './scramble';
import { hideShowNavButtons } from './nav-btns';
import { showTimerMessage } from './data-and-controls';
import { hideTimerMessage } from './data-and-controls';
import { showControlBtns } from './data-and-controls';
import { hideControlBtns } from './data-and-controls';
import { deselectDnfBtn } from './data-and-controls';
import { pushNewTime } from './data-and-controls';

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
  //stop the stop watch and update stopwatchRunning to false
  stopwatch.stop();
  stopwatchRunning = false;
  //show nav btns
  hideShowNavButtons();
  //show control btns
  showControlBtns();
  //change background color
  changeBackgroundColor();
  // clear the interval timer
  clearInterval(timerInterval);
  // read the time from the stopwatch
  time = moment.duration(Number(stopwatch.read()), 'milliseconds');
   // update timer display with formatted time;
   timerDisplay.textContent = formatTime(time);
  //push the time to the times array
  pushNewTime(time);
  //reset the stopwatch
  stopwatch.reset();
  updateScrambleDisplay();
}

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
    time = moment.duration(stopwatch.read(), 'milliseconds');
    // update timer display with formatted time;
    timerDisplay.textContent = formatTime(time);
  }, 1);
}

// function to format time into readable format
export function formatTime(time) {
  return time.format('mm:ss.SSS', { trim: false });
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
export function resetStopWatchDisplay(){
  timerContainer.style.backgroundColor = blue;
  stopwatch.reset();
  time = moment.duration(stopwatch.read(), 'milliseconds');
  timerDisplay.textContent = formatTime(time);
}