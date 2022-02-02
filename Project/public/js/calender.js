const date = new Date();
function gettotaldays() {
  var today = new Date();
  var month = today.getMonth();
  return daysInMonth(month + 1, today.getFullYear());
}
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
firstDay = firstDay.toDateString().slice(0, 3);
var lastdate = gettotaldays();
var i = -1;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
$("#month").html(monthNames[d.getMonth()]);

switch (firstDay) {
  case "Mon":
    i = 0;
    break;
  case "Tue":
    i = 1;
    break;
  case "Wed":
    i = 2;
    break;
  case "Thu":
    i = 3;
    break;
  case "Fri":
    i = 4;
    break;
  case "Sat":
    i = 5;
    break;
  case "Sun":
    i = 6;
}

var j = 0;
var k = 1;
var todaydate = parseInt(date.toDateString().slice(8, 11));
$(".day").each(function () {
  if (j >= i && j <= lastdate) {
    $(this).html(k);
    if (k == todaydate) {
      $(this).addClass("todaydate");
    }
    k++;
  }
  j++;
});
