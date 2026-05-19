document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const notesList = document.getElementById('notes-list');
    const newNoteBtn = document.getElementById('new-note-btn');
    const importFileInput = document.getElementById('import-file');
    const editorEmptyState = document.getElementById('editor-empty-state');
    const editorContent = document.getElementById('editor-content');
    const noteTitleInput = document.getElementById('note-title');
    const deleteNoteBtn = document.getElementById('delete-note-btn');

    // State
    let notes = JSON.parse(localStorage.getItem('minimal_notes')) || [];
    let currentNoteId = null;

    // Initialize
    renderNotesList();

    // Configure custom languages list for Syntax highlighting in Quill 2.0
    const Syntax = Quill.import('modules/syntax');
    Syntax.DEFAULTS.languages = [
        { key: 'javascript', label: 'JavaScript' },
        { key: 'typescript', label: 'TypeScript' },
        { key: 'html', label: 'HTML' },
        { key: 'css', label: 'CSS' },
        { key: 'python', label: 'Python' },
        { key: 'sql', label: 'SQL' }
    ];

    // Initialize Quill
    const quill = new Quill('#editor-container', {
        theme: 'snow',
        placeholder: 'Start typing your note here...',
        modules: {
            syntax: true, // Enable syntax module
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'clean']
            ]
        }
    });

    // Event Listeners
    newNoteBtn.addEventListener('click', createNewNote);
    noteTitleInput.addEventListener('input', saveCurrentNote);
    quill.on('text-change', saveCurrentNote);
    deleteNoteBtn.addEventListener('click', deleteCurrentNote);
    importFileInput.addEventListener('change', importFile);

    // Functions
    function saveNotesToLocal() {
        localStorage.setItem('minimal_notes', JSON.stringify(notes));
    }

    function createNewNote() {
        const newNote = {
            id: Date.now().toString(),
            title: '',
            body: '',
            updatedAt: new Date().toISOString()
        };
        notes.unshift(newNote); // Add to beginning
        saveNotesToLocal();
        renderNotesList();
        selectNote(newNote.id);
    }

    function selectNote(id) {
        currentNoteId = id;
        const note = notes.find(n => n.id === id);
        if (note) {
            noteTitleInput.value = note.title;
            // Only update Quill if it's different to prevent losing cursor position
            if (quill.getSemanticHTML() !== note.body) {
                quill.root.innerHTML = note.body || '';
            }
            
            editorEmptyState.style.display = 'none';
            editorContent.classList.remove('hidden');
            
            renderNotesList(); // Update active class
            quill.focus();
        }
    }

    function saveCurrentNote() {
        if (!currentNoteId) return;
        
        const noteIndex = notes.findIndex(n => n.id === currentNoteId);
        if (noteIndex !== -1) {
            notes[noteIndex].title = noteTitleInput.value;
            notes[noteIndex].body = quill.getSemanticHTML();
            notes[noteIndex].updatedAt = new Date().toISOString();
            
            // Move updated note to top
            const updatedNote = notes.splice(noteIndex, 1)[0];
            notes.unshift(updatedNote);
            
            saveNotesToLocal();
            renderNotesList();
        }
    }

    function deleteCurrentNote() {
        if (!currentNoteId) return;
        
        if (confirm('Are you sure you want to delete this note?')) {
            notes = notes.filter(n => n.id !== currentNoteId);
            saveNotesToLocal();
            currentNoteId = null;
            
            editorEmptyState.style.display = 'flex';
            editorContent.classList.add('hidden');
            
            renderNotesList();
        }
    }

    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function renderNotesList() {
        notesList.innerHTML = '';
        
        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
            
            const title = note.title.trim() || 'Untitled Note';
            const date = formatDate(note.updatedAt);
            
            noteEl.innerHTML = `
                <div class="note-item-title">${escapeHTML(title)}</div>
                <div class="note-item-date">${date}</div>
            `;
            
            noteEl.addEventListener('click', () => selectNote(note.id));
            notesList.appendChild(noteEl);
        });
    }

    function importFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const title = file.name.replace(/\.[^/.]+$/, "");

        if (file.name.toLowerCase().endsWith('.docx')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const arrayBuffer = event.target.result;
                mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                    .then(function(result) {
                        const html = result.value;
                        const newNote = {
                            id: Date.now().toString(),
                            title: title,
                            body: html,
                            updatedAt: new Date().toISOString()
                        };
                        notes.unshift(newNote);
                        saveNotesToLocal();
                        renderNotesList();
                        selectNote(newNote.id);
                    })
                    .catch(function(err) {
                        console.error('Error parsing docx', err);
                        alert('Could not parse Word document.');
                    });
            };
            reader.readAsArrayBuffer(file);
        } else {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target.result;
                // Convert text/markdown lines to paragraphs
                const html = contents.split('\n').map(line => `<p>${escapeHTML(line)}</p>`).join('');
                
                const newNote = {
                    id: Date.now().toString(),
                    title: title,
                    body: html,
                    updatedAt: new Date().toISOString()
                };
                
                notes.unshift(newNote);
                saveNotesToLocal();
                renderNotesList();
                selectNote(newNote.id);
            };
            reader.readAsText(file);
        }
        
        // Reset input
        importFileInput.value = '';
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
});
