# 📝 Minimal Notes

A premium, high-aesthetic client-side web application for organizing, editing, and managing your personal notes. Features a modern dark theme with glassmorphism touches, auto-save capabilities, rich-text editing via Quill.js, and document import support (including Microsoft Word `.docx`, Markdown, and plain text files).

---

## ✨ Features

- **🎨 Modern Dark Aesthetic**: Crafted with a premium dark-mode interface, fluid animations, micro-interactions, custom scrollbars, and a clean minimalist sidebar.
- **✍️ Rich Text Editing**: Full-featured WYSIWYG editor powered by Quill.js supporting headings, blockquotes, lists (bullet and numbered), inline styling (bold, italic, underline, strike), code blocks, and hyperlinks.
- **📂 Document Import Engine**:
  - **Word Documents (`.docx`, `.doc`)**: Integrated parser via Mammoth.js converts DOCX structures into clean, semantic HTML on the fly.
  - **Markdown & Plain Text (`.md`, `.txt`)**: Auto-conversion of lines into properly formatted paragraphs.
- **💾 Local Auto-Save**: Real-time backup of note updates and titles to the browser's `localStorage` (no server setup or account needed).
- **⏱️ Smart Sorting**: Real-time list sorting by the last modified timestamp (`updatedAt`).
- **🗑️ Seamless Management**: Quick note creation and secure deletion prompts.

---

## 🛠️ Technology Stack

- **Frontend Core**: HTML5 (Semantic Structure) & ES6+ JavaScript.
- **Styling**: Modern Vanilla CSS3 utilizing premium custom HSL variables, fluid transitions, flexbox layouts, and custom scrollbar overrides.
- **Rich Text Editor**: [Quill.js](https://quilljs.com/) (v1.3.6)
- **Document Parser**: [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (v1.6.0, browser build)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) font family via Google Fonts.

---

## 📁 File Structure

```text
notes-app/
├── index.html   # Main application shell & external dependencies
├── style.css    # UI styling, custom layout variables, and custom theme overrides
├── app.js       # App state controller, event handlers, and Mammoth/Quill adapters
└── README.md    # This file!
```

---

## 🚀 Getting Started

Since **Minimal Notes** is a fully client-side application, there are no build steps, node modules, or complex configurations required!

### Method 1: Local Launch (Simplest)
1. Download or clone this directory.
2. Double-click the [index.html](file:///c:/Users/AlejandroPrietoMende/Desktop/APPS/notes-app/index.html) file to open the app directly in any modern web browser.

### Method 2: Live Server (Recommended for development)
If you are using **VS Code**:
1. Open the `notes-app` folder.
2. Install the **Live Server** extension.
3. Click **Go Live** in the bottom-right corner of the editor to launch a local development server.

---

## 💡 How to Use

### 1. Creating and Selecting Notes
- Click the **`+` (Plus)** button in the sidebar header to create a new, blank note.
- Select any note from the sidebar list to view its contents in the editor area.

### 2. Rich Formatting
- Use the toolbar at the top of the editor area to format your text (headers, lists, bold/italic, etc.).
- Formatting is saved in real-time as you type.

### 3. Importing Files
- Click the **`Upload` (Arrow Up)** icon in the sidebar header.
- Choose a `.docx`, `.doc`, `.txt`, or `.md` file from your local machine.
- The app will automatically parse the file and insert it as a brand-new note with its filename as the title!

### 4. Deleting Notes
- Select the note you wish to delete.
- Click the red **`Trash` (Delete)** icon in the top right of the editor header.
- Confirm the browser dialog to remove the note permanently.

---

## 🎛️ Design Tokens (Customized CSS)

The application uses custom design tokens defined in the `:root` of [style.css](file:///c:/Users/AlejandroPrietoMende/Desktop/APPS/notes-app/style.css):

```css
:root {
    --bg-main: #0a0c10;         /* Deep workspace background */
    --bg-sidebar: #12141c;      /* Modern sidebar tone */
    --bg-hover: #1e2230;        /* Hover and active element backdrops */
    --text-primary: #f8fafc;    /* Highly legible primary text */
    --text-secondary: #94a3b8;  /* Muted metadata and subtitle descriptions */
    --border-color: #202430;    /* Soft dividing borders */
    --accent-color: #3b82f6;    /* Vibrant branding accent blue */
    --radius-md: 12px;          /* Smooth round corners */
    --radius-lg: 16px;          /* Large container corners */
}
```
