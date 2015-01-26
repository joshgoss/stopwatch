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
  'lapButton': document.getElementById("lap"),
  'resetButton': document.getElementById("reset"),
   'minutesDisplay': document.getElementById("seconds")
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

timerApp.updateTimer = function (milliseconds) {
  // Get minutes, seconds, and centiseconds data
  var centiseconds = Math.ceil(milliseconds/10) % 100;
  var seconds = Math.ceil(milliseconds/1000) % 60000;
  var minutes = Math.ceil(milliseconds / 60000);
  
  timerApp.updateTimerViews(minutes, seconds, centiseconds);
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
  window.milliseconds = 0;
  timerApp.state.laps = [];
  timerApp.state.lastLap = null;
  timerApp.updateTimerViews(0, 0 ,0);
};

timerApp.addLap = function(lap) {
  timerApp.state.laps.push(lap);
};

timerApp.calculateLap = function(previousTime, currentTime) {
  return currentTime - currentTime;
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
