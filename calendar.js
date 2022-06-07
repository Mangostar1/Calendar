import { NewModalEvent } from "./EventoModal.js";

/* Dates */
export let fecha = new Date();

export let currentDayName = fecha.getDay();
export let currentWeek = fecha.getDate();
export let currentMonth = fecha.getMonth();
export let currentYear = fecha.getFullYear();


const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let weekDays = document.getElementsByClassName("diasNumber");

function isLeap() {
  /* comprueba si el año es biciesto | funcionando */
  return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

function getTotalDays(month) {
  /* para determinar la cantidad de dias del mes al que se consulte */
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

function startDayYear(month) {
  let start = new Date(currentYear, month, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

/* day */

const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let containerDay = document.getElementById("container-Day");
let hourDay = [{
  hour: "00:00 hrs"}, 
  {hour: "01:00 hrs"}, 
  {hour: "02:00 hrs"}, 
  {hour: "03:00 hrs"}, 
  {hour: "04:00 hrs"}, 
  {hour: "05:00 hrs"}, 
  {hour: "06:00 hrs"}, 
  {hour: "07:00 hrs"}, 
  {hour: "08:00 hrs"}, 
  {hour: "09:00 hrs"}, 
  {hour: "10:00 hrs"}, 
  {hour: "11:00 hrs"}, 
  {hour: "12:00 hrs"}, 
  {hour: "13:00 hrs"}, 
  {hour: "14:00 hrs"}, 
  {hour: "15:00 hrs"}, 
  {hour: "16:00 hrs"}, 
  {hour: "17:00 hrs"}, 
  {hour: "18:00 hrs"}, 
  {hour: "19:00 hrs"}, 
  {hour: "20:00 hrs"}, 
  {hour: "21:00 hrs"}, 
  {hour: "22:00 hrs"}, 
  {hour: "23:00 hrs"}
];

hourDay.forEach((item) => {
  containerDay.innerHTML += '<div class="diario">' + '<p class="hora">' + item.hour + '</p>' +
    '<ul>' +
    '<li class="event">Test 1</li>' +
    '</ul>' +
    '</div>';
});

/* week */
let containerWeek = document.getElementById("container-week");
let weekContent = document.getElementById("days-of-week");
let weekDiasDeSemana = document.getElementsByClassName("diaa-week");
const hourDayWeek = [{
  hour: "Horas"}, 
  {hour: "00:00 hrs"}, 
  {hour: "01:00 hrs"}, 
  {hour: "02:00 hrs"}, 
  {hour: "03:00 hrs"}, 
  {hour: "04:00 hrs"}, 
  {hour: "05:00 hrs"}, 
  {hour: "06:00 hrs"}, 
  {hour: "07:00 hrs"}, 
  {hour: "08:00 hrs"}, 
  {hour: "09:00 hrs"}, 
  {hour: "10:00 hrs"}, 
  {hour: "11:00 hrs"}, 
  {hour: "12:00 hrs"}, 
  {hour: "13:00 hrs"}, 
  {hour: "14:00 hrs"}, 
  {hour: "15:00 hrs"}, 
  {hour: "16:00 hrs"}, 
  {hour: "17:00 hrs"}, 
  {hour: "18:00 hrs"}, 
  {hour: "19:00 hrs"}, 
  {hour: "20:00 hrs"}, 
  {hour: "21:00 hrs"}, 
  {hour: "22:00 hrs"}, 
  {hour: "23:00 hrs"}
];

let cont = 1;
let day = 1;
let horas = 0;
let tmpEventDayWeek = 3; // dynamic
let tmpHourDayWeek = 4; ; // dynamic

for (let w = 1; w < 169; w++) {

  if(horas == tmpHourDayWeek && tmpEventDayWeek == day){
    weekContent.innerHTML += '<div class="semanal">' +
      '<ul>' +
      '<li class="event eventWeek"> Hora '+horas+' Day '+day+'</li>' +
      '</ul>' +
      '</div>';
  }else{
    weekContent.innerHTML += '<div class="semanal">' +
      '<ul>' +
      '<li class="event eventWeek"></li>' +
      '</ul>' +
      '</div>';
  }

  if(w % 7 == 0){
      horas++;
      day = 0;
  }
  day++;
  cont++;
}

hourDayWeek.forEach((item) => {
  document.getElementById("grid-hour").innerHTML += '<div class="horas">' + item.hour + '</div>'
});

let countStartMon = 0; //lunes
let countStartTue = -1; //martes
let countStartWed = -2; //miercoles
let countStartThr = -3; //jueves
let countStartFre = -4; //viernes
let countStartSat = -5; //sabado
let countStartSun = -6; //domingo

for (var i = 0; i < 7; i++) {
  if (currentDayName === 1) {
    weekDays[i].innerHTML = currentWeek + countStartMon++;
  } else if (currentDayName === 2) {
    let d = new Date();
    d.setDate(currentWeek + countStartTue++);
    weekDays[i].innerHTML = d.getDate();
  } else if (currentDayName === 3) {
    let d = new Date();
    d.setDate(currentWeek + countStartWed++);
    weekDays[i].innerHTML = d.getDate();
  } else if (currentDayName === 4) {
    let d = new Date();
    d.setDate(currentWeek + countStartThr++);
    weekDays[i].innerHTML = d.getDate();
  } else if (currentDayName === 5) {
    let d = new Date();
    d.setDate(currentWeek + countStartFre++);
    weekDays[i].innerHTML = d.getDate();
  } else if (currentDayName === 6) {
    let d = new Date();
    d.setDate(currentWeek + countStartSat++);
    weekDays[i].innerHTML = d.getDate();
  } else if (currentDayName === 0) {
    let d = new Date();
    d.setDate(currentWeek + countStartSun++);
    weekDays[i].innerHTML = d.getDate();
  }
}

/* month */

export let wrapper = document.getElementById('days-of-month');
let containerMonth = document.getElementById('container-month');
var Dias;
const daysOfWeek = [
  {day: 'Lun'}, {day: 'Mar'}, {day: 'Mié'}, {day: 'Jue'}, {day: 'Vie'}, {day: 'Sáb'}, {day: 'Dom'}
];

writeMonth(currentMonth);

function writeMonth(month) {
  daysOfWeek.forEach((item) => {
    wrapper.innerHTML += '<div class="grid-days">' + item.day + '</div>';
  });

  for (let i = startDay(); i > 0; i--) {
    wrapper.innerHTML += `<div class="grid-item"><p class="day-number lastMonth"> ${getTotalDays(currentMonth - 1)-(i - 1)} </p>` +
      '<ul>' +
      `<li class="event"> 3</li>` +
      '</ul>' +
      '</div>';
  }
  
  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i == currentWeek && month == 0) {
      wrapper.innerHTML += `<div class="grid-item"><p class="day-number day-month-active">` + i + '</p>' +
        '<ul>' +
        `<li class="event" id="evento-${i}"></li>` +
        '</ul>' +
        '</div>';
    } else {
      wrapper.innerHTML += `<div class="grid-item"><p class="day-number">` + i + '</p>' +
        '<ul>' +
        `<li class="event" id="evento-${i}"></li>` +
        '</ul>' +
        '</div>';
    }
  }
  Dias = document.getElementsByClassName('grid-item');
  async function eventoMonth() {
    /* const basicMonth = await fetch("/basicStructure.json"); */ //trabajar con el json de manera local en liveServer
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
        eventMonth.innerHTML = `<button class="btn-item" id="btn-event-${i}"><span class="sp-hour">`+ horaInicialAA +" - " + horafinalAA +'</span>'+ '<br>' +'<span class="sp-title">'+ tituloEventoAA +'</span></button>';
      } else {
        eventMonth.innerHTML = '<li class="event"></li>';
      }
    }
  }
  for (let i = 1; i <= getTotalDays(month); i++) {
    Dias[i].onclick = () => {
      if (!document.body.contains(document.querySelector('div.modal'))) {
        NewModalEvent(Dias[i]);
      }
    }
  }
  eventoMonth();
}
/* funcion evento */
function handleBtn() {
  alert("hola");
}
/* year */

let containerYear = document.getElementById("container-Year");
let dayNameYear = document.getElementsByClassName("day-name-div");
let daysMonthYear = document.getElementsByClassName("day-div");
const nameWeeck = [
  {day: 'L'}, {day: 'M'}, {day: 'M'}, {day: 'J'}, {day: 'V'}, {day: 'S'}, {day: 'D'}
];

nameWeeck.forEach((item) => {
  for (let i = 0; i < 12; i++) {
    dayNameYear[i].innerHTML += '<li class="day-name">' + item.day + '</li>';
  }
});

writeYearMonthJan();

function writeYearMonthJan() {

  for (let i = startDayYear(0); i > 0; i--) {
    daysMonthYear[0].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(0); i++) {
    if (i === 26) {
      daysMonthYear[0].innerHTML += '<li class="day day-year-active">' + '<a id="day-year-event">' + i + '</a>' + '</li>';
    } else {
      daysMonthYear[0].innerHTML += '<li class="day">' + i + '</li>';
    }
  }
}

writeYearMonthFeb(); // escribe si febreto tiene 28 o 29 dias
function writeYearMonthFeb() {
  for (let i = startDayYear(1); i > 0; i--) {
    daysMonthYear[1].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(1); i++) {
    daysMonthYear[1].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthMar();

function writeYearMonthMar() {
  for (let i = startDayYear(2); i > 0; i--) {
    daysMonthYear[2].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(2); i++) {
    daysMonthYear[2].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthApr();

function writeYearMonthApr() {
  for (let i = startDayYear(3); i > 0; i--) {
    daysMonthYear[3].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(3); i++) {
    daysMonthYear[3].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthMay();

function writeYearMonthMay() {
  for (let i = startDayYear(4); i > 0; i--) {
    daysMonthYear[4].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(4); i++) {
    daysMonthYear[4].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthJun();

function writeYearMonthJun() {
  for (let i = startDayYear(5); i > 0; i--) {
    daysMonthYear[5].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(5); i++) {
    daysMonthYear[5].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthJul();

function writeYearMonthJul() {
  for (let i = startDayYear(6); i > 0; i--) {
    daysMonthYear[6].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(6); i++) {
    daysMonthYear[6].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthAug();

function writeYearMonthAug() {
  for (let i = startDayYear(7); i > 0; i--) {
    daysMonthYear[7].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(7); i++) {
    daysMonthYear[7].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthSep();

function writeYearMonthSep() {
  for (let i = startDayYear(8); i > 0; i--) {
    daysMonthYear[8].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(8); i++) {
    daysMonthYear[8].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthOct();

function writeYearMonthOct() {
  for (let i = startDayYear(9); i > 0; i--) {
    daysMonthYear[9].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(9); i++) {
    daysMonthYear[9].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthNov();

function writeYearMonthNov() {
  for (let i = startDayYear(10); i > 0; i--) {
    daysMonthYear[10].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(10); i++) {
    daysMonthYear[10].innerHTML += '<li class="day">' + i + '</li>';
  }
}

writeYearMonthDec();

function writeYearMonthDec() {
  for (let i = startDayYear(11); i > 0; i--) {
    daysMonthYear[11].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
  }
  for (let i = 1; i <= getTotalDays(11); i++) {
    daysMonthYear[11].innerHTML += '<li class="day">' + i + '</li>';
  }
}

/* evento click year */

let eventoYear = document.getElementById("day-year-event");

eventoYear.onclick = () => { //boton clickeable dentro del circulo rojo
  dayRadio.checked = true;
  //wrapper.style = "display: none";
  //containerWeek.style = "display: none";
  //containerMonth.style = "display: none";
  containerYear.style = "display: none";
  containerDay.style = "display: grid";
  document.getElementById("fecha-day").innerHTML = currentWeek + " de " + nameMonth[currentMonth] + " del " + currentYear;
  document.getElementById('cambia-dia').innerHTML = nameDay[currentDayName] + " " + currentWeek;
}


/* dates buttons */

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

/* dates control */

/* botones day */
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

/* botones week */
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

/* month */

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

/* year */

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


/* json eventos */

let horaEvento = document.getElementsByClassName("sp-hour");
let tituloEvento = document.getElementsByClassName("sp-title");
let btnEvento = document.getElementsByClassName("btn-item");

let eventoLi = document.getElementsByClassName("event");
let eventMonth = document.getElementById("evento-8");// el - 8 es equivalente al dia del mes en el componente month si se cambia por 9 u otro dia del mes se imprimira alli
let eventWekk = document.getElementsByClassName("eventWeek");

async function inicioEventoDia() { 
  /* const basicStruc = await fetch("/basicStructure.json"); */
  const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");

  const primerEvento = await basicStruc.json();
  
  const datesJSON = primerEvento.events[0].dateStartEvent;
  const datesSplit = datesJSON.split("-");

  let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);

  let horaInicial = primerEvento.events[0].hourStart;
  let horafinal = primerEvento.events[0].hourFinish;
  let tituloEvento = primerEvento.events[0].title;

  /* Day */
  if (fechaEvento.getDate() === currentWeek && fechaEvento.getDay() === currentDayName && fechaEvento.getFullYear() === currentYear) {
    eventoLi[4].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial +'</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
  } else {
    eventoLi[4].innerHTML = '<li class="event">Test 1</li>';
  }

  /* Week */
  if (fechaEvento.getMonth() === currentMonth && fechaEvento.getFullYear() === currentYear){
    if (currentDayName === 1) {//si hoy es lunes aplica este if
      if (fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4 || fechaEvento.getDate() === currentWeek + 5 || fechaEvento.getDate() === currentWeek + 6) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 2){//si hoy es martes aplica este if
      if (fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4 || fechaEvento.getDate() === currentWeek + 5) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 3){//si hoy es miercoles aplica este if
      if (fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3 || fechaEvento.getDate() === currentWeek + 4) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else{
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 4){//si hoy es jueves aplica este if
      if (fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2 || fechaEvento.getDate() === currentWeek + 3) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 5){//si hoy es viernes aplica este if
      if (fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1 || fechaEvento.getDate() === currentWeek + 2) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 6){//si hoy es sabado aplica este if
      if (fechaEvento.getDate() === currentWeek - 5|| fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek || fechaEvento.getDate() === currentWeek + 1) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    } else if(currentDayName === 0){//si hoy es domingo aplica este if
      if (fechaEvento.getDate() === currentWeek - 6 || fechaEvento.getDate() === currentWeek - 5 || fechaEvento.getDate() === currentWeek - 4 || fechaEvento.getDate() === currentWeek - 3 || fechaEvento.getDate() === currentWeek - 2 || fechaEvento.getDate() === currentWeek - 1 || fechaEvento.getDate() === currentWeek) {
        eventWekk[29].innerHTML = '<button class="btn-item" onclick="handleBtn()"><span class="sp-hour">'+ horaInicial + '</span> - <span class="sp-title">'+ tituloEvento +'</span></button>';
      } else {
        eventWekk[29].innerHTML = '<li class="event"></li>';
      }
    }
  } else {
    eventWekk[29].innerHTML = '<li class="event"></li>';
  }
}
inicioEventoDia();

/* Cambio de altura de horas en semanal - Estilos css */
let semanal = document.getElementsByClassName("semanal");
let dinamico = document.getElementsByClassName("horas");

if (semanal[0].style = "height: 61px;") {
  dinamico[1].style = "padding-bottom: 2.1px;"
}
/* Zona de pruebas */


/* function testYear(mes, dia) {
  
  

  if (mes === 0) {
    daysMonthYear[0]
  } else if (mes === 1) {
    daysMonthYear[1]
  } else if(mes === 2) {
    daysMonthYear[2]
  } else if(mes === 3) {
    daysMonthYear[3]
  } else if(mes === 4) {
    daysMonthYear[4]
  } else if(mes === 5) {
    daysMonthYear[5]
  } else if(mes === 6) {
    daysMonthYear[6]
  } else if(mes === 7) {
    daysMonthYear[7]
  } else if(mes === 8) {
    daysMonthYear[8]
  } else if(mes === 9) {
    daysMonthYear[9]
  } else if(mes === 10) {
    daysMonthYear[10]
  } else if(mes === 11) {
    daysMonthYear[11]
  }
} */

//daysMonthYear[0].innerHTML += '<li class="day day-year-active">' + '<a id="day-year-event">' + i + '</a>' + '</li>';

