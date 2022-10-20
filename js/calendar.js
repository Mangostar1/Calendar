import { NewModalEvent, closeModal } from "./EventoModal.js";
import { DayComponent, hourDayComponent} from "./DayComponent.js";
import { WeekComponent, hourWeekComponent} from "./WeekComponent.js";
import { MonthComponent, DaysOfMonth} from "./MonthComponent.js";
import { YearComponent, writeYear, DaysOFYear} from "./YearComponent.js";
import {handlerBtn, handlerBtnMobile} from "./Evento_Fetch.js";

/*----------------------------------------------*/
/*

  El calendario en su version semanal ya esta pasando bien las fechas tanto en el next como en el prev, ahora queda resolver que
  al momento de pasar mes, la continuacion del mes anterior se haga con la fecha del mes anterior y no con la del actual para
  que un mes que termine en 31 por ejemplo, al pasar al siguiente mes en la semana marque como 30.

  ______________________________________________________________________________________________________

  * Arreglar ultimo dia del mes al cambiar de mes

  */
/*----------------------------------------------*/
const $calendarContainer = document.getElementsByClassName("calendar-container")[0];

/*-------*/
/* Dates */
/*-------*/
export let currentDate = new Date();

export let currentDayName = currentDate.getDay();
export let currentWeek = currentDate.getDate();
export let currentMonth = currentDate.getMonth();
export let currentYear = currentDate.getFullYear();


const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const $weekDays = document.getElementsByClassName("diasNumber");


/*--------------------------*/
/*----Calendar Functions----*/
/*--------------------------*/

Date.prototype.getWeekNumber = function () { //<-- Se agrega prototipo para saber cuantas semanas hay en el año
  var d = new Date(+this);  //Creamos un nuevo Date con la fecha de "this".
  d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
  //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

export function addDays(fecha, days){
  fecha.setDate(fecha.getDate() + days);
  return fecha;
}

function lessDays(fecha, days){
  fecha.setDate(fecha.getDate() - days);
  return fecha;
}

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
/*----Event Listeners----*/
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
  if (e.target.matches(".btn-item")) { // #event-Modal
    if (screen.width < 768) {
      handlerBtnMobile();
    } else {
      handlerBtn(e.target);
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
    hourWeekComponent(currentDate, currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
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


/*---------------------*/
/*----Dates Control----*/
/*---------------------*/

  /*-------------*/
  /*--Day Dates--*/
  /*-------------*/
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
  setNewDateDay();
}

function setNewDateDay() {
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);

  document.getElementById("fecha-day").innerHTML = " ";
  document.getElementById("cambia-dia").innerHTML = " ";

  document.getElementById("fecha-day").innerHTML = currentWeek + " de " + " " + nameMonth[currentMonth] + " del " + currentYear;
  document.getElementById("cambia-dia").innerHTML = nameDay[currentDayName] + " " + currentWeek;
}

  /*--------------*/
  /*--Week Dates--*/
  /*--------------*/
function prevWeek() {
  lessDays(currentDate, 7);
  //console.log(currentDate);
  $calendarContainer.lastChild.remove();
  WeekComponent($calendarContainer);
  hourWeekComponent(currentDate, currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
  document.getElementById("fecha-week").innerHTML = nameMonth[currentDate.getMonth()] + " de " + currentDate.getFullYear();
}

function nextWeek() {
  addDays(currentDate, 7);
  //console.log(currentDate);
  $calendarContainer.lastChild.remove();
  WeekComponent($calendarContainer);
  hourWeekComponent(currentDate, currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
  document.getElementById("fecha-week").innerHTML = nameMonth[currentDate.getMonth()] + " de " + currentDate.getFullYear();
}

  /*---------------*/
  /*--Month Dates--*/
  /*---------------*/
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
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);
  
  $calendarContainer.lastChild.remove();
  MonthComponent($calendarContainer);
  document.getElementById("fecha-month").innerHTML = nameMonth[currentMonth] + " de " + currentYear;
  DaysOfMonth(currentMonth);
}

/*--------------*/
/*--Year Dates--*/
/*--------------*/
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
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);
  document.getElementById("fecha-year").innerHTML = currentYear;

  for (let y = 0; y < 12; y++) {
    daysMonthYear[y].innerHTML = " "
  }
  writeYear();
}