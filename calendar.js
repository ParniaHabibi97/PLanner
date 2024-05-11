var date = new Date();
var day = date.getDate();
var year = date.getFullYear();

var month = date.getMonth();
var monthLabels= ["January", "February",  "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var weekDay = date.getDay();
var weekDayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//create function to grab day, month, date, year
function Day(){
month = monthLabels[month];
weekDay = weekDayLabels[weekDay];
  
document.getElementById("day").innerHTML = "Today is " + "<span>" + weekDay.toUpperCase() + "</span>";
document.getElementById("date").innerHTML = month.toUpperCase() + " " + "<span>" + day + "</span>" + year;  
}

Day();