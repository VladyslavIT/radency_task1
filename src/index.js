import { notes, categories } from './utils/notes.js';

const notesTable = document.getElementById('notes-table');
const summaryTable = document.getElementById('summary-table');
const addNoteBtn = document.getElementById('add-note-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalSaveBtn = document.getElementById('modal-save-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const editModalOverlay = document.getElementById('edit-modal-overlay');
const editModalSaveBtn = document.getElementById('edit-modal-save-btn');
const editModalCancelBtn = document.getElementById('edit-modal-cancel-btn');

let editNoteId;

function showAddNoteModal() {
    modalOverlay.style.display = 'block';
}

function hideAddNoteModal() {
    modalOverlay.style.display = 'none';
}

function updateTables() {
    updateNotesTable();
    updateSummaryTable();
}

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

function createSummaryRow(category, activeCount, archivedCount) {
    return `
        <tr>
            <td>${category}</td>
            <td>${activeCount}</td>
            <td>${archivedCount}</td>
        </tr>
    `;
}

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
        button.addEventListener('click', handleDeleteButtonClick);
    });
}

function handleEditButtonClick(event) {
    const noteId = event.target.dataset.noteId;
    const note = notes.find(note => note.id === parseInt(noteId));
    if (!note) {
        alert("Note not found!");
        return;
    }
    showEditNoteModal(note);
}

function updateSummaryTable() {
  const summaryData = [];
  categories.forEach(category => {
      const activeCount = notes.filter(note => !note.archived && note.category === category).length;
      const archivedCount = notes.filter(note => note.archived && note.category === category).length;
      summaryData.push({ category, activeCount, archivedCount });
  });

  const summaryHTML = summaryData.map(data => createSummaryRow(data.category, data.activeCount, data.archivedCount)).join('');
  summaryTable.querySelector('tbody').innerHTML = summaryHTML;
}

function showEditNoteModal(note) {
    editNoteId = note.id;
    document.getElementById('edit-note-content-input').value = note.content;
    document.getElementById('edit-note-category-input').value = note.category;
    document.getElementById('edit-note-dates-input').value = note.dates.join(', ');
    editModalOverlay.style.display = 'block';

    editModalSaveBtn.addEventListener('click', handleEditNoteSave);
    editModalCancelBtn.addEventListener('click', hideEditNoteModal);
}

function handleEditNoteSave() {
    const content = document.getElementById('edit-note-content-input').value.trim();
    const category = document.getElementById('edit-note-category-input').value;
    const datesInput = document.getElementById('edit-note-dates-input').value;
    const dates = parseDatesInput(datesInput);

    if (!content) {
        alert('Please enter note content.');
        return;
    }

    const note = notes.find(note => note.id === editNoteId);
    if (!note) {
        alert("Note not found!");
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

function handleArchiveButtonClick(event) {
    const noteId = event.target.dataset.noteId;
    archiveNote(parseInt(noteId));
}

function archiveNote(id) {
    const note = notes.find(note => note.id === id);
    if (!note) {
        alert("Note not found!");
        return;
    }
    note.archived = true;
    updateTables();
}

function handleDeleteButtonClick(event) {
    const noteId = event.target.dataset.noteId;
    deleteNote(parseInt(noteId));
}

function deleteNote(id) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
        alert("Note not found!");
        return;
    }
    notes.splice(noteIndex, 1);
    updateTables();
}

function parseDatesInput(datesInput) {
    const datesArray = datesInput.split(',').map(date => date.trim());
    return datesArray.filter(date => date !== '');
}

function addNewNote() {
    showAddNoteModal();

    modalSaveBtn.addEventListener('click', function () {
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

        notes.push(newNote);
        updateTables();
        hideAddNoteModal();
    });

    modalCancelBtn.addEventListener('click', function () {
        hideAddNoteModal();
    });
}

// Event listeners
addNoteBtn.addEventListener('click', addNewNote);

// Call updateTables() to display the initial data on page load
updateTables();
