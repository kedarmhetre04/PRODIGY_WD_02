let isRunning = false;
let startTime;
let laps = [];

function startStop() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}

function start() {
    isRunning = true;
    startTime = new Date().getTime() - laps.reduce((total, lap) => total + lap, 0);
    update();
    document.querySelector('button').textContent = 'Stop';
}

function stop() {
    isRunning = false;
    document.querySelector('button').textContent = 'Start';
}

function reset() {
    stop();
    document.getElementById('display').textContent = '00:00:00';
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function update() {
    timer = setInterval(function () {
        if (isRunning) {
            const elapsedMilliseconds = new Date().getTime() - startTime;
            document.getElementById('display').textContent = formatTime(elapsedMilliseconds);
        }
    }, 10);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();

    return (
        pad(hours) + ':' +
        pad(minutes) + ':' +
        pad(seconds) + '.' +
        padMilliseconds(ms)
    );
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function padMilliseconds(value) {
    return value.toString().padStart(3, '0');
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(lapItem);
    });
}
