import { currentDate, addDays } from "../index.js";
import { datesFetch } from "../helpers/datesFetch.js";
import URL from "../helpers/UrlToFetch.js";

export function WeekComponent(element) {
  //<-- Create the <article>, in this element will be print all info related be Week.
  const $WeekContent = document.createElement("article");
  $WeekContent.classList.add("container-week");
  $WeekContent.id = "container-week";

  $WeekContent.innerHTML = `<div id="dates-control-week" class="dates-control">
        <button id="prev-week" class="prev">&#10094;</button>
        <h1 id="date-week" class="fecha">Diciembre de 2021</h1>
        <button id="next-week" class="next">&#10095;</button>
    </div>
    <div id="days-of-week">
        <div class="grid-days">
            <p class="day-week">Lun</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Mar</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Mié</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Jue</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Vie</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Sáb</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Dom</p>
            <p class="day-week daysNumber"></p>
        </div>
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

  for (let w = 0; w < 168; w++) {
    $weekContent.innerHTML += `<div class="semanal">
                <ul>
                    <li class="event eventWeek"></li>
                </ul>
            </div>`;
  }

  for (var i = 0; i < 7; i++) {
    const days = [
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
  }
  eventsWeek();

  /*--Hours--*/
  setTimeout(() => {
    let semanal = document.querySelectorAll(".semanal");

    function pushHoursWeek(hora) {
      return `<p class="hours-in-Week">${hora}</p>`;
    }

    for (let h = 0; h < 168; h++) {
      semanal[h].innerHTML += pushHoursWeek(hourDayWeek[Math.floor(h / 7)]);
    }
  }, 1);
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

    const eventWekk = document.querySelectorAll(".eventWeek");
    if (basicWeekJSON.events.length !== 0) {
      for (let e = 0; e < basicWeekJSON.events.length; e++) {
        let eventData = datesFetch(basicWeekJSON, e).eventData;

        let day = 1; // Weekday from Monday to Sunday | starts at 1 to correspond with Monday in the Date() object
        let horas = 0; // Event time | Currently displayed on the calendar

        for (let w = 0; w < 168; w++) {
          if (
            // If the event lasts only one day
            horas >= eventData.dateStart.getHours() &&
            horas <= eventData.dateFinish.getHours() &&
            eventData.dateStart.getDay() === day % 7 &&
            eventData.dateStart.getMonth() === currentDate.getMonth() &&
            eventData.dateStart.getFullYear() === currentDate.getFullYear() &&
            eventData.dateStart.getWeekNumber() === currentDate.getWeekNumber()
          ) {
            eventWekk[w].innerHTML += datesFetch(basicWeekJSON, e).btns;
          } else if (
            eventData.dateStart.getDate() < eventData.dateFinish.getDate()
          ) {
            // If the event lasts more than one day

            for (
              let i = eventData.dateStart;
              i <= eventData.dateFinish;
              i = new Date(i.getTime() + 1000 * 60 * 60 * 24)
            ) {
              if (
                i.getDay() === day % 7 &&
                i.getMonth() === currentDate.getMonth() &&
                i.getFullYear() === currentDate.getFullYear() &&
                i.getWeekNumber() === currentDate.getWeekNumber() &&
                horas >= eventData.dateStart.getHours() &&
                horas <= eventData.dateFinish.getHours()
              ) {
                eventWekk[w].innerHTML += datesFetch(basicWeekJSON, e).btns;
              }
            }
          }

          // If this if statement validates the condition, one hour is added to the day and the 'day' is reset to 0 to correspond to the start of the week but at a different hour
          if ((w + 1) % 7 == 0) {
            horas++;
            day = 0; //<-- It is set to 0. Upon exiting the 'if' statement, it will be reset to 1, as in its initial declaration on line 197.
          }
          day++;
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    IsLoaded();
  }
}
