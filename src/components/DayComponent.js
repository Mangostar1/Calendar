import { currentDate, getTotalDays, startDay } from "../index.js";

//button with fetch dates
import { datesFetch } from "../helpers/datesFetch.js";

//url fetch
import URL from "../helpers/UrlToFetch.js";

//language
import languageHandler from "../i18n/en-es.js";

export function DayComponent(element) {
  const $DayContent = document.createElement("article");
  $DayContent.classList.add("day-article");
  $DayContent.id = "container-Day-content";
  $DayContent.innerHTML = `
        <aside id="month-calendar-day-component" class="month-calendar-day-component">
          <div id="dates-info">
            <h2 id="day-component-current-date"></h2>
            <p id="day-component-current-month-year"></p>
          </div>
          <div id="day-component-month-info">
            <div id="day-compmponent-week-days">
              ${languageHandler.es.weekAbbreviations.map((item) => `<li class="">${item.day}</li>`).join('')}
            </div>
            <div id="day-compmponent-month">
              ${(() => {
                let result = '';
                for (let i = startDay(); i > 0; i--) {
                  result += `<li class="day-content-day-month lastMonthYear" data-last-month-day="${getTotalDays(currentDate.getMonth() - 1) - (i - 1)}" data-last-month-number="${currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1}" onclick="goToDayClick(this)">
                              ${getTotalDays(currentDate.getMonth() - 1) - (i - 1)}
                            </li>`;
                }
                for (let i = 1; i <= getTotalDays(currentDate.getMonth()); i++) {
                  if(i === new Date().getDate() && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()) {
                    result += `<li class="day-content-day-month day-content-today" data-day="${i}" data-month-number="${currentDate.getMonth()}" onclick="goToDayClick(this)">${i}</li>`;
                  } else {
                    result += `<li class="day-content-day-month" data-day="${i}" data-month-number="${currentDate.getMonth()}" onclick="goToDayClick(this)">${i}</li>`;
                  }
                }
                return result;
              })()}
            </div>
          </div>
        </aside>
        <div id="container-Day" class="day-content">
          <div id="dates-control-day" class="dates-control">
              <div id="" class="header-date-details">
                <p id="header-date-details-text" class="header-date-details-text"></p>
              </div>
              <div>
                <button id="prev-day" class="prev"> &#10094; </button>
                <button id="btnToday">Hoy</button>
                <button id="next-day" class="next"> &#10095; </button>
              </div>
          </div>
          <hr>
          <div class="content-loader">
              <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div id="container-Day-Hours">
            <div id="lineaHora"></div>
          </div>
        </div>
        `;

  element.appendChild($DayContent);
}

export function hourDayComponent(currentDate) {
  const $containerDay = document.getElementById("container-Day-Hours");
  const hourDay = [
    { hour: "00:00 hrs" },
    { hour: "01:00 hrs" },
    { hour: "02:00 hrs" },
    { hour: "03:00 hrs" },
    { hour: "04:00 hrs" },
    { hour: "05:00 hrs" },
    { hour: "06:00 hrs" },
    { hour: "07:00 hrs" },
    { hour: "08:00 hrs" },
    { hour: "09:00 hrs" },
    { hour: "10:00 hrs" },
    { hour: "11:00 hrs" },
    { hour: "12:00 hrs" },
    { hour: "13:00 hrs" },
    { hour: "14:00 hrs" },
    { hour: "15:00 hrs" },
    { hour: "16:00 hrs" },
    { hour: "17:00 hrs" },
    { hour: "18:00 hrs" },
    { hour: "19:00 hrs" },
    { hour: "20:00 hrs" },
    { hour: "21:00 hrs" },
    { hour: "22:00 hrs" },
    { hour: "23:00 hrs" },
  ];
  hourDay.forEach((item) => {
    const hourWithoutHrs = item.hour.replace(' hrs', ''); // Eliminar "hrs" del final
    $containerDay.innerHTML += `<div class="diario">
                <p class="hora">  ${item.hour} </p>
                <div class="dia-hora event eventDay" data-hour="${hourWithoutHrs}" data-day="${currentDate.getDate()}" data-month="${currentDate.getMonth()}" data-year="${currentDate.getFullYear()}"></div>
            </div>`;
  });

    document.getElementById("header-date-details-text").innerHTML = `${languageHandler.es.dayNames[currentDate.getDay()]}, ${currentDate.getDate()} ${languageHandler.es.prep[0]} ${languageHandler.es.monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;

    document.getElementById("day-component-current-date").innerHTML = `${currentDate.getDate()}`;

    document.getElementById("day-component-current-month-year").innerHTML = `${languageHandler.es.dayNames[currentDate.getDay()]}, ${languageHandler.es.monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  //Imprime/Actualiza los eventos en el calendario
  inicioEventoDia();

  // Actualizar la línea al cargar la página
  actualizarLineaHora();

  // Actualizar la línea cada minuto
  setInterval(actualizarLineaHora, 60000);
}

//Quita el loader
function IsLoaded() {
  document.querySelector(".content-loader").style.display = "none";
}

//Linea que muestra la hora actual
function actualizarLineaHora() {
  const contenedorHoras = document.getElementById('container-Day-Hours');
  const lineaHora = document.getElementById('lineaHora');

  // Obtener la hora y minutos actuales
  const horaActual = new Date().getHours();
  const minutosActual = new Date().getMinutes();

  // Calcular el porcentaje basado en la hora y los minutos actuales (considerando 24 horas y 60 minutos como 100%)
  const porcentaje = ((horaActual * 60 + minutosActual) / (24 * 60)) * 100;

  // Calcular la nueva posición en píxeles
  const nuevaPosicion = (porcentaje / 100) * contenedorHoras.offsetHeight;

  // Actualizar la posición de la línea
  lineaHora.style.top = `${nuevaPosicion}px`;
}

//Imprime los botones/div de los eventos en el calendario
async function inicioEventoDia() {
  try {
    const $eventLi = document.getElementsByClassName("eventDay");
    const basicStruc = await fetch(URL);
    const primerEvento = await basicStruc.json();

    if (primerEvento.length !== 0) {
      for (let e = 0; e < primerEvento.events.length; e++) {
        let eventData = datesFetch(primerEvento, e).eventData;
        let hourStart = eventData.dateStart.getHours();
        let hourFinish = eventData.dateFinish.getHours();

        // Check if the event lasts more than one day
        if (
          eventData.dateStart.toDateString() !==
          eventData.dateFinish.toDateString()
        ) {
          const eventDuration =
            (eventData.dateFinish - eventData.dateStart) /
            (1000 * 60 * 60 * 24);

          for (let i = 0; i <= eventDuration; i++) {
            const currentDateCopy = new Date(eventData.dateStart.getTime());
            currentDateCopy.setDate(currentDateCopy.getDate() + i);
            if (
              currentDateCopy.getDate() === currentDate.getDate() &&
              currentDateCopy.getMonth() === currentDate.getMonth() &&
              currentDateCopy.getFullYear() === currentDate.getFullYear()
            ) {
              for (let h = hourStart; h <= hourFinish; h++) {
                $eventLi[h].innerHTML += datesFetch(primerEvento, e).btns;
              }
            }
          }
        } else {
          for (let h = hourStart; h <= hourFinish; h++) {
            if (
              eventData.dateStart.getDay() === currentDate.getDay() &&
              eventData.dateStart.getDate() === currentDate.getDate() &&
              eventData.dateStart.getMonth() === currentDate.getMonth() &&
              eventData.dateStart.getFullYear() === currentDate.getFullYear()
            ) {
              $eventLi[h].innerHTML += datesFetch(primerEvento, e).btns;
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
