//Components
import { DayComponent, hourDayComponent } from "./components/Day/DayComponent.js";
import { WeekComponent, hourWeekComponent } from "./components/Week/WeekComponent.js";
import { MonthComponent, DaysOfMonth } from "./components/Month/MonthComponent.js";
import { YearComponent, writeYear, DaysOFYear } from "./components/Year/YearComponent.js";

//Modals
import { NewModalEvent, closeModal } from "./components/ModalEvent/Add_Event.js";
import { handlerBtn, handlerBtnMobile } from "./components/ModalEvent/Events_Details.js";

//Scripts
import { dragModal } from "./scripts/dragModal.js";

//language
import languageHandler from "./i18n/en-es.js";

/*--------------------*/
/*--Useful Variables--*/
/*--------------------*/

/* const opportunities = await fetch('../src/app/services/calendarService.php?getOpportunities=true'); // <-- For production
const opportunitiesJSON = await opportunities.json(); */

const $calendarContainer = document.getElementsByClassName("calendar-container")[0]; //<-- Represents the <section> in index.html where the calendar will be printed.

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

function comeToday() {
  currentDate = new Date();

  // Obtén el ID del radio seleccionado
  const selectedRadio = document.querySelector('input[name="btn"]:checked').id;

  // Ejecuta diferentes códigos según el radio seleccionado
  switch (selectedRadio) {
    case 'radio-day':
      $calendarContainer.lastChild.remove();
      DayComponent($calendarContainer);
      hourDayComponent(currentDate, currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
      break;
    case 'radio-week':
      $calendarContainer.lastChild.remove();
      WeekComponent($calendarContainer);
      hourWeekComponent(currentDate, currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
      document.getElementById("date-week").innerHTML = `${languageHandler.es.monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      break;
    case 'radio-month':
      $calendarContainer.lastChild.remove();
      MonthComponent($calendarContainer);
      document.getElementById("date-month").innerHTML = `${languageHandler.es.monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      DaysOfMonth(currentDate.getMonth(), currentDate);
      break;
    case 'radio-year':
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
      break;
    default:
      console.log('Radio seleccionado no reconocido');
  }
}

/* Used on DayComponent.js on DayComponent() to change the current date */
function goToDayClick(element) {
  const day = element.dataset.day;
  const monthNumber = element.dataset.monthNumber;
  const lastMonthDay = element.dataset.lastMonthDay;
  const lastMonthNumber = element.dataset.lastMonthNumber;

  if (day != undefined) {
    currentDate.setMonth(monthNumber);
    currentDate.setDate(day);

    $calendarContainer.lastChild.remove();
    DayComponent($calendarContainer);
    hourDayComponent(currentDate);
  }

  if (lastMonthDay != undefined) {
    currentDate.setMonth(lastMonthNumber);
    currentDate.setDate(lastMonthDay);

    $calendarContainer.lastChild.remove();
    DayComponent($calendarContainer);
    hourDayComponent(currentDate);
  }
}
window.goToDayClick = goToDayClick;


/*------------------------*/
/* Load Default Component */
/*------------------------*/
  MonthComponent($calendarContainer);
  DaysOfMonth(currentDate.getMonth(), currentDate);
  document.getElementById("date-month").innerHTML =
    languageHandler.es.monthNames[currentDate.getMonth()] +
    ` ` +
    currentDate.getFullYear();

/*-----------------------*/
/*----Event Listeners----*/
/*-----------------------*/
document.addEventListener("click", ({ target }) => {
  /* if (target.matches(".menu-img")) {
    //<-- Mobile components control
    document.querySelector(".buttons").classList.toggle("active");
  } */

  if (target.matches("#btnToday")) {
    comeToday();
  }
  
  /*--Modal Window--*/
  /* if (target.matches(".grid-item") && screen.width > 768 && isVisible === false) {
    NewModalEvent(target); //opportunitiesJSON
    isVisible = true;
    dragModal();
  } */
  /* if (target.matches(".hour-week-content-div") && screen.width > 768 && isVisible === false) {
    NewModalEvent(target); //opportunitiesJSON
    isVisible = true;
    dragModal();
  } */
  /* if (target.matches(".eventDay") && screen.width > 768 && isVisible === false) {
    NewModalEvent(target); //opportunitiesJSON
    isVisible = true;
    dragModal();
  } */
  /* if (target.matches("#new-event") && isVisible === false) {
    NewModalEvent(document.querySelector(".contaienr")); //opportunitiesJSON
    isVisible = true;
  } */
  if (target.matches("#closeModal-ID") && isVisible === true) {
    closeModal();
    isVisible = false;
  }
  if (target.matches(".btn-item") && isVisible === false) {
    // #event-Modal
    if (screen.width < 768) {//<-- Responsive design 
      handlerBtn(target);
      isVisible = true;
    } else {//<-- Desktop mode
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
      currentDate
    );
  isVisible = false;
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
      ` ` +
      currentDate.getFullYear();
    isVisible = false;
  }
  if (target.matches("#radio-month")) {
    //<-- Month
    $calendarContainer.lastChild.remove();
    MonthComponent($calendarContainer);
    DaysOfMonth(currentDate.getMonth(), currentDate);
    document.getElementById("date-month").innerHTML =
      languageHandler.es.monthNames[currentDate.getMonth()] +
      ` ` +
      currentDate.getFullYear();
    isVisible = false;
  }
  if (target.matches("#radio-year")) {
    //<-- Year
    $calendarContainer.lastChild.remove();
    YearComponent($calendarContainer);
    DaysOFYear();
    writeYear();
    document.getElementById("date-year").innerHTML = currentDate.getFullYear();
    isVisible = false;
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
  /* currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ); */

  $calendarContainer.lastChild.remove();
  DayComponent($calendarContainer);
  hourDayComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
}

function nextDay() {
  addDays(currentDate, 1);
  /* currentDate.setFullYear(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ); */

  $calendarContainer.lastChild.remove();
  DayComponent($calendarContainer);
  hourDayComponent(
    currentDate,
    currentDate.getDay(),
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
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
    ` ` +
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
    ` ` +
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
    ` ` +
    currentDate.getFullYear();
  DaysOfMonth(currentDate.getMonth(), currentDate);
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
