import { timesArray } from './data-and-controls';
import moment from 'moment';
// query selector for table
const table = document.querySelector('[data-times-table]');
import { deleteTimes } from './data-and-controls';

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

export function clearTable() {
  table.innerHTML = '';
}
