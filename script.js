(function stopwatch() {
  let state = {
    intervalId: null,
    totalElapsed: 0,
    lapElapsed: 0,
    totalStart: 0,
    lapStart: 0,
    laps: []
  };

  const startButton = document.getElementById('start');
  const lapButton = document.getElementById('lap');
  const resetButton = document.getElementById('reset');
  const stopButton = document.getElementById('stop');

  function getMinutes(ms) {
    return Math.floor(ms / 60000) % 60;
  }

  function getSeconds(ms) {
    return Math.floor(ms / 1000) % 60;
  }

  function getCentiseconds(ms) {
    return Math.floor(ms / 10) % 100;
  }

  function formatTime(ms) {
    const minutes = getMinutes(ms);
    const seconds = getSeconds(ms-minutes);
    const centiseconds = getCentiseconds(ms-minutes-seconds);

    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    const c = centiseconds.toString().padStart(2, '0');

    return `${m}:${s}.${c}`;
  }


  function renderTotalTimer(elapsedTime) {
    const totalTimer = document.getElementById('total-timer');
    totalTimer.textContent = formatTime(elapsedTime);
  }

  function renderLapTimer(elapsedTime) {
    const lapTimer = document.getElementById('lap-timer');
    lapTimer.textContent = formatTime(elapsedTime);
  }

  function clearLaps(onlyUi=false) {
    if (!onlyUi) {
       state.laps = [];
    }

    const lapList = document.getElementById('laps');
    lapList.innerHTML = '';
  }

  function renderLaps(laps) {
    const lapList = document.getElementById('laps');

    if (!laps.length) {
      clearLaps();
    } else {
      laps.concat().reverse().forEach(function(elapsed, i) {
        const number = laps.length-i;
        lapList.innerHTML += `<li class="clearfix"><span class="pull-left label">Lap ${number}</span> <span class="pull-right time">${formatTime(elapsed)}</span></li>`;
      });
    }
  }

  function onStartClick(e) {
    // subtract time which has already elapsed from a previously stopped timer
    state.totalStart = (new Date()).getTime() - state.totalElapsed;
    state.lapStart = (new Date()).getTime() - state.lapElapsed;

    stopButton.className = '';
    resetButton.className = 'hidden';
    startButton.className = 'hidden';
    lapButton.className = '';

    state.intervalId = setInterval(function() {
      const curTime = (new Date()).getTime();

      state.totalElapsed = curTime - state.totalStart;
      state.lapElapsed = curTime - state.lapStart;


      renderTotalTimer(state.totalElapsed);
      renderLapTimer(state.lapElapsed);
    }, 10);
  }

  function onStopClick(e) {
    clearInterval(state.intervalId);

    lapButton.className = 'hidden';
    stopButton.className = 'hidden';
    startButton.className = '';
    resetButton.className = '';

    state.intervalId = null;
  }

  function onLapClick(e) {
    clearLaps(true);
    state.laps.push(state.lapElapsed);

    state.lapElapsed = 0;
    state.lapStart = (new Date()).getTime();

    renderLapTimer(state.lapElapsed);
    renderLaps(state.laps);
  }

  function onResetClick(e) {
    state.totalElapsed = 0;
    state.totalStart = 0;
    state.lapElapsed = 0;
    state.lapStart = 0;

    resetButton.className = 'hidden';

    clearLaps();
    renderTotalTimer(state.totalElapsed);
    renderLapTimer(state.lapElapsed);
    renderLaps(state.laps);
  }

  renderTotalTimer(state.totalElapsed);
  renderLapTimer(state.lapElapsed);

  startButton.addEventListener('click', onStartClick);
  lapButton.addEventListener('click', onLapClick);
  stopButton.addEventListener('click', onStopClick);
  resetButton.addEventListener('click', onResetClick);
})();
