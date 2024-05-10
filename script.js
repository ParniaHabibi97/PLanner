var timerInterval; // Declare timerInterval globally to use it in both startTimer and resetTimer functions

function startTimer() {
  var minutesInput = parseInt(document.getElementById("minutes").value) || 0; // Ensure default value is 0 if input is empty or not a number
  var secondsInput = parseInt(document.getElementById("seconds").value) || 0; // Ensure default value is 0 if input is empty or not a number

  var totalSeconds = minutesInput * 60 + secondsInput;

  var display = document.getElementById("timer-display");

  clearInterval(timerInterval); // Clear any existing interval before starting a new one

  timerInterval = setInterval(function() {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    display.textContent = formatTime(minutes) + ":" + formatTime(seconds);

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      display.textContent = "00:00";
    } else {
      totalSeconds--;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval); // Clear the interval
  document.getElementById("timer-display").textContent = "00:00"; // Reset the timer display to initial value
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
