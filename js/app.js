var timerApp = {};   


/*********************
* timerApp State
**********************/
timerApp.state = {};
timerApp.state.milliseconds = 0;
timerApp.state.laps = [];
timerApp.state.lastLap = null;
timerApp.state.intervalId = null;


/********************
* timerApp DOM views
**********************/
timerApp.views = {
  'centisecondsDisplay': document.getElementById("centiseconds"),
  'secondsDisplay': document.getElementById("seconds"),
  'startButton': document.getElementById("start"),
  'stopButton': document.getElementById("stop"),
  'lapButton': document.getElementById("lap"),
  'resetButton': document.getElementById("reset"),
   'minutesDisplay': document.getElementById("seconds"),
  'lapsDisplay': document.getElementById('laps')
};


/**********************
* Methods
***********************/
timerApp.updateTimerViews = function(minutes, seconds, centiseconds) {
  // Update DOM 
  timerApp.views.minutesDisplay.innerHTML = minutes;
  timerApp.views.secondsDisplay.innerHTML = seconds;
  timerApp.views.centisecondsDisplay.innerHTML = centiseconds;
};

timerApp.getTimeData = function(milliseconds) {
  // Get minutes, seconds, and centiseconds data
  var centiseconds = Math.ceil(milliseconds/10) % 100;
  var seconds = Math.ceil(milliseconds/1000) % 60000;
  var minutes = Math.ceil(milliseconds / 60000);
  return [minutes, seconds, centiseconds];
}

timerApp.updateTimer = function (milliseconds) {
  timerData = timerApp.getTimeData(milliseconds);
  timerApp.updateTimerViews(timerData[0], timerData[1], timerData[2]);
};

timerApp.startTimer = function() {
  // Toggle visibility of buttons;
  timerApp.views.startButton.className = 'hide';
  timerApp.views.stopButton.className = '';
  timerApp.views.resetButton.className = 'hide';
  timerApp.views.lapButton.className = '';
  
  // Update timer
  timerApp.state.intervalId = window.setInterval(function(){
    timerApp.state.milliseconds += 1;
    timerApp.updateTimer(timerApp.state.milliseconds);
  }, 1);
};

timerApp.stopTimer = function() {
  // Toggle visibility of buttons;
  timerApp.views.startButton.className = '';
  timerApp.views.stopButton.className = 'hide';
  timerApp.views.resetButton.className = '';
  timerApp.views.lapButton.className = 'hide';
  
  window.clearInterval(timerApp.state.intervalId);
};

timerApp.resetTimer = function () {
  window.clearInterval(timerApp.state.intervalId);
  timerApp.state.milliseconds = 0;
  timerApp.updateTimerViews(0, 0 ,0);
  timerApp.clearLaps();
};

timerApp.addLap = function(currentTime, prevLap) {
  var curLap = currentTime - prevLap;
  timerApp.state.laps.push(curLap);
  timerApp.views.lapsDisplay.innerHTML = timerApp.views.lapsDisplay.innerHTML + '<li>' + timerApp.state.laps.length + ' ' + curLap + '</li>';
  return curLap;
};


timerApp.clearLaps = function() {
  timerApp.state.laps = []
  timerApp.lastLap = null;
  timerApp.views.lapsDisplay.innerHTML = '';
};


/*******************
* Event Listeners
*******************/
timerApp.views.startButton.addEventListener("click", function() {
    timerApp.startTimer();
}, false);

timerApp.views.stopButton.addEventListener("click", function(){
  timerApp.stopTimer();
});

timerApp.views.resetButton.addEventListener("click", function(){
  timerApp.resetTimer();
});

timerApp.views.lapButton.addEventListener('click', function() {
  timerApp.addLap(timerApp.state.milliseconds, timerApp.state.lastLap);
});
