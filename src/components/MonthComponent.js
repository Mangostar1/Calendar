import { getTotalDays, startDay, currentDate } from "../index.js";
import { datesFetch } from "../helpers/datesFetch.js";

//url fetch
import URL from "../helpers/UrlToFetch.js";

//language
import languageHandler from "../i18n/en-es.js";

export function MonthComponent(element) {
  //<-- Create the <article>, in this element will be print all info related be month.
  const $MonthContent = document.createElement("article");
  $MonthContent.classList.add("wrapper");
  $MonthContent.id = "container-month";
  $MonthContent.innerHTML = `
        <div id="dates-control-month" class="dates-control">
              <div id="" class="header-date-details">
                <p id="date-month" class="header-date-details-text"></p>
              </div>
              <div>
                <button id="prev-month" class="prev"> &#10094; </button>
                <button id="btnToday">Hoy</button>
                <button id="next-month" class="next"> &#10095; </button>
              </div>
          </div>
        <div id="days-of-month"></div>
        <div class="content-loader">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>`;

  element.appendChild($MonthContent);
}

export function DaysOfMonth(month, currentDate) {
  const $wrapper = document.getElementById("days-of-month");

  languageHandler.es.dayNameShort.forEach((item) => {
    $wrapper.innerHTML += `<div class="grid-days"> ${item.day} </div>`;
  });

  for (let i = startDay(); i > 0; i--) {//<-- Imprime los dias anteriores al primer dia del mes (por si el 1 cae martes u otro dia en adelante)
    $wrapper.innerHTML += `<div class="grid-item"><p class="day-number lastMonth"> ${
      getTotalDays(currentDate.getMonth() - 1) - (i - 1)
    } </p>
                <div class="event"></div>
            </div>`;
  }

  for (let i = 1; i <= getTotalDays(month); i++) {//<-- Imprime los dias del mes
    if (i == new Date().getDate() && month == new Date().getMonth()) {
      $wrapper.innerHTML += 
                `<div class="grid-item day-month-active" data-month="${month}" data-day="${i}" data-year="${currentDate.getFullYear()}">
                    <p class="day-number day-month-number-active"> ${i} </p>
                    <div class="event" id="evento-${i}"></div>
                </div>`;
    } else {
      $wrapper.innerHTML += 
                `<div class="grid-item" data-month="${month}" data-day="${i}" data-year="${currentDate.getFullYear()}">
                    <p class="day-number"> ${i} </p>
                    <div class="event" id="evento-${i}"></div>
                </div>`;
    }
  }
  if (screen.width < 768) {
    eventoMonthMobile();
  } else {
    eventoMonth();
  }
}

function IsLoaded() {
  document.querySelector(".content-loader").style.display = "none";
}

//Eventos del mes
async function eventoMonth() {
  try {
    const basicMonth = await fetch(URL);
    const basicMonthJson = await basicMonth.json();

    if (basicMonthJson.length !== 0) {
      let totalInnerHtmlExecutions = 0; // Contador para contar las ejecuciones de innerHTML

      for (let d = 0; d < basicMonthJson.events.length; d++) {
        let eventData = datesFetch(basicMonthJson, d).eventData;

        let getDateOf_dateMonthStart = eventData.dateStart.getDate();
        let getDateOf_dateMonthFinish = eventData.dateFinish.getDate();

        for (let i = getDateOf_dateMonthStart; i <= getDateOf_dateMonthFinish; i++) {
          let $eventMonth = document.getElementById(`evento-${i}`);
          if ($eventMonth) {
            if (
              eventData.dateStart.getMonth() === currentDate.getMonth() &&
              eventData.dateStart.getFullYear() === currentDate.getFullYear()
            ) {
              $eventMonth.innerHTML += datesFetch(basicMonthJson, d, "month").btns;
              totalInnerHtmlExecutions++; // Incrementa el contador
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

//btn en formato movil
async function eventoMonthMobile() {
  const basicMonth = await fetch(URL); // <-- For production
  const basicMonthJson = await basicMonth.json();

  if (basicMonthJson.length !== 0) {
    // <-- Si dentro de un dia de la semana hay eventos, este recorre todos los eventos agendados en el dia
    for (let d = 0; d < basicMonthJson.length; d++) {
      // <-- Con este for recorro todos los eventos del dia en cuestion
      let datesJSON = basicMonthJson[d].dateStartEvent;

      const datesSplit = datesJSON.split("-");

      let dateMonth = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);
      let diames = dateMonth.getDate();
      let eventMonth = document.getElementById(`evento-${diames}`);

      let horaInicial = basicMonthJson[d].hourStart;
      let horafinal = basicMonthJson[d].hourFinish;
      let tituloEvento = basicMonthJson[d].title;
      let descriptcionEvent = basicMonthJson[d].description;

      let btns = `<button id="event-Modal" class="btn-item btm-event-month" data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}" data-description="${descriptcionEvent}">
                <span class="sp-title"> ${tituloEvento} </span>
            </button>`;

      if (
        dateMonth.getMonth() === currentDate.getMonth() &&
        dateMonth.getFullYear() === currentDate.getFullYear()
      ) {
        eventMonth.innerHTML += btns;
      }
    }
  }
}
