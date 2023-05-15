import { getTotalDays, startDayYear, currentDate } from "../index.js";

//language
import languageHandler from "../i18n/en-es.js";

let monthsOfYear = "";

for (let m = 0; m < 12; m++) {
  monthsOfYear += `
	<div class="meses">
	<h2 class="tittle">${languageHandler.es.monthNames[m]}Enero</h2>
	<div class="calendar">
			<div id="day-name-${languageHandler.es.monthNamesShort[m]}" class="day-name-div"></div>
			<div id="day-div-${languageHandler.es.monthNamesShort[m]}"" class="day-div"></div>
	</div>
	</div>
	`;
}

export function YearComponent(element) {
  //<-- Create the <article>, in this element will be print all info related be year.
  const $yearContent = document.createElement("article");
  $yearContent.classList.add("year-content");
  $yearContent.id = "container-Year";
  $yearContent.innerHTML = `<div id="dates-control-year" class="dates-control">
            <button id="prev-year" class="prev">&#10094;</button>
            <h1 id="date-year" class="fecha">Diciembre de 2021</h1>
            <button id="next-year" class="next">&#10095;</button>
        </div>
        <div id="days-of-year">
            ${monthsOfYear}
        </div>`;

  element.appendChild($yearContent);
}

export function DaysOFYear() {
  //<-- Add day names on the month
  const $dayNameYear = document.getElementsByClassName("day-name-div");

  languageHandler.es.weekAbbreviations.forEach((item) => {
    for (let i = 0; i < 12; i++) {
      $dayNameYear[i].innerHTML += `<li class="day-name"> ${item.day} </li>`;
    }
  });
}

export function writeYear() {
  //<--
  const $daysMonthYear = document.getElementsByClassName("day-div");

  for (let y = 0; y < 12; y++) {
    for (let i = startDayYear(y); i > 0; i--) {
      $daysMonthYear[y].innerHTML += `<li class="day lastMonthYear"> ${
        getTotalDays(currentDate.getMonth() - 1) - (i - 1)
      } </li>`;
    }
    for (let i = 1; i <= getTotalDays(y); i++) {
      $daysMonthYear[y].innerHTML += `<li class="day"> ${i} </li>`;
    }
  }
}
