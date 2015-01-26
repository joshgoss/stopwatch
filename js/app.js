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
  'lapButton': document.getElementById("lap"),
  'resetButton': document.getElementById("reset"),
   'minutesDisplay': document.getElementById("seconds")
};

/*******************
* Event Listeners
*******************/
timerApp.views.startButton.addEventListener("click", function() {
    timerApp.state.intervalId = window.setInterval(function(){
      timerApp.state.milliseconds += 1;
    });
}, false);

// stopButton.addEventListener("click", function(){
// });

/**********************
* Public Functions
***********************/
timerApp.getMilliseconds = function(milliseconds) {
 
};

timerApp.getCentiseconds = function(milliseconds) {
};

timerApp.getSeconds = function(milliseconds) {
};

timerApp.getMinutes = function(milliseconds) {
};

timerApp.startTimer = function() {
};

timerApp.stopTimer = function() {
  window.clearInterval(intervalId);
};

timerApp.resetTimer = function () {
  window.clearInterval(intervalId);
  window.milliseconds = 0;
  timerApp.state.laps = [];
  timerApp.state.lastLap = null;
};

timerApp.addLap = function(lap) {
  timerApp.state.laps.push(lap);
};

timerApp.calculateLap = function(previousTime, currentTime) {
  return currentTime - currentTime;
};
