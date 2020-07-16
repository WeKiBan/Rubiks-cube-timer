import { timesArray } from './data-and-controls';
import moment from 'moment';
import { deleteTimes } from './data-and-controls';


// query selector for table and sort options
const table = document.querySelector('[data-times-table]');
const sortTimesBtn = document.querySelector('[data-sort-times-btn]')
const sortDatesBtn = document.querySelector('[data-sort-dates-btn]')


// sort variables
let sortTimesDirection = 'descending';
let sortDatesDirection = 'descending';

export function renderTable(sortedTimesArray) {
  clearTable();
  sortedTimesArray.forEach((time) => {
    renderRow(time);
  });
}

function renderRow(time) {
  const date = moment(time.date).format('Do MMM H:mm');
  const formattedTime = time.formattedTime;
  const scramble = time.scramble;
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.innerHTML = `<i id="${time.id}" class="fas fa-trash-alt delete-btn"></i>`
  cell.classList.add('remove-cell')
  cell.addEventListener('click', deleteTimes);
  const rowTemplate = `<tr>
    <td>${formattedTime}</td>
    <td>${scramble}</td>
    <td>${date}</td>
    </tr>`;
  row.innerHTML = rowTemplate;
  row.appendChild(cell);
  table.appendChild(row);
}

function sortTimes(){
  sortDatesDirection = 'descending';
  let sortedArray;
  if(sortTimesDirection === 'descending'){
    sortTimesDirection = 'ascending';
    sortedArray = timesArray.sort((a,b) => a.recordedTime - b.recordedTime)
  } else {
    sortTimesDirection = 'descending';
    sortedArray = timesArray.sort((a,b) => b.recordedTime - a.recordedTime)
  }
  
  renderTable(sortedArray);
}

function sortDates(){
  sortTimesDirection = 'descending';
  let sortedArray;
  if(sortDatesDirection === 'descending'){
    sortDatesDirection = 'ascending';
    sortedArray = timesArray.sort((a,b) => new Date(a.date) - new Date(b.date))
  } else {
    sortDatesDirection = 'descending';
    sortedArray = timesArray.sort((a,b) => new Date(b.date)  - new Date(a.date));
  }
  renderTable(sortedArray);
}

sortTimesBtn.addEventListener('click', sortTimes);

sortDatesBtn.addEventListener('click', sortDates);

export function clearTable() {
  table.innerHTML = '';
}


