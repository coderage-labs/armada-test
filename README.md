# Todo List App

A simple, clean todo list application built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ Add new todo items
- ✅ Mark items as complete/incomplete
- ✅ Delete items
- ✅ Local storage persistence (todos survive page reloads)
- ✅ Responsive design
- ✅ Clean, modern UI

## Usage

Simply open `index.html` in your browser. No build process or dependencies required.

- **Add a todo:** Type in the input field and press Enter or click "Add"
- **Complete a todo:** Click the checkbox next to the item
- **Delete a todo:** Click the "Delete" button

All todos are automatically saved to browser localStorage and will persist across sessions.

## Technical Details

- **Data Model:** Each todo has `{id, text, completed}` structure
- **Storage:** localStorage key `todos`
- **No frameworks:** Pure vanilla JavaScript ES6+
- **Browser Support:** Modern browsers with localStorage support

## Files

- `index.html` - Application structure
- `styles.css` - Styling and responsive design
- `app.js` - Todo logic and localStorage integration
