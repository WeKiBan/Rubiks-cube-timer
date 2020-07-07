import { relativeTimeThreshold } from 'moment';
import { formatTime } from './timer';
import {timerContainer} from './timer';
import {resetStopWatchDisplay} from './timer'
// query selector for message under timer and control buttons
const timerMessage = document.querySelector('[data-timer-message]');
const controlBtnsContainer = document.querySelector(
  '[data-control-btns-container'
);
const deleteBtn = controlBtnsContainer.querySelector('[data-delete-btn]');
const dnfBtn = controlBtnsContainer.querySelector('[data-dnf-btn]');

// array of time objects
let timesArray = [];

//class to create time objects
export class Time {
  constructor(recordedTime) {
    this.recordedTime = recordedTime;
    this.dnfValue = false;
    this.id = Date.now() + Math.random();
    this.formattedTime = formatTime(this.recordedTime);
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
export function pushNewTime(recordedTime) {
  timesArray.push(new Time(recordedTime));
  console.log(timesArray);
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
function deleteTime(timeId){
    timesArray = timesArray.filter(time => time.id !== timeId);
}

// event listeners for control btns

deleteBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  let currentId = timesArray[0].id;
  deleteTime(currentId);
  resetStopWatchDisplay();
  hideControlBtns();
  showTimerMessage();
  console.log(timesArray);
});

dnfBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  dnfBtn.classList.toggle('selected');
  timesArray[0].setDnf();
  console.log(timesArray[0]);
});
