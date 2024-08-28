console.log("Welcome to Magic Notes Pro. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function() {
    let noteTitle = document.getElementById("noteTitle").value.trim();
    let addTxt = document.getElementById("addTxt").value.trim();
    let errorMsg = document.getElementById("error-msg");

    // Check if the input fields are empty
    if (addTxt === "") {
        errorMsg.style.display = "block"; // Show error message
        errorMsg.textContent = "Please enter content for the note.";
        return; // Do not add an empty note
    } else {
        errorMsg.style.display = "none"; // Hide error message if input is valid
    }

    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    let note = {
        title: noteTitle,
        text: addTxt
    };

    notesObj.push(note);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    document.getElementById("noteTitle").value = "";
    document.getElementById("addTxt").value = "";
    showNotes();
});

// Function to show notes from localStorage
function showNotes(searchTerm = "") {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];
    let html = "";

    // Filter notes based on searchTerm
    if (searchTerm) {
        notesObj = notesObj.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.text.toLowerCase().includes(searchTerm)
        );
    }

    notesObj.forEach(function(element, index) {
        html += `
            <div class="noteCard">
                <h5>${element.title || 'Untitled Note'}</h5>
                <p>${element.text}</p>
                <button onclick="deleteNote(${index})">🗑 Delete Note</button>
                <button onclick="editNote(${index})">✎ Edit Note</button>
            </div>
        `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p>No notes found. Add a note to get started!</p>`;
    }
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function to edit a note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    let note = notesObj[index];
    document.getElementById("editTitle").value = note.title;
    document.getElementById("editTxt").value = note.text;

    let modal = document.getElementById("editModal");
    let saveBtn = document.getElementById("saveEditBtn");

    modal.style.display = "block";

    saveBtn.onclick = function() {
        let editedTitle = document.getElementById("editTitle").value.trim();
        let editedText = document.getElementById("editTxt").value.trim();

        if (editedText === "") {
            alert("Note content cannot be empty.");
            return;
        }

        notesObj[index] = {
            title: editedTitle,
            text: editedText
        };

        localStorage.setItem("notes", JSON.stringify(notesObj));
        modal.style.display = "none";
        showNotes();
    };
}

// Close the modal when the user clicks on <span> (x)
let closeBtn = document.getElementsByClassName("close-btn")[0];
closeBtn.onclick = function() {
    let modal = document.getElementById("editModal");
    modal.style.display = "none";
};

// Close the modal if the user clicks outside of the modal
window.onclick = function(event) {
    let modal = document.getElementById("editModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Search functionality
let searchInput = document.getElementById('searchTxt');
let searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener("click", function() {
    let searchTerm = searchInput.value.trim().toLowerCase();
    showNotes(searchTerm);
});
