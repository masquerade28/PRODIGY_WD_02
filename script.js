
let startTime, lapStartTime, currentTime, elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

function startStopwatch() {
  if (isRunning) {
    stopStopwatch();
  } else {
    if (elapsedTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - elapsedTime;
    }
    lapStartTime = startTime;
    isRunning = true;
    updateDisplay();
    requestAnimationFrame(updateStopwatch);
  }
}

function stopStopwatch() {
  isRunning = false;
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function resetStopwatch() {
  if (!isRunning) {
    elapsedTime = 0;
    lapCount = 1;
    updateDisplay();
    clearLaps();
  }
}

function lapTime() {
  if (isRunning) {
    const lapTime = Date.now() - lapStartTime;
    const formattedTime = formatTime(lapTime);
    addLap(formattedTime);
    lapStartTime = Date.now();
  }
}

function updateStopwatch() {
  if (isRunning) {
    currentTime = Date.now() - startTime;
    updateDisplay();
    requestAnimationFrame(updateStopwatch);
  }
}

function updateDisplay() {
  const formattedTime = formatTime(isRunning ? currentTime : elapsedTime);
  document.getElementById('time').textContent = formattedTime;
  document.getElementById('start').textContent = isRunning ? 'Stop' : 'Start';
}

function formatTime(time) {
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

function addLap(time) {
  const lapList = document.getElementById('laps');
  const listItem = document.createElement('li');
  listItem.textContent = `Lap ${lapCount}: ${time}`;
  lapList.appendChild(listItem);
  lapCount++;
}

function clearLaps() {
  const lapList = document.getElementById('laps');
  lapList.innerHTML = '';
}

