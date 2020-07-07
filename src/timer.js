// required modules to make stopwatch work
const Stopwatch = require('statman-stopwatch');
var moment = require('moment');
var momentDurationFormatSetup = require('moment-duration-format');
import { updateScrambleDisplay } from './scramble';
import { hideShowNavButtons } from './nav-btns';

// query selectors for timer
const timerDisplay = document.querySelector('[data-timer-display]');
const timerContainer = document.querySelector('[data-timer-container]');

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
  //show nav btns
  hideShowNavButtons();
  //change background color
  changeBackgroundColor();
  // clear the interval timer
  clearInterval(timerInterval);
  //stop the stop watch and update stopwatchRunning to false
  stopwatch.stop();
  stopwatchRunning = false;
  // read the time from the stopwatch
  time = moment.duration(Number(stopwatch.read()), 'milliseconds');
  //reset the stopwatch
  stopwatch.reset();
  updateScrambleDisplay();
}

function startStopwatch() {
  //hide nav btns
  hideShowNavButtons();
  //change background color
  changeBackgroundColor();
  // start stopwatch and update stopwatchRunning to true;
  stopwatch.start();
  stopwatchRunning = true;
  //set timer interval to update every millisecond
  timerInterval = setInterval(() => {
    time = moment.duration(stopwatch.read(), 'milliseconds');
    // update timer display with formatted time;
    timerDisplay.textContent = time.format('mm:ss.SSS', { trim: false });
  }, 1);
}

// function to change background color
function changeBackgroundColor() {
  if (stopwatchRunning) {
    timerContainer.style.backgroundColor = red;
  } else if (!stopwatchRunning) {
    timerContainer.style.backgroundColor = green;
  }
}

