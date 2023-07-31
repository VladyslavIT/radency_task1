import { notes } from './utils/notes';
import { notesTitle } from './utils/notes';


const noticeEl = document.querySelector('.notice');
const barEl = document.querySelector('.bar-list');
const noticeHTML = notes.map(noticeItemMarkup).join('');
const barHTML = notesTitle.map(noticeBarMarkup).join('');
barEl.insertAdjacentHTML('afterbegin', barHTML);
noticeEl.insertAdjacentHTML('beforeend', noticeHTML);

function noticeBarMarkup( title ) {
  return `
  <div class="bar-item">${title}</div>
  `;
}

function noticeItemMarkup({ id, name, createdAt, content, category, dates }) {
  return ` <li class="notice-item" id=${id}>
    <div class="notice-item-icon"></div>
        <p class="notice-item-name">${name}</p>
        <span class="notice-item-create">${createdAt}</span>
        <span class="notice-item-category">${category}</span>
        <p class="notice-item-content">${content}</p>
        <div class="notice-item-dates">
        <ul>
        ${dates.map(date => `<li>${date}</li>`).join('')}
        </ul>
        </div>
        <div class="notice-item-button">
          <button class="button-change">Ред</button>
          <button class="button-archive">Арх</button>
          <button class="button-delete">Дел</button>
        </div>
  </li>`;
}
