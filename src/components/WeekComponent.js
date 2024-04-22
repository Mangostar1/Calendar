import { currentDate, addDays } from "../index.js";
import { datesFetch } from "../helpers/datesFetch.js";

//url fetch
import URL from "../helpers/UrlToFetch.js";

//language
import languageHandler from "../i18n/en-es.js";

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
        ${daysOnWeek}
    </div>
    <div class="content-loader">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>`;

  element.appendChild($WeekContent);
}

export function hourWeekComponent(currentDate, getDay) {
  const $weekContent = document.getElementById("days-of-week");
  const $weekDays = document.getElementsByClassName("daysNumber");
  const hourDayWeek = [
    "00:00 hrs",
    "01:00 hrs",
    "02:00 hrs",
    "03:00 hrs",
    "04:00 hrs",
    "05:00 hrs",
    "06:00 hrs",
    "07:00 hrs",
    "08:00 hrs",
    "09:00 hrs",
    "10:00 hrs",
    "11:00 hrs",
    "12:00 hrs",
    "13:00 hrs",
    "14:00 hrs",
    "15:00 hrs",
    "16:00 hrs",
    "17:00 hrs",
    "18:00 hrs",
    "19:00 hrs",
    "20:00 hrs",
    "21:00 hrs",
    "22:00 hrs",
    "23:00 hrs",
  ];

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

  const daysOfWeek = [1, 2, 3, 4, 5, 6, 0];//<-- array de esta forma porque el calendario se imprime de L a D y no de D a S
  const daysInDom = [0, 1, 2, 3, 4, 5, 6];
  let thisDate = new Date();

  for (let day of daysOfWeek) {
    const weekContentDiv = document.createElement('div');
    weekContentDiv.id = 'week-content-div';
    weekContentDiv.classList.add('week-content-div');
    weekContentDiv.setAttribute("data-week-day", day);

    const lineaHora = document.createElement('div');
    lineaHora.classList.add(`lineHour-day-${day}`);

    weekContentDiv.appendChild(lineaHora);

    if (day === new Date().getDay()) {
      weekContentDiv.classList.add('week-today');
    }

    for (let h = 0; h < 24; h++) {
      
      const hourWeekContentDiv = document.createElement('div');
      hourWeekContentDiv.id = 'hour-week-content-div';
      hourWeekContentDiv.classList.add('hour-week-content-div');
      hourWeekContentDiv.innerHTML += hourDayWeek[h];
      hourWeekContentDiv.setAttribute("data-day", days[day].getDate());//<-- dia del mes
      const hourWithoutHrs = hourDayWeek[h].replace(':00 hrs', ''); // Eliminar "hrs" del final
      hourWeekContentDiv.setAttribute("data-hour", hourWithoutHrs);//<-- horas en el dia
      hourWeekContentDiv.setAttribute("data-week-day", day);

      weekContentDiv.appendChild(hourWeekContentDiv);

    }

    $weekContent.appendChild(weekContentDiv);
  }

  for (let i = 0; i < daysOfWeek.length; i++) {
    
    if (thisDate.getDay() === i) {
      actualizarLineaHora(i, daysInDom[i]);

      // Actualizar la línea cada minuto
      setInterval(actualizarLineaHora(i, daysInDom[i]), 60000);
    }

  }
  
  eventsWeek();
}

//Linea que muestra la hora actual
function actualizarLineaHora(dayNum, numItera) {
  const contenedorHoras = document.querySelectorAll('.week-content-div');
  const lineaHora = document.querySelector(`.lineHour-day-${dayNum}`);
  lineaHora.style.display = 'block';

  // Obtener la hora y minutos actuales
  const horaActual = new Date().getHours();
  const minutosActual = new Date().getMinutes();

  // Calcular el porcentaje basado en la hora y los minutos actuales (considerando 24 horas y 60 minutos como 100%)
  const porcentaje = ((horaActual * 60 + minutosActual) / (24 * 60)) * 100;

  // Calcular la nueva posición en píxeles
  const nuevaPosicion = (porcentaje / 100) * contenedorHoras[numItera].offsetHeight;

  // Actualizar la posición de la línea
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
