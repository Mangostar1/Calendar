//Components
import { DayComponent, hourDayComponent } from "./components/DayComponent.js";
import {
  WeekComponent,
  hourWeekComponent,
} from "./components/WeekComponent.js";
import { MonthComponent, DaysOfMonth } from "./components/MonthComponent.js";
import {
  YearComponent,
  writeYear,
  DaysOFYear,
} from "./components/YearComponent.js";

//Modals
import { NewModalEvent, closeModal } from "./components/Add_Event.js";
import { handlerBtn, handlerBtnMobile } from "./components/Events_Details.js";

//Scripts
import { dragModal } from "./scripts/dragModal.js";

//language
import languageHandler from "./i18n/en-es.js";

/*--------------------*/
/*--Useful Variables--*/
/*--------------------*/

const $calendarContainer =
  document.getElementsByClassName("calendar-container")[0]; //<-- Represents the <section> in index.html where the calendar will be printed.

let isVisible = false; //<-- Used to controls wodal window. Prevents more than one from being opened at the same time.

/*-------*/
/* Dates */
/*-------*/
export let currentDate = new Date();

/*-------------------------------*/
/*----Util Calendar Functions----*/
/*-------------------------------*/

Date.prototype.getWeekNumber = function () {
  //<-- Se agrega prototipo para saber cuantas semanas hay en el año
  var d = new Date(+this); //Creamos un nuevo Date con la fecha de "this".
  d.setHours(0, 0, 0, 0); //Nos aseguramos de limpiar la hora.
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
  //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
};

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function lessDays(date, days) {
  date.setDate(date.getDate() - days);
  return date;
}

export function isLeap() {
  return (
    (currentDate.getFullYear() % 100 !== 0 &&
      currentDate.getFullYear() % 4 === 0) ||
    currentDate.getFullYear() % 400 === 0
  );
}

export function getTotalDays(month) {
  if (month === -1) month = 11;

  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }
}

export function startDay() {
  //<-- Correct the day the month starts
  let start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

export function startDayYear(month) {
  //<-- Corrects the day the month begins in the year
  let start = new Date(currentDate.getFullYear(), month, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

/*------------------------*/
/* Load Default Component */
/*------------------------*/

MonthComponent($calendarContainer);
DaysOfMonth(currentDate.getMonth());
document.getElementById("date-month").innerHTML =
  languageHandler.es.monthNames[currentDate.getMonth()] +
  ` ${languageHandler.es.prep[0]} ` +
  currentDate.getFullYear();

/*-----------------------*/
/*----Event Listeners----*/
/*-----------------------*/
document.addEventListener("click", ({ target }) => {
  if (target.matches(".menu-img")) {
    //<-- Mobile components control
    document.querySelector(".buttons").classList.toggle("active");
  }

  /*--Modal Window--*/
  if (
    target.matches(".grid-item") &&
    screen.width > 768 &&
    isVisible === false
  ) {
    NewModalEvent(target);
    isVisible = true;
    dragModal();
  }
  if (target.matches("#new-event") && isVisible === false) {
    NewModalEvent(document.querySelector(".contaienr"));
    isVisible = true;
  }
  if (target.matches("#closeModal-ID") && isVisible === true) {
    closeModal();
    isVisible = false;
  }
  if (target.matches(".btn-item") && isVisible === false) {
    // #event-Modal
    if (screen.width < 768) {
      handlerBtnMobile();
      isVisible = true;
    } else {
      handlerBtn(target);
      isVisible = true;
      dragModal();
    }
  }

  /*--Date Handler--*/
  // Day
  if (target.matches("#prev-day")) {
    prevDay();
  }
  if (target.matches("#next-day")) {
    nextDay();
  }
  // Week
  if (target.matches("#prev-week")) {
    prevWeek();
  }
  if (target.matches("#next-week")) {
    nextWeek();
  }
  // Month
  if (target.matches("#prev-month")) {
    prevMonth();
  }
  if (target.matches("#next-month")) {
    nextMonth();
  }
  // Year
  if (target.matches("#prev-year")) {
    prevYear();
  }
  if (target.matches("#next-year")) {
    nextYear();
  }
  /*--Component Control--*/
  if (target.matches("#radio-day")) {
    //<-- Day
    $calendarContainer.lastChild.remove();
    DayComponent($calendarContainer);
    hourDayComponent(
      currentDate,
      currentDate.getDay(),
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    document.getElementById("date-day").innerHTML =
      currentDate.getDate() +
      ` ${languageHandler.es.prep[0]} ` +
      languageHandler.es.monthNames[currentDate.getMonth()] +
      ` ${languageHandler.es.prep[1]} ` +
      currentDate.getFullYear();
  }
  if (target.matches("#radio-week")) {
    //<-- Week
    $calendarContainer.lastChild.remove();
    WeekComponent($calendarContainer);
    hourWeekComponent(
      currentDate,
      currentDate.getDay(),
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    document.getElementById("date-week").innerHTML =
      languageHandler.es.monthNames[currentDate.getMonth()] +
      ` ${languageHandler.es.prep[0]} ` +
      currentDate.getFullYear();
  }
  if (target.matches("#radio-month")) {
    //<-- Month
    $calendarContainer.lastChild.remove();
    MonthComponent($calendarContainer);
    DaysOfMonth(currentDate.getMonth());
    document.getElementById("dates-control-month").style = "display: flex";
    document.getElementById("date-month").innerHTML =
      languageHandler.es.monthNames[currentDate.getMonth()] +
      ` ${languageHandler.es.prep[0]} ` +
      currentDate.getFullYear();
  }
  if (target.matches("#radio-year")) {
    //<-- Year
    $calendarContainer.lastChild.remove();
    YearComponent($calendarContainer);
    DaysOFYear();
    writeYear();
    document.getElementById("date-year").innerHTML = currentDate.getFullYear();
  }
});

/*---------------------*/
/*----Dates Control----*/
/*---------------------*/

/*-------------*/
/*--Day Dates--*/
/*-------------*/
function prevDay() {
  lessDays(currentDate, 1);
  currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  $calendarContainer.lastChild.remove();
  DayComponent($calendarContainer);
  hourDayComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  document.getElementById("date-day").innerHTML = null;
  document.getElementById("date-day").innerHTML =
    currentDate.getDate() +
    ` ${languageHandler.es.prep[0]} ` +
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ${languageHandler.es.prep[1]} ` +
    currentDate.getFullYear();
}

function nextDay() {
  addDays(currentDate, 1);
  currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  $calendarContainer.lastChild.remove();
  DayComponent($calendarContainer);
  hourDayComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  document.getElementById("date-day").innerHTML = null;
  document.getElementById("date-day").innerHTML =
    currentDate.getDate() +
    ` ${languageHandler.es.prep[0]} ` +
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ${languageHandler.es.prep[1]} ` +
    currentDate.getFullYear();
}

/*--------------*/
/*--Week Dates--*/
/*--------------*/
function prevWeek() {
  lessDays(currentDate, 7);
  $calendarContainer.lastChild.remove();
  WeekComponent($calendarContainer);
  hourWeekComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  document.getElementById("date-week").innerHTML =
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ${languageHandler.es.prep[0]} ` +
    currentDate.getFullYear();
}

function nextWeek() {
  addDays(currentDate, 7);
  $calendarContainer.lastChild.remove();
  WeekComponent($calendarContainer);
  hourWeekComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  document.getElementById("date-week").innerHTML =
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ${languageHandler.es.prep[0]} ` +
    currentDate.getFullYear();
}

/*---------------*/
/*--Month Dates--*/
/*---------------*/
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  setNewDateMonth();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  setNewDateMonth();
}

function setNewDateMonth() {
  currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  $calendarContainer.lastChild.remove();
  MonthComponent($calendarContainer);
  document.getElementById("date-month").innerHTML =
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ${languageHandler.es.prep[0]} ` +
    currentDate.getFullYear();
  DaysOfMonth(currentDate.getMonth());
}

/*--------------*/
/*--Year Dates--*/
/*--------------*/
function prevYear() {
  currentDate.setFullYear(currentDate.getFullYear() - 1);
  setNewDateYear();
}

function nextYear() {
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  setNewDateYear();
}

function setNewDateYear() {
  let daysMonthYear = document.getElementsByClassName("day-div");
  currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  document.getElementById("date-year").innerHTML = currentDate.getFullYear();

  for (let y = 0; y < 12; y++) {
    daysMonthYear[y].innerHTML = null;
  }
  writeYear();
}
