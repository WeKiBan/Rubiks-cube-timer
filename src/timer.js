// required modules to make stopwatch work
const Stopwatch = require('statman-stopwatch');
var moment = require('moment');
var momentDurationFormatSetup = require('moment-duration-format');

// query selectors for timer
var timerDisplay = document.querySelector('[data-timer-display]');

// variables for stopwatch
const stopwatch = new Stopwatch();
let stopwatchRunning = false;
let time;
let timerInterval;

// event listeners for stopwatch

document.addEventListener('keyup', (e) => {
  if (!stopwatchRunning && e.code === 'Space') {
    startStopwatch();
  } else if (stopwatchRunning && e.code === 'Space') {
    stopStopwatch();
  }
});

function stopStopwatch() {
  // clear the interval timer
  clearInterval(timerInterval);
  //stop the stop watch and update stopwatchRunning to false
  stopwatch.stop();
  stopwatchRunning = false;
  // read the time from the stopwatch
  time = moment.duration(Number(stopwatch.read()), 'milliseconds');
  //reset the stopwatch
  stopwatch.reset();
}

function startStopwatch() {
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
