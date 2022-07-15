/* others */

let dayRadio = document.getElementById('radio-day');
let weekRadio = document.getElementById('radio-week');
let monthRadio = document.getElementById('radio-month');
let yearRadio = document.getElementById('radio-year');


containerWeek.style = "display: none"; /* evita que se cargen los calendarios al mismo tiempo al abrir la pagina por primera vez */
containerDay.style = "display: none";
containerYear.style = "display: none";
containerMonth.style = "display: flex";
document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;


dayRadio.onclick = function diaCambia() {
  /* day */
  wrapper.style = "display: none";
  containerWeek.style = "display: none";
  containerYear.style = "display: none";
  containerMonth.style = "display: none";
  containerDay.style = "display: grid";
  document.getElementById("fecha-day").innerHTML = currentWeek + " de " + nameMonth[currentMonth] + " del " + currentYear;
  document.getElementById('cambia-dia').innerHTML = nameDay[currentDayName] + " " + currentWeek;
}

weekRadio.onclick = function semanaCambia() {
  /* week */
  wrapper.style = "display: none";
  containerDay.style = "display: none";
  containerYear.style = "display: none";
  containerMonth.style = "display: none";
  containerWeek.style = "display: flex";
  document.getElementById("fecha-week").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
}

monthRadio.onclick = function mesCambia() {
  /* month */
  containerWeek.style = "display: none";
  containerDay.style = "display: none";
  containerYear.style = "display: none";
  wrapper.style = "display: grid";
  containerMonth.style = "display: flex"
  document.getElementById("dates-control-month").style = "display: flex";
  document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
}

yearRadio.onclick = function añoCambia() {
  /* year */
  wrapper.style = "display: none";
  containerWeek.style = "display: none";
  containerDay.style = "display: none";
  containerMonth.style = "display: none";
  document.getElementById("dates-control-month").style = "display: none";
  containerYear.style = "display: flex";
  document.getElementById("fecha-year").innerHTML = currentYear;
}