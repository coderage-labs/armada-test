# Stopwatch

A simple, clean stopwatch web application built with vanilla HTML, CSS, and JavaScript.

## Features

- **Start/Pause/Resume**: Control the timer with a single button
- **Lap Recording**: Record lap times while the stopwatch is running or paused
- **Reset**: Clear the timer and all lap times
- **High Precision**: Uses `performance.now()` for accurate timing down to milliseconds
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Keyboard Shortcuts**: 
  - `Space` - Start/Pause/Resume
  - `L` - Record Lap (when enabled)
  - `R` - Reset

## Time Format

Displays time in `mm:ss.ms` format:
- Minutes (00-99)
- Seconds (00-59)
- Milliseconds (000-999)

## Usage

Simply open `index.html` in a web browser. No build process or dependencies required.

## Visual States

- **Idle** (Purple): Default state, ready to start
- **Running** (Green): Timer is actively counting
- **Paused** (Yellow): Timer is stopped but can be resumed

## Implementation Details

- Uses `requestAnimationFrame` for smooth display updates
- State machine pattern (IDLE → RUNNING → PAUSED)
- Lap times displayed newest-first with scrollable list
- Clean minimal UI matching the repository's design aesthetic

## Browser Compatibility

Works in all modern browsers that support:
- `performance.now()`
- `requestAnimationFrame`
- CSS Grid and Flexbox
