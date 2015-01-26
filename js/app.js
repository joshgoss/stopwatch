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
    timerApp.startTimer();
}, false);

// stopButton.addEventListener("click", function(){
// });


/**********************
* Methods
***********************/
timerApp.getCentiSeconds = function(milliseconds) {
  if (milliseconds >= 10) {
    return [milliseconds / 10, milliseconds % 10];
  } else {
    return [0, 0]
  }
};

timerApp.getSeconds = function(milliseconds) {
  if (milliseconds >= 1000) {
    return [milliseconds / 1000, milliseconds % 1000];
  } else {
    return [0, 0]
  }
};

timerApp.getMinutes = function(milliseconds) {
  if (milliseconds >= 60000) {
    return [milliseconds / 60000, milliseconds % 60000] ;
    return 
  } else {
    return [0, 0];
  }
};

timerApp.updateTimerView = function(milliseconds) {
  var timeData = null;
  var remainingMilliseconds = null;
  var minutes = null;
  var seconds = null;
  var centiseconds = null;

  // Get minutes
  timeData = getMinutes(milliseconds);
  minutes = timeData[0];
  var remainingMilliseconds = timeData=[1];
  
  // Get seconds
  timeData = getSeconds(milliseconds);
  seconds = timeData[0];
  remainingMilliseconds = timeData[1];
  
  //Get centiseconds
  timeData = getCentiSeconds(milliseconds);
  centiseconds = timeData[0];
};

timerApp.startTimer = function() {
    timerApp.state.intervalId = window.setInterval(function(){
      timerApp.state.milliseconds += 1;
      timerApp.updateTimerView(timerApp.state.milliseconds);
    });
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
