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
  'timerDisplay': document.getElementById('timer'),
  'startButton': document.getElementById("start"),
  'stopButton': document.getElementById("stop"),
  'lapButton': document.getElementById("lap"),
  'resetButton': document.getElementById("reset"),
  'lapsDisplay': document.getElementById('laps')
};


/**********************
* Methods
***********************/
timerApp.toTwoDigits = function(num) {
  return num >= 10 ? num.toString() : "0" + num.toString();
};

timerApp.updateTimerViews = function(minutes, seconds, centiseconds) {
  // Update DOM 
  timerApp.views.timerDisplay.innerHTML = timerApp.toTwoDigits(minutes) + ':' + timerApp.toTwoDigits(seconds) + ':' + timerApp.toTwoDigits(centiseconds);
};

timerApp.getTimeData = function(milliseconds) {
  // Get minutes, seconds, and centiseconds data
  var centiseconds = Math.floor(milliseconds/10) % 100;
  var seconds = Math.floor(milliseconds/1000) % 60000;
  var minutes = Math.floor(milliseconds / 60000);
  return [minutes, seconds, centiseconds];
}

timerApp.updateTimer = function (milliseconds) {
  timerData = timerApp.getTimeData(milliseconds);
  timerApp.updateTimerViews(timerData[0], timerData[1], timerData[2]);
};

timerApp.startTimer = function() {
  // Toggle visibility of buttons;
  timerApp.views.startButton.className = 'hide';
  timerApp.views.stopButton.className = 'red';
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
  timerApp.views.startButton.className = 'green';
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

timerApp.addLap = function(currentTime) {
  var curLap = null;
  var timeData = null
  var timeStr = null;
  
  if (timerApp.state.lastLap === null) {
    timerApp.state.lastLap = 0;
  }
  
  curLap = currentTime - timerApp.state.lastLap;
  timerApp.state.laps.push(curLap);
  timerApp.state.lastLap = currentTime;

  timeData = timerApp.getTimeData(curLap);
  timeStr = timerApp.toTwoDigits(timeData[0]) + ':' + timerApp.toTwoDigits(timeData[1]) + ':' + timerApp.toTwoDigits(timeData[2]);
  

  timerApp.views.lapsDisplay.innerHTML = '<li class="group">' + '<span class="pull-left">Lab ' + timerApp.state.laps.length + '</span> <span class="pull-right">' + timeStr +'</span></li>'+ timerApp.views.lapsDisplay.innerHTML;
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
  timerApp.addLap(timerApp.state.milliseconds);
});
