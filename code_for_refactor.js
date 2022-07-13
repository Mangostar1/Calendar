// botones day
let prevButtonDay = document.getElementById('prev-day');
let nextButtonDay = document.getElementById('next-day');

prevButtonDay.onclick = () => {
  prevDay()
};
nextButtonDay.onclick = () => {
  nextDay()
};

function prevDay() {
  if (currentWeek !== 1) {
    currentWeek--;
    nameDay[currentDayName--];
    if (currentDayName === -1) {
      currentDayName = 6;
    }
  } else {
    currentMonth--;
    currentWeek = getTotalDays(currentMonth);
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }
  }
  inicioEventoDia();
  setNewDateDay();
}

function nextDay() {
  if (currentWeek !== getTotalDays(currentMonth)) {
    currentWeek++;
    nameDay[currentDayName++];
    if (currentDayName === 7) {
      currentDayName = 0;
    }
  } else {
    currentWeek = 1;
    currentMonth++;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  }
  inicioEventoDia();
  setNewDateDay();
}

function setNewDateDay() {
  fecha.setFullYear(currentYear, currentMonth, currentWeek);

  document.getElementById("fecha-day").innerHTML = " ";
  document.getElementById("cambia-dia").innerHTML = " ";

  document.getElementById("fecha-day").innerHTML = currentWeek + " de " + " " + nameMonth[currentMonth] + " del " + currentYear;
  document.getElementById("cambia-dia").innerHTML = nameDay[currentDayName] + " " + currentWeek;
}

// botones week
let prevButtonWeek = document.getElementById('prev-week');
let nextButtonWeek = document.getElementById('next-week');

prevButtonWeek.onclick = () => {
  prevWeek()
};
nextButtonWeek.onclick = () => {
  nextWeek()
};

function prevWeek() {
  if (currentWeek !== 1) {
    currentWeek -= 7;
    if (currentWeek <= 0) {
      currentMonth--;
      currentWeek = getTotalDays(currentMonth);
    }
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }
  } else {//resolver aca para cuando hace el cambio de año
    currentMonth--;
    currentWeek = getTotalDays(currentMonth);
    if (currentMonth === -1) {
      currentYear--;
      currentMonth = 11;
    }
  }
  inicioEventoDia();
  setNewDateWeek();
}

function nextWeek() {
  if (currentWeek !== getTotalDays(currentMonth)) {
    currentWeek += 7;
    if (currentWeek > getTotalDays(currentMonth)) { //antes tenia el 31
      currentWeek = 1;
      currentMonth++;
    }
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  } else {//quiza sea aca el problema
    currentMonth++;
    currentWeek = 1;
    currentWeek += 6;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  }
  inicioEventoDia();
  setNewDateWeek();
}

function setNewDateWeek() {
  fecha.setFullYear(currentYear, currentMonth, currentWeek);
  document.getElementById("fecha-week").innerHTML = nameMonth[currentMonth] + " de " + currentYear;

  // declarated to week and month counter
  let countCurrentWeek = 0;//poner ojo con esta variable, domingo tenia que ser 1, ahora lunes tiene que ser 0 para que no de bug
  let countCurrentMonth = 0;
  
  for (var i = 0; i < 7; i++) {
    weekDays[i].innerHTML = currentWeek + countCurrentWeek++;
    if (weekDays[i].innerHTML > getTotalDays(currentMonth)) {
      fecha.setDate(1 + countCurrentMonth++);
      weekDays[i].innerHTML = fecha.getDate();
      //let d = new Date();
      //d.setDate(1 + countCurrentMonth++);
      //weekDays[i].innerHTML = d.getDate();
    }
  }
}

// month

let prevButtonMonth = document.getElementById('prev-month');
let nextButtonMonth = document.getElementById('next-month');

prevButtonMonth.onclick = () => {
  prevMonth()
};
nextButtonMonth.onclick = () => {
  nextMonth()
};

function prevMonth() {
  if (currentMonth !== 0) {
    currentMonth--;
  } else {
    currentMonth = 11;
    currentYear--;
  }
  setNewDateMonth();
}

function nextMonth() {
  if (currentMonth !== 11) {
    currentMonth++;
  } else {
    currentMonth = 0;
    currentYear++;
  }
  setNewDateMonth();
}

function setNewDateMonth() {
  fecha.setFullYear(currentYear, currentMonth, currentWeek);
  document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;

  wrapper.innerHTML = " ";
  writeMonth(currentMonth);
}

// year

let prevButtonYear = document.getElementById('prev-year');
let nextButtonYear = document.getElementById('next-year');

prevButtonYear.onclick = () => {
  prevYear()
};
nextButtonYear.onclick = () => {
  nextYear()
};

function prevYear() {
  if (currentYear !== 0) {
    currentYear--;
  } else {
    currentYear = 11;
  }
  setNewDateYear();
}

function nextYear() {
  if (currentYear !== 11) {
    currentYear++;
  } else {
    currentYear = 0;
  }
  setNewDateYear();
}

function setNewDateYear() {
  fecha.setFullYear(currentYear, currentMonth, currentWeek);
  document.getElementById("fecha-year").innerHTML = currentYear;

  for (let y = 0; y < 12; y++) {
    daysMonthYear[y].innerHTML = " "
  }
  writeYearMonthJan();
  writeYearMonthFeb();
  writeYearMonthMar();
  writeYearMonthApr();
  writeYearMonthMay();
  writeYearMonthJun();
  writeYearMonthJul();
  writeYearMonthAug();
  writeYearMonthSep();
  writeYearMonthOct();
  writeYearMonthNov();
  writeYearMonthDec();
}

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