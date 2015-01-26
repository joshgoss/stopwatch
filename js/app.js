var timerApp = {};

/*********************
* Private Attributes
**********************/
timerApp.milliseconds = 0;
timerApp.laps = [];
timerApp.lastLap = null;

timerApp.views = {
  'centisecondsDisplay': document.getElementById("centiseconds"),
  'secondsDisplay': document.getElementById("seconds"),
  'startButton': document.getElementById("start"),
  'lapButton': document.getElementById("lap"),
  'resetButton': document.getElementById("reset"),
   'minutesDisplay': document.getElementById("seconds")
};


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
  timerApp.laps = [];
  timerApp.lastLap = null;
};

timerApp.addLap = function(lap) {
  timerApp.laps.push(lap);
};

timerApp.calculateLap = function(previousTime, currentTime) {
  return currentTime - currentTime;
};

var minutesDisplay = document.getElementById("minutes");
var laps = [];
var intervalId = null;


var milliseconds = 0;

var updateTime = function() {
    centisecondsDisplay.innerHTML = centiseconds;
    secondsDisplay.innerHTML = seconds;
    minutesDisplay.innerHTML = minutes;
};


startButton.addEventListener("click", function() {
    intervalId = window.setInterval(function(){
        centiseconds += 1;
        console.log("centisecond passed");
        updateTime();
    }, 100);
}, false);

// stopButton.addEventListener("click", function(){
// });



