import { NewModalEvent, closeModal } from "./EventoModal.js";
import { DayComponent, hourDayComponent} from "./DayComponent.js";
import { WeekComponent, hourWeekComponent} from "./WeekComponent.js";
import { MonthComponent, DaysOfMonth} from "./MonthComponent.js";
import { YearComponent, writeYear} from "./YearComponent.js";

let calendarContainer = document.getElementsByClassName("calendar-container")[0];

/*-------*/
/* Dates */
/*-------*/
let fecha = new Date();

let currentDayName = fecha.getDay();
let currentWeek = fecha.getDate();
let currentMonth = fecha.getMonth();
let currentYear = fecha.getFullYear();


const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let weekDays = document.getElementsByClassName("diasNumber");

function isLeap() {// comprueba si el año es biciesto | funcionando
  return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

export function getTotalDays(month) {// para determinar la cantidad de dias del mes al que se consulte
  if (month === -1) month = 11;

  if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }
}

//corregir el dia en que comienza el mes
function startDay() {
  let start = new Date(currentYear, currentMonth, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

export function startDayYear(month) {//corregir el dia en que comienza el mes en el año
  let start = new Date(currentYear, month, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

/*-----------------------*/
/* Delegacion de eventos */
/*-----------------------*/
document.addEventListener('click', (e) => {

  //modals
  if (e.target.matches('.grid-item')) {
    NewModalEvent(e.target);
  }
  if (e.target.matches("#closeModal-ID")) {
    closeModal();
  }

  //control de fechas
  if (e.target.matches('#prev-day')) {
    prevDay();
  }
  if (e.target.matches('#next-day')) {
    nextDay();
  }
  if (e.target.matches('#prev-week')) {
    prevWeek();
  }
  if (e.target.matches('#next-week')) {
    nextWeek();
  }
  if (e.target.matches('#prev-month')) {
    prevMonth();
  }
  if (e.target.matches('#next-month')) {
    nextMonth();
  }
  if (e.target.matches('#prev-year')) {
    prevYear();
  }
  if (e.target.matches('#next-year')) {
    nextYear();
  }
  //control de componentes
  if (e.target.matches('#radio-day')) {//dia
    wrapper.style = "display: none";
    calendarContainer.lastChild.remove();
    containerMonth.style = "display: none";
    DayComponent(calendarContainer);
    hourDayComponent();
    document.getElementById("fecha-day").innerHTML = currentWeek + " de " + nameMonth[currentMonth] + " del " + currentYear;
    document.getElementById('cambia-dia').innerHTML = nameDay[currentDayName] + " " + currentWeek;
  }
  if (e.target.matches('#radio-week')) {//semana
    wrapper.style = "display: none";
    calendarContainer.lastChild.remove();
    containerMonth.style = "display: none";
    WeekComponent(calendarContainer);
    hourWeekComponent();
    document.getElementById("fecha-week").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  }
  if (e.target.matches('#radio-month')) {//mes
    calendarContainer.lastChild.remove();
    //MonthComponent(calendarContainer);
    //DaysOfMonth(currentMonth);
    wrapper.style = "display: grid";
    containerMonth.style = "display: flex"
    document.getElementById("dates-control-month").style = "display: flex";
    document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  }
  if (e.target.matches('#radio-year')) {//año
    wrapper.style = "display: none";
    calendarContainer.lastChild.remove();
    containerMonth.style = "display: none";
    document.getElementById("dates-control-month").style = "display: none";
    YearComponent(calendarContainer);
    writeYear();
    document.getElementById("fecha-year").innerHTML = currentYear;
  }
});

/*-------*/
/* month */
/*-------*/
let wrapper = document.getElementById('days-of-month');
let containerMonth = document.getElementById('container-month');
export let  Dias = document.getElementsByClassName('grid-item');
const daysOfWeek = [
  {day: 'Lun'}, {day: 'Mar'}, {day: 'Mié'}, {day: 'Jue'}, {day: 'Vie'}, {day: 'Sáb'}, {day: 'Dom'}
];

function writeMonth(month) {
  daysOfWeek.forEach((item) => {
    wrapper.innerHTML += `<div class="grid-days"> ${item.day} </div>`;
  });

  for (let i = startDay(); i > 0; i--) {
    wrapper.innerHTML += 
      `<div class="grid-item"><p class="day-number lastMonth"> ${getTotalDays(currentMonth - 1)-(i - 1)} </p>
        <ul>
          <li class="event"></li>
        </ul>
      </div>`;
  }
  
  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i == currentWeek && month == 0) {
      wrapper.innerHTML += 
        `<div class="grid-item">
          <p class="day-number day-month-active"> ${i} </p>
          <ul>
            <li class="event" id="evento-${i}"></li>
          </ul>
        </div>`;
    } else {
      wrapper.innerHTML += 
        `<div class="grid-item">
          <p class="day-number"> ${i} </p>
          <ul>
            <li class="event" id="evento-${i}"></li>
          </ul>
        </div>`;
    }
  }
  eventoMonth();
}

//eventos desde el json
async function eventoMonth() {
  const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
  const basicMonthJson = await basicMonth.json();

  for (let i = 0; i < 3; i++) {
    let datesJSON = basicMonthJson.events[i].dateStartEvent;

    const datesSplit = datesJSON.split('-');

    let dateMonth = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);
    let diames = dateMonth.getDate();
    let eventMonth = document.getElementById(`evento-${diames}`);

    let horaInicialAA = basicMonthJson.events[i].hourStart;
    let horafinalAA = basicMonthJson.events[i].hourFinish;
    let tituloEventoAA = basicMonthJson.events[i].title;

    if (dateMonth.getMonth() === currentMonth && dateMonth.getFullYear() === currentYear) {
      eventMonth.innerHTML = `<button class="btn-item" id="btn-event-${i}"><span class="sp-hour"> ${horaInicialAA} - ${horafinalAA} </span> <br> <span class="sp-title"> ${tituloEventoAA} </span></button>`;
    } else {
      eventMonth.innerHTML = `<li class="event"></li>`;
    }
  }
}
writeMonth(currentMonth);

/*------*/
/* year */
/*------*/
let daysMonthYear = document.getElementsByClassName("day-div");

/*---------------*/
/* dates buttons */
/*---------------*/

// evita que se cargen los calendarios al mismo tiempo al abrir la pagina por primera vez
containerMonth.style = "display: flex";
document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;

/*---------------*/
/* dates control */
/*---------------*/

// botones day
function prevDay() {
  if (currentWeek !== 1) {
    currentWeek--;
    currentDayName--;
    /* nameDay[currentDayName--]; */
    if (currentDayName === -1) {
      currentDayName = 6;
    }
  } else {
    currentMonth--;
    currentWeek = getTotalDays(currentMonth);
    currentDayName--;
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
    currentDayName++;
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
    }
  }
}

// month

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
  writeYear();
}

/*--------------*/
/* json eventos */
/*--------------*/

let eventoLi = document.getElementsByClassName("event");
let eventWekk = document.getElementsByClassName("eventWeek");

async function inicioEventoDia() { 
  const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");

  const primerEvento = await basicStruc.json();
  
  const datesJSON = primerEvento.events[0].dateStartEvent;
  const datesSplit = datesJSON.split("-");

  let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);

  let horaInicial = primerEvento.events[0].hourStart;
  let horafinal = primerEvento.events[0].hourFinish;
  let tituloEvento = primerEvento.events[0].title;

  // Day
  if (fechaEvento.getDate() === currentWeek && fechaEvento.getDay() === currentDayName && fechaEvento.getFullYear() === currentYear) {
    eventoLi[4].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
  } else {
    eventoLi[4].innerHTML = '<li class="event">Test 1</li>';
  }

  // Week
  if (fechaEvento.getMonth() === currentMonth && fechaEvento.getFullYear() === currentYear){
    if (currentDayName === 1) {//si hoy es lunes aplica este if
      if (fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4 || fechaEvento.getDate() === currentWeek + 5 || fechaEvento.getDate() === currentWeek + 6) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 2){//si hoy es martes aplica este if
      if (fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4 || fechaEvento.getDate() === currentWeek + 5) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 3){//si hoy es miercoles aplica este if
      if (fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else{
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 4){//si hoy es jueves aplica este if
      if (fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 5){//si hoy es viernes aplica este if
      if (fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 6){//si hoy es sabado aplica este if
      if (fechaEvento.getDate() === currentWeek - 5|| fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 0){//si hoy es domingo aplica este if
      if (fechaEvento.getDate() === currentWeek - 6 || fechaEvento.getDate() === currentWeek - 5 || fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek) {
        eventWekk[29].innerHTML = `<button class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    }
  } // else {
    //eventWekk[29].innerHTML = '<li class="event"></li>';
  //}
}
inicioEventoDia();