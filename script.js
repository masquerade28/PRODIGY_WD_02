// Variables to track stopwatch state and time
let startTime, lapStartTime, currentTime, elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

// Function to start or stop the stopwatch
function startStopwatch() {
  if (isRunning) {
    stopStopwatch();
  } else {
    // If stopwatch is not running, start or resume
    if (elapsedTime === 0) {
      startTime = Date.now(); // Set start time to current time if starting from zero
    } else {
      startTime = Date.now() - elapsedTime; // Adjust start time if resuming from a paused state
    }
    lapStartTime = startTime; // Set lap start time
    isRunning = true; // Set stopwatch to running state
    updateDisplay(); // Update the displayed time
    requestAnimationFrame(updateStopwatch); // Request animation frame for continuous updating
  }
}

// Function to stop the stopwatch
function stopStopwatch() {
  isRunning = false; // Set stopwatch to not running
  elapsedTime = Date.now() - startTime; // Calculate elapsed time
  updateDisplay(); // Update the displayed time
}

// Function to reset the stopwatch
function resetStopwatch() {
  if (!isRunning) {
    // Only reset if the stopwatch is not running
    elapsedTime = 0; // Reset elapsed time
    lapCount = 1; // Reset lap count
    updateDisplay(); // Update the displayed time
    clearLaps(); // Clear the lap list
  }
}

// Function to record lap time
function lapTime() {
  if (isRunning) {
    const lapTime = Date.now() - lapStartTime; // Calculate lap time
    const formattedTime = formatTime(lapTime); // Format lap time
    addLap(formattedTime); // Add lap to the list
    lapStartTime = Date.now(); // Update lap start time
  }
}

// Function for continuous updating of the stopwatch
function updateStopwatch() {
  if (isRunning) {
    currentTime = Date.now() - startTime; // Calculate current time
    updateDisplay(); // Update the displayed time
    requestAnimationFrame(updateStopwatch); // Request animation frame for continuous updating
  }
}

// Function to update the displayed time and button label
function updateDisplay() {
  const formattedTime = formatTime(isRunning ? currentTime : elapsedTime);
  document.getElementById('time').textContent = formattedTime;
  document.getElementById('start').textContent = isRunning ? 'Stop' : 'Start';
}

// Function to format time in hours, minutes, seconds, and milliseconds
function formatTime(time) {
  // ... (time formatting logic)
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const hours = Math.floor(time / 1000 / 60 / 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

// Function to add a lap to the lap list
function addLap(time) {
  const lapList = document.getElementById('laps');
  const listItem = document.createElement('li');
  listItem.textContent = `Lap ${lapCount}: ${time}`;
  lapList.appendChild(listItem);
  lapCount++;
}

// Function to clear the lap list
function clearLaps() {
  const lapList = document.getElementById('laps');
  lapList.innerHTML = '';
}
