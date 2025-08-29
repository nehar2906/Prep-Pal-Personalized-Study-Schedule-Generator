// Select elements
const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

// Load saved notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to render notes
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note");

    noteCard.innerHTML = `
      <button class="delete-btn" onclick="deleteNote(${index})">❌</button>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    `;

    notesContainer.appendChild(noteCard);
  });
}

// Add new note
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (title && content) {
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteForm.reset();
  }
});

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// Initial render
renderNotes();
