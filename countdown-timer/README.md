# Countdown Timer

A simple, elegant countdown timer web application built with vanilla HTML, CSS, and JavaScript.

## Features

- ⏱️ Set custom minutes and seconds
- ▶️ Start/pause/resume controls
- 🔄 Reset functionality
- 📢 Alert notification when timer completes
- 🎨 Clean, modern UI with visual feedback
- 📱 Responsive design for mobile devices
- ⌨️ Keyboard support (Enter to start)

## Usage

1. Open `index.html` in a web browser
2. Enter the desired minutes (0-99) and seconds (0-59)
3. Click **Start** to begin the countdown
4. Use **Pause** to temporarily stop the timer (can be resumed)
5. Use **Reset** to clear the timer and return to input mode

## Visual States

- **Idle**: Default gray display
- **Running**: Blue background indicates active countdown
- **Paused**: Orange background shows paused state
- **Finished**: Red background with pulse animation when complete

## Keyboard Shortcuts

- Press **Enter** in either input field to start the timer

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `script.js` - Timer logic and controls
- `README.md` - This file

## Technical Details

- No frameworks or dependencies required
- Uses `setInterval` for countdown logic
- Input validation prevents invalid values
- State management for timer phases
- Accessible and responsive design

## License

Free to use and modify.
