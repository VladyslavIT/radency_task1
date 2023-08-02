import { notes, categories } from './js/notes.js';

const notesTable = document.getElementById('notes-table');
const archivedNotesTable = document.getElementById('archived-notes-table');
const unarchiveNoteButtons = document.querySelectorAll('.unarchive-btn');
const summaryTable = document.getElementById('summary-table');
const addNoteBtn = document.getElementById('add-note-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalSaveBtn = document.getElementById('modal-save-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const editModalOverlay = document.getElementById('edit-modal-overlay');
const editModalSaveBtn = document.getElementById('edit-modal-save-btn');
const editModalCancelBtn = document.getElementById('edit-modal-cancel-btn');

let editNoteId;

// Markup function

function createNoteRow(note) {
  const dates = note.dates.join(', ');
  return `
        <tr>
            <td>${note.createdAt}</td>
            <td>${note.content}</td>
            <td>${note.category}</td>
            <td>${dates}</td>
            <td>
                <button class="edit-btn" data-note-id="${note.id}">Edit</button>
                <button class="archive-btn" data-note-id="${note.id}">Archive</button>
                <button class="delete-btn" data-note-id="${note.id}">Delete</button>
            </td>
        </tr>
    `;
}
function createArchivedNoteRow(note) {
  const dates = note.dates.join(', ');
  return `
      <tr>
          <td>${note.createdAt}</td>
          <td>${note.content}</td>
          <td>${note.category}</td>
          <td>${dates}</td>
          <td>
              <button class="unarchive-btn" data-note-id="${note.id}">Unarchive</button>
          </td>
      </tr>
    `;
}
function createSummaryRow(category, activeCount, archivedCount) {
  return `
        <tr>
            <td>${category}</td>
            <td>${activeCount}</td>
            <td>${archivedCount}</td>
        </tr>
    `;
}

// Update function
function updateNotesTable() {
  const activeNotes = notes.filter(note => !note.archived);
  const notesHTML = activeNotes.map(createNoteRow).join('');
  notesTable.querySelector('tbody').innerHTML = notesHTML;

  const editButtons = notesTable.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', handleEditButtonClick);
  });

  const archiveButtons = notesTable.querySelectorAll('.archive-btn');
  archiveButtons.forEach(button => {
    button.addEventListener('click', handleArchiveButtonClick);
  });

  const deleteButtons = notesTable.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteButtonEvent);
  });
}

function updateSummaryTable() {
  const summaryData = [];
  categories.forEach(category => {
    const activeCount = notes.filter(
      note => !note.archived && note.category === category
    ).length;
    const archivedCount = notes.filter(
      note => note.archived && note.category === category
    ).length;
    summaryData.push({ category, activeCount, archivedCount });
  });

  const summaryHTML = summaryData
    .map(data =>
      createSummaryRow(data.category, data.activeCount, data.archivedCount)
    )
    .join('');
  summaryTable.querySelector('tbody').innerHTML = summaryHTML;
}

function updateTables() {
  updateNotesTable();
  updateSummaryTable();
  updateArchivedNotesTable();
}
//   Edit Modal
function handleEditButtonClick(event) {
  const noteId = event.target.dataset.noteId;
  const note = notes.find(note => note.id === parseInt(noteId));
  if (!note) {
    alert('Note not found!');
    return;
  }
  showEditNoteModal(note);
}

function showEditNoteModal(note) {
  editNoteId = note.id;
  document.getElementById('edit-note-content-input').value = note.content;
  document.getElementById('edit-note-category-input').value = note.category;
  document.getElementById('edit-note-dates-input').value =
    note.dates.join(', ');
  editModalOverlay.style.display = 'block';

  editModalSaveBtn.addEventListener('click', handleEditNoteSave);
  editModalCancelBtn.addEventListener('click', hideEditNoteModal);
}

function handleEditNoteSave() {
  const content = document
    .getElementById('edit-note-content-input')
    .value.trim();
  const category = document.getElementById('edit-note-category-input').value;
  const datesInput = document.getElementById('edit-note-dates-input').value;
  const dates = parseDatesInput(datesInput);

  if (!content) {
    alert('Please enter note content.');
    return;
  }

  const note = notes.find(note => note.id === editNoteId);
  if (!note) {
    alert('Note not found!');
    return;
  }

  note.content = content;
  note.category = category;
  note.dates = dates;

  updateTables();
  hideEditNoteModal();
}

function hideEditNoteModal() {
  editModalOverlay.style.display = 'none';
}

// Archive function
function handleArchiveButtonClick(event) {
  const noteId = event.target.dataset.noteId;
  archiveNote(parseInt(noteId));
}

function archiveNote(id) {
  const note = notes.find(note => note.id === id);
  if (!note) {
    alert('Note not found!');
    return;
  }
  note.archived = true;
  updateTables();
}

export function unarchiveNote(id) {
  const note = notes.find(note => note.id === id);
  if (!note) {
    alert('Note not found!');
    return;
  }
  note.archived = false;
  updateArchivedNotesTable();
  updateTables();
}
export function handleUnarchiveButtonEvent(event) {
  const noteId = event.target.dataset.noteId;
  unarchiveNote(parseInt(noteId));
}

function updateArchivedNotesTable() {
  const archivedNotes = notes.filter(note => note.archived);
  const archivedNotesHTML = archivedNotes.map(createArchivedNoteRow).join('');
  archivedNotesTable.querySelector('tbody').innerHTML = archivedNotesHTML;

  const unarchiveButtons =
    archivedNotesTable.querySelectorAll('.unarchive-btn');
  unarchiveButtons.forEach(button => {
    const noteId = button.dataset.noteId;
    button.addEventListener('click', () => handleUnarchiveButtonClick(noteId));
  });

  const deleteButtons = archivedNotesTable.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    const noteId = button.dataset.noteId;
    button.addEventListener('click', () => handleDeleteButtonClick(noteId));
  });

  const editButtons = archivedNotesTable.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', handleEditButtonClick);
  });
}

function handleUnarchiveButtonClick(noteId) {
  unarchiveNote(parseInt(noteId));
}

function handleDeleteButtonClick(noteId) {
  deleteNote(parseInt(noteId));
}
// Delete function

function handleDeleteButtonEvent(event) {
  const noteId = event.target.dataset.noteId;
  deleteNote(parseInt(noteId));
}

function deleteNote(id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    alert('Note not found!');
    return;
  }
  notes.splice(noteIndex, 1);
  updateTables();
}

// Add new note function
function addNewNote() {
  showAddNoteModal();

  const modalSaveBtn = document.getElementById('modal-save-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');

  function onSaveClick() {
    const content = document.getElementById('note-content-input').value.trim();
    const category = document.getElementById('note-category-input').value;
    const datesInput = document.getElementById('note-dates-input').value;
    const dates = parseDatesInput(datesInput);

    if (!content) {
      alert('Please enter note content.');
      return;
    }

    const newNote = {
      id: notes.length + 1,
      createdAt: new Date().toISOString().slice(0, 10),
      content,
      category,
      dates,
      archived: false,
    };

    notes.unshift(newNote);
    updateTables();
    hideAddNoteModal();

    modalSaveBtn.removeEventListener('click', onSaveClick);
  }

  modalSaveBtn.addEventListener('click', onSaveClick);

  modalCancelBtn.addEventListener('click', function () {
    hideAddNoteModal();

    modalSaveBtn.removeEventListener('click', onSaveClick);
  });
}

function showAddNoteModal() {
  modalOverlay.style.display = 'block';
}

function hideAddNoteModal() {
  modalOverlay.style.display = 'none';
}

// For date function
function parseDatesInput(datesInput) {
  const datesArray = datesInput.split(',').map(date => date.trim());
  return datesArray.filter(date => date !== '');
}

document.addEventListener('DOMContentLoaded', () => {
  updateTables();
  updateArchivedNotesTable();
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      hideAddNoteModal();
    }
  });
  editModalOverlay.addEventListener('click', event => {
    if (event.target === editModalOverlay) {
      hideEditNoteModal();
    }
  });
  const unarchiveButtons = archivedNotesTable.querySelectorAll('.delete-btn');
  unarchiveButtons.forEach(button => {
    const noteId = button.dataset.noteId;
    button.addEventListener('click', () => handleUnarchiveButtonClick(noteId));
  });
  addNoteBtn.addEventListener('click', addNewNote);
});
