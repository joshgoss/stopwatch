var timerApp = (function(){
  /**********************
   * Private Attributes 
   **********************/
  var _centiseconds = 0;
  var _laps = [];
  var _lastLap = 0;
  var _interValId = null;
  var _lapElapsed = null;


  /********************* 
   * Private Methods 
   ***********************/
  var _toTwoDigits = function(num) {
    return num >= 10 ? num.toString() : "0" + num.toString();
  };

  var _updateTimerViews = function(minutes, seconds, centiseconds) {
    var elm = document.getElementById('timer');
    // Update DOM 
    elm.innerHTML = _toTwoDigits(minutes) + ':' + _toTwoDigits(seconds) + '.' + _toTwoDigits(centiseconds);
  };
  
  
  var _getTimeData = function(centiseconds) {
    // Get minutes, seconds, and centiseconds data
    var updatedCentiseconds = Math.floor(centiseconds) % 100;
    var seconds = Math.floor(centiseconds/100) % 60;
    var minutes = Math.floor(centiseconds / 6000);
    return [minutes, seconds, updatedCentiseconds];
  };

  var _updateLapTimer = function(centiseconds) {
    var elm = document.getElementById('lap-timer');
    var time = centiseconds - _lastLap;
    var timeData = _getTimeData(time);
    elm.innerHTML = _toTwoDigits(timeData[0]) + ':' + _toTwoDigits(timeData[1]) + '.' + _toTwoDigits(timeData[2]);
  };

  var _updateTimer = function (centiseconds) {
    var timerData = _getTimeData(centiseconds);
    _updateTimerViews(timerData[0], timerData[1], timerData[2]);
  };

  var _clearLaps = function() {
    var lapsElm = document.getElementById('laps');
    var lapTimerElm = document.getElementById('lap-timer');
    _laps = [];
    _lastLap = null;
    _lapElapsed = 0;
    lapsElm.innerHTML = '';
    lapTimerElm.innerHTML = '00:00.00';

  };


  /******************** 
   * Public Methods 
   **********************/
  return {
    getCentiseconds: function() {
      return _centiseconds;
    },

    startTimer: function() {
      var startButton = document.getElementById('start');
      var stopButton = document.getElementById('stop');
      var resetButton = document.getElementById('reset');
      var lapButton = document.getElementById('lap');

      startButton.className = 'hide';
      stopButton.className = 'red';
      resetButton.className = 'hide';
      lapButton.className = '';

      // Update timer
      _intervalId = window.setInterval(function(){
        _centiseconds += 1;
        _updateTimer(_centiseconds);
        _updateLapTimer(_centiseconds);
      }, 10);
    },
    stopTimer: function() {
      var startButton = document.getElementById('start');
      var stopButton = document.getElementById('stop');
      var resetButton = document.getElementById('reset');
      var lapButton = document.getElementById('lap');

      // Toggle visibility of buttons;
      startButton.className = 'green';
      stopButton.className = 'hide';
      resetButton.className = '';
      lapButton.className = 'hide';

      window.clearInterval(_intervalId);
    },
    resetTimer: function () {
      window.clearInterval(_intervalId);
      _centiseconds = 0;
      _updateTimerViews(0, 0 ,0);
      _clearLaps();
    },
    addLap: function() {
      var curLap = null;
      var timeData = null;
      var timeStr = null;
      var lapsElm = document.getElementById('laps');

      _lapElapsed = 0;
      curLap = _centiseconds - _lastLap;
      _laps.push(curLap);
      _lastLap = _centiseconds;

      timeData = _getTimeData(curLap);
      timeStr = _toTwoDigits(timeData[0]) + ':' + _toTwoDigits(timeData[1]) + ':' + _toTwoDigits(timeData[2]);


      lapsElm.innerHTML = '<li class="group">' + '<span class="pull-left">Lab ' + _laps.length + '</span> <span class="pull-right">' + timeStr +'</span></li>'+ lapsElm.innerHTML;
      return curLap;
    }
  }
})();   


/*******************
 * Event Listeners
 *******************/
document.getElementById('start').addEventListener("click", function() {
  timerApp.startTimer();
}, false);

document.getElementById('stop').addEventListener("click", function(){
  timerApp.stopTimer();
});

document.getElementById('reset').addEventListener("click", function(){
  timerApp.resetTimer();
});

document.getElementById('lap').addEventListener('click', function() {
  timerApp.addLap();
});
