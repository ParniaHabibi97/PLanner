document.getElementById('export-pdf').addEventListener('click', function() {
  html2canvas(document.body, {
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'mm', 'a4');
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('planner.pdf');
    }
  });
});


function toggleMenu() {
  const navItems = document.querySelectorAll('.navbar-items');
  navItems.forEach(item => item.classList.toggle('show-menu'));
}





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
