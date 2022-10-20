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

  * Probar usar el algoritmo usado para imprimir als fechas del WeekComponent en el NextDay y PrevDay

  ** USAR LA FUNCION addDays() para la suma la suma y resta de las fechas para evitar asi bugs durante las operaciones de suma y resta | 
  Hacer eso hace que lo que se sumen sean datos de tipo fecha y no datos de tipo int.

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

function addDays(fecha, dias){
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}
//console.log(addDays(currentDate, 7), 'Linea 59 a 64');

//console.log(currentWeek + 20, 'numero del dia de la semana');
//console.log(addDays(currentDate, 100), 'numero del dia de la semana | se le suman 100 dias');
//console.log(currentDate);


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
    //nextWeek();
    addDays(currentDate, 7);
    console.log(currentDate);
    $calendarContainer.lastChild.remove();
    WeekComponent($calendarContainer);
    document.getElementById("fecha-week").innerHTML = nameMonth[currentDate.getMonth()] + " de " + currentDate.getFullYear();
    hourWeekComponent(currentDate.getDay(), currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
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
  addDays(currentDate, 7);
  /* if (currentWeek !== getTotalDays(currentMonth)) {//<-- Si no es el ultimo dia del mes
    currentWeek += 7;
    console.log('Pase por el primer if');
    if (currentWeek > getTotalDays(currentMonth)) {//<-- Si se pasa al sumar, entra este if
      currentMonth++;
      currentWeek = 1;
      currentWeek += 1;//<-- Este se agrego como prueba, falta testear el dia Mie J y V
      console.log('Pase por el primer if, segundo if');
    }
    if (currentMonth === 12) {//<-- Si se pasa de diciembre al momento de sumar +1 al mes, pasa al siguiente año en el mes 0
      currentMonth = 0;
      currentYear++;
      console.log('Pase por el primer if, tercer if');
    }
  } else {//<-- Si es el ultimo dia del mes
    currentMonth++;
    currentWeek = 1;
    currentWeek += 0;//<-- Este se agrego como prueba, falta testear el dia Mie J y V
    console.log('Pase por el else');
    if (currentMonth === 12) {
      console.log('Pase por el else, primer if');
      currentMonth = 0;
      currentYear++;
    }
  } */


  /*_________________________________________________________________________________________________*/

  
  /* const $weekDays = document.getElementsByClassName("diasNumber");
  let countStartMon = 0; //lunes
  let countStartTue = -1; //martes
  let countStartWed = -2; //miercoles
  let countStartThr = -3; //jueves
  let countStartFre = -4; //viernes
  let countStartSat = -5; //sabado
  let countStartSun = -6; //domingo
  for (var i = 0; i < 7; i++) {
    if (currentDayName === 1) {// <-- Lunes
        let d = new Date();
        d.setDate(currentWeek + countStartMon++);
        d.setDate(d.getDate() + 7);
        console.log(d.getDate());
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 2) {// <-- Martes
        let d = new Date();
        d.setDate((currentWeek + countStartTue++) + 7);
        //d.setDate(d.getDate() + 7);
        console.log(d.getDate());
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 3) {// <-- Miercoles
        let d = new Date();
        d.setDate(currentWeek + countStartWed++);
        d.setDate(d.getDate() + 7);
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 4) {// <-- Jueves
        let d = new Date();
        d.setDate(currentWeek + countStartThr++);
        d.setDate(d.getDate() + 7);
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 5) {// <-- Viernes
        let d = new Date();
        d.setDate(currentWeek + countStartFre++);
        d.setDate(d.getDate() + 7);
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 6) {// <-- Sabado
        let d = new Date();
        d.setDate(currentWeek + countStartSat++);
        d.setDate(d.getDate() + 7);
        $weekDays[i].innerHTML = d.getDate();
    }
    if (currentDayName === 0) {// <-- Domingo
        let d = new Date();
        d.setDate(currentWeek + countStartSun++);
        d.setDate(d.getDate() + 7);
        $weekDays[i].innerHTML = d.getDate();
    }
  } */
  setNewDateWeek();
  console.log(currentWeek, currentMonth);
}

function setNewDateWeek() {
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);
  
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
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);
  
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
  currentDate.setFullYear(currentYear, currentMonth, currentWeek);
  document.getElementById("fecha-year").innerHTML = currentYear;

  for (let y = 0; y < 12; y++) {
    daysMonthYear[y].innerHTML = " "
  }
  writeYear();
}