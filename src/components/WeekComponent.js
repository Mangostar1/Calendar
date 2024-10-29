import { currentDate, addDays } from "../index.js";
import { datesFetch } from "../helpers/datesFetch.js";

//url fetch
import URL from "../helpers/UrlToFetch.js";

//language
import languageHandler from "../i18n/en-es.js";

const hourDayWeek = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

// Cambia 'const' por 'let' para que pueda modificarse
let HOUR_DIV = "";

hourDayWeek.forEach((item) => {
  HOUR_DIV += `
    <div class="hour-content">
      <p class="hour-week">${item}</p>
    </div>
  `;
});


let daysOnWeek = "";

languageHandler.es.dayNameShort.forEach((item) => {
  daysOnWeek += `
    <div class="grid-days">
      <p class="day-week">${item.day}</p>
      <p class="day-week daysNumber"></p>
    </div>
  `;
});

export function WeekComponent(element) {//<-- Create the <article>, in this element will be print all info related be Week.
  
  const $WeekContent = document.createElement("article");
  $WeekContent.classList.add("container-week");
  $WeekContent.id = "container-week";

  $WeekContent.innerHTML = `
    <div id="dates-control-week" class="dates-control">
      <div id="" class="header-date-details">
        <p id="date-week" class="header-date-details-text"></p>
      </div>
      <div>
        <button id="prev-week" class="prev"> &#10094; </button>
        <button id="btnToday">Hoy</button>
        <button id="next-week" class="next"> &#10095; </button>
      </div>
    </div>
    <div id="days-of-week">
        <div id="week-content-acc" class="">
          <div id="blanck-space-week-componenet"></div>
          <div id="week-content-hours-content">
            ${HOUR_DIV}
          </div>
        </div>
        <div id="week-content-days-main">
          <div class="week-content-dates-content">${daysOnWeek}</div>
          <div id="week-content-days-content"></div>
        </div>
    </div>
    <div class="content-loader">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>`;

  element.appendChild($WeekContent);
}

export function hourWeekComponent(currentDate, getDay) {
  const $weekContent = document.getElementById("week-content-days-content");
  const $weekDays = document.getElementsByClassName("daysNumber");

  let days = [
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
  ];

  for (let j = 0; j < 7; j++) {
    switch (getDay) {
      case 1: //<-- Monday
        addDays(days[j], j);
        break;
      case 2: //<-- Tuesday
        addDays(days[j], j - 1);
        break;
      case 3: //<-- Wednesday
        addDays(days[j], j - 2);
        break;
      case 4: //<-- Thursday
        addDays(days[j], j - 3);
        break;
      case 5: //<-- Friday
        addDays(days[j], j - 4);
        break;
      case 6: //<-- Saturday
        addDays(days[j], j - 5);
        break;
      case 0: //<-- Sunday
        addDays(days[j], j - 6);
        break;
    }
    $weekDays[j].innerHTML = days[j].getDate();
  }

  const daysOfWeek = [1, 2, 3, 4, 5, 6, 0];// <-- Array in this format because the calendar is printed from Monday to Sunday instead of Sunday to Saturday
  const daysInDom = [0, 1, 2, 3, 4, 5, 6];
  let thisDate = new Date();

  let sunday = days[6];
  days.splice(6, 1);
  days.unshift(sunday);

  for (let day of daysOfWeek) {
    const weekContentDiv = document.createElement('div');
    weekContentDiv.id = 'week-content-div';
    weekContentDiv.classList.add('week-content-div');
    weekContentDiv.setAttribute("data-week-day", day);

    const lineaHora = document.createElement('div');
    lineaHora.classList.add(`lineHour-day-${day}`);

    weekContentDiv.appendChild(lineaHora);

    if (day === new Date().getDay() && new Date().getDate() === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getWeekNumber() === new Date().getWeekNumber() && currentDate.getFullYear() === new Date().getFullYear()) {
      weekContentDiv.classList.add('week-today');
    }

    for (let h = 0; h < 24; h++) {
      
      const hourWeekContentDiv = document.createElement('div');
      hourWeekContentDiv.id = 'hour-week-content-div';
      hourWeekContentDiv.classList.add('hour-week-content-div');
      hourWeekContentDiv.setAttribute("data-day", days[day].getDate());
      const hourWithoutHrs = hourDayWeek[h].replace(':00 hrs', ''); // Removes 'hrs' from the end
      const hourWithoutHrsComplete = hourDayWeek[h].replace('hrs', ''); // Removes 'hrs' from the end
      hourWeekContentDiv.setAttribute("data-hour", hourWithoutHrs);// <-- hours in the day
      hourWeekContentDiv.setAttribute("data-hour-complete", hourWithoutHrsComplete);
      hourWeekContentDiv.setAttribute("data-week-day", day);
      hourWeekContentDiv.setAttribute('data-month', days[day].getMonth());
      hourWeekContentDiv.setAttribute('data-year', days[day].getFullYear());

      weekContentDiv.appendChild(hourWeekContentDiv);

    }

    $weekContent.appendChild(weekContentDiv);
  }

  for (let i = 0; i < daysOfWeek.length; i++) {
    
    if (thisDate.getDay() === i) {
      actualizarLineaHora(i, daysInDom[i]);

      // Update the line every minute
      setInterval(actualizarLineaHora(i, daysInDom[i]), 60000);
    }

  }
  
  eventsWeek();
}

// Line that shows the current time
function actualizarLineaHora(dayNum, numItera) {
  const contenedorHoras = document.querySelectorAll('.week-content-div');
  const lineaHora = document.querySelector(`.lineHour-day-${dayNum}`);
  lineaHora.style.display = 'block';

  // Get the current hour and minutes
  const horaActual = new Date().getHours();
  const minutosActual = new Date().getMinutes();

  // Calculates the percentage based on the current hour and minutes (considering 24 hours and 60 minutes as 100%)
  const porcentaje = ((horaActual * 60 + minutosActual) / (24 * 60)) * 100;

  // Calculates the new position in pixels
  const nuevaPosicion = (porcentaje / 100) * contenedorHoras[numItera].offsetHeight;

  // Updates the position of the line
  lineaHora.style.top = `${nuevaPosicion}px`;
}

/*------------*/
/*-API Events-*/
/*------------*/
function IsLoaded() {
  document.querySelector(".content-loader").style.display = "none";
}

//Events Week
async function eventsWeek() {
  try {
    const basicWeek = await fetch(URL);
    const basicWeekJSON = await basicWeek.json();

    const eventWekk = document.querySelectorAll(".hour-week-content-div");
    if (basicWeekJSON.events.length !== 0) {
      for (let e = 0; e < basicWeekJSON.events.length; e++) {
        let eventData = datesFetch(basicWeekJSON, e).eventData;

        for (const ele of eventWekk) {
          let dataHourEle = parseInt(ele.getAttribute('data-hour'));
          let dataDateEle = parseInt(ele.getAttribute('data-day'));
          let dayDayEle = parseInt(ele.getAttribute('data-week-day'));
          
          if (
            dataHourEle >= eventData.dateStart.getHours() &&
            dataHourEle <= eventData.dateFinish.getHours() &&
            eventData.dateStart.getDay() === dayDayEle &&
            eventData.dateStart.getMonth() === currentDate.getMonth() &&
            eventData.dateStart.getFullYear() === currentDate.getFullYear() &&
            eventData.dateStart.getWeekNumber() === currentDate.getWeekNumber()
          ) {
            
            ele.innerHTML += datesFetch(basicWeekJSON, e, "week").btns;

          } else if (eventData.dateStart.getDate() < eventData.dateFinish.getDate()) {
            
            for (let i = eventData.dateStart; i <= eventData.dateFinish; i = new Date(i.getTime() + 1000 * 60 * 60 * 24)) {
              if (
                i.getDay() === dayDayEle &&
                i.getMonth() === currentDate.getMonth() &&
                i.getFullYear() === currentDate.getFullYear() &&
                i.getWeekNumber() === currentDate.getWeekNumber() &&
                dataHourEle >= eventData.dateStart.getHours() &&
                dataHourEle <= eventData.dateFinish.getHours()
              ) {
                ele.innerHTML += datesFetch(basicWeekJSON, e, "week").btns;
              }
            }

          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    IsLoaded();
  }
}
