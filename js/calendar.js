import { NewModalEvent, closeModal } from "./EventoModal.js";
import { DayComponent, hourDayComponent} from "./DayComponent.js";
import { WeekComponent, hourWeekComponent} from "./WeekComponent.js";
import { MonthComponent, DaysOfMonth} from "./MonthComponent.js";
import { YearComponent, writeYear, DaysOFYear} from "./YearComponent.js";
import {handlerBtn, handlerBtnMobile} from "./Evento_Fetch.js";

/*----------------------------------------------*/
/*

  Hoy dia viernes el calendario semanal al llegar al limite del mes ocubre me marca el ultimo dia
  del mes en el dia viernes como viernes 30.

  Me marca el limite del mes como dia 30 y no 31 porque resta a partir del mes actual y no del mes pasado,
  lo que significa que deve restar a partir del mes pasado y no del actual.

  En el cambio de dias de la semana se imprime la fecha actual y se comeinza a restar y sumar a partir de
  esta para completar el restos de dia de la semana, esto se hace segun que dia de la semana caigar el
  currentWeek.

  ______________________________________________________________________________________________________

  * Arreglar paso de fecha en nextWeek(), El bug se dispara al momento de cambiar de año, osea, al pasar de diciembre a enero

  */
/*----------------------------------------------*/
const $calendarContainer = document.getElementsByClassName("calendar-container")[0];

/*-------*/
/* Dates */
/*-------*/
export let fecha = new Date();

export let currentDayName = fecha.getDay();
export let currentWeek = fecha.getDate();
export let currentMonth = fecha.getMonth();
export let currentYear = fecha.getFullYear();


const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const weekDays = document.getElementsByClassName("diasNumber");


/*------------------------------*/
/* funciones para el calendario */
/*------------------------------*/

Date.prototype.getWeekNumber = function () { //<-- Se agrega prototipo para saber cuantas semanas hay en el año
  var d = new Date(+this);  //Creamos un nuevo Date con la fecha de "this".
  d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
  //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

export function isLeap() {
  return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

export function getTotalDays(month) {
  if (month === -1) month = 11;

  if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }
}

export function startDay() {//corregir el dia en que comienza el mes
  let start = new Date(currentYear, currentMonth, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

export function startDayYear(month) {//corregir el dia en que comienza el mes en el año
  let start = new Date(currentYear, month, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

/*------------------------*/
/* Load Default Component */
/*------------------------*/
MonthComponent($calendarContainer);
DaysOfMonth(currentMonth);
document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;

/*-----------------------*/
/* Delegacion de eventos */
/*-----------------------*/
document.addEventListener('click', (e) => {
  //Mobile components control
  if (e.target.matches('.menu-img')) {
    document.querySelector('.buttons').classList.toggle('active');
  }
  //modals
  if (e.target.matches('.grid-item') && screen.width > 768) {
    NewModalEvent(e.target);
  }
  if (e.target.matches("#new-event")) {
    NewModalEvent(document.querySelector('.contaienr'));
  }
  if (e.target.matches("#closeModal-ID")) {
    closeModal();
  }
  if (e.target.matches(".btn-item")) {
    if (screen.width < 768) {
      handlerBtnMobile();
    } else {
      handlerBtn();
    }
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
    $calendarContainer.lastChild.remove();
    DayComponent($calendarContainer);
    hourDayComponent();
    document.getElementById("fecha-day").innerHTML = currentWeek + " de " + nameMonth[currentMonth] + " del " + currentYear;
    document.getElementById('cambia-dia').innerHTML = nameDay[currentDayName] + " " + currentWeek;
  }
  if (e.target.matches('#radio-week')) {//semana
    $calendarContainer.lastChild.remove();
    WeekComponent($calendarContainer);
    hourWeekComponent(currentDayName, currentWeek);
    document.getElementById("fecha-week").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  }
  if (e.target.matches('#radio-month')) {//mes
    $calendarContainer.lastChild.remove();
    MonthComponent($calendarContainer);
    DaysOfMonth(currentMonth);
    document.getElementById("dates-control-month").style = "display: flex";
    document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  }
  if (e.target.matches('#radio-year')) {//año
    $calendarContainer.lastChild.remove();
    YearComponent($calendarContainer);
    DaysOFYear();
    writeYear();
    document.getElementById("fecha-year").innerHTML = currentYear;
  }
});

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
  setNewDateWeek();
  console.log(currentWeek);
}

function nextWeek() {
  if (currentWeek !== getTotalDays(currentMonth)) {//<-- Si no es el ultimo dia del mes
    currentWeek += 7;
    if (currentWeek > getTotalDays(currentMonth)) {//<-- Si se pasa al sumar, entra este if
      currentMonth++;
      currentWeek = 1;
      currentWeek += 4;//<-- Este se agrego como prueba el dia sabado 15 de octubre | Era 4 para el dia sabado, hoy domingo es 5 | Hoy Lunes 17 tiene que ser +4
    }
    if (currentMonth === 12) {//<-- Si se pasa de diciembre al momento de sumar +1 al mes, pasa al siguiente año en el mes 0
      currentMonth = 0;
      currentYear++;
    }
  } else {//<-- Si es el ultimo dia del mes
    currentMonth++;
    currentWeek = 1;
    currentWeek += 6; //<-- Era 6
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  }
  setNewDateWeek();
  console.log(currentWeek);
}

function setNewDateWeek() {
  fecha.setFullYear(currentYear, currentMonth, currentWeek);
  
  $calendarContainer.lastChild.remove();
  WeekComponent($calendarContainer);
  document.getElementById("fecha-week").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  hourWeekComponent(currentDayName, currentWeek, currentMonth, currentYear);
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
  
  $calendarContainer.lastChild.remove();
  MonthComponent($calendarContainer);
  document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  DaysOfMonth(currentMonth);
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
  let daysMonthYear = document.getElementsByClassName("day-div");
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

const eventoLi = document.getElementsByClassName("event");

async function inicioEventoDia() {
  //const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
  const basicStruc = await fetch("http://localhost:3000/events");
  const primerEvento = await basicStruc.json();

  const datesJSON = primerEvento[0].dayEvents[0].dateStartEvent;
  const datesSplit = datesJSON.split("-");

  let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);

  let horaInicial = primerEvento[0].dayEvents[0].hourStart;
  let horafinal = primerEvento[0].dayEvents[0].hourFinish;
  let tituloEvento = primerEvento[0].dayEvents[0].title;

  // Day
  if (fechaEvento.getDate() === currentWeek && fechaEvento.getDay() === currentDayName && fechaEvento.getFullYear() === currentYear) {
    eventoLi[4].innerHTML = `<button id="event-Modal" class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span></button>`;
  } else {
    eventoLi[4].innerHTML = '<li class="event"></li>';
  }
}
inicioEventoDia();