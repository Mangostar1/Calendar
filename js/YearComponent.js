import { getTotalDays, startDayYear, currentDate, currentDayName, currentWeek, currentMonth, currentYear} from "./calendar.js";

export function YearComponent(element) {
    const $yearContent = document.createElement('div');
    $yearContent.classList.add('year-content');
    $yearContent.id = "container-Year";
    $yearContent.innerHTML = 
        `<div id="dates-control-year" class="dates-control">
            <button id="prev-year" class="prev">&#10094;</button>
            <h1 id="fecha-year" class="fecha">Diciembre de 2021</h1>
            <button id="next-year" class="next">&#10095;</button>
        </div>
        <div id="days-of-year">
            <div class="meses">
                <h2 class="tittle">Enero</h2>
                <div class="calendar">
                    <div id="day-name-ene" class="day-name-div"></div>
                    <div id="day-div-ene" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Febrero</h2>
                <div class="calendar">
                    <div id="day-name-feb" class="day-name-div"></div>
                    <div id="day-div-feb" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Marzo</h2>
                <div class="calendar">
                    <div id="day-name-mar" class="day-name-div"></div>
                    <div id="day-div-mar" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Abril</h2>
                <div class="calendar">
                    <div id="day-name-abr" class="day-name-div"></div>
                    <div id="day-div-abr" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Mayo</h2>
                <div class="calendar">
                    <div id="day-name-may" class="day-name-div"></div>
                    <div id="day-div-may" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Junio</h2>
                <div class="calendar">
                    <div id="day-name-jun" class="day-name-div"></div>
                    <div id="day-div-jun" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Julio</h2>
                <div class="calendar">
                    <div id="day-name-jul" class="day-name-div"></div>
                    <div id="day-div-jul" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Agosto</h2>
                <div class="calendar">
                    <div id="day-name-ago" class="day-name-div"></div>
                    <div id="day-div-ago" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Septiembre</h2>
                <div class="calendar">
                    <div id="day-name-sep" class="day-name-div"></div>
                    <div id="day-div-sep" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Octubre</h2>
                <div class="calendar">
                    <div id="day-name-oct" class="day-name-div"></div>
                    <div id="day-div-oct" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Noviembre</h2>
                <div class="calendar">
                    <div id="day-name-nov" class="day-name-div"></div>
                    <div id="day-div-nov" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Diciembre</h2>
                <div class="calendar">
                    <div id="day-name-dic" class="day-name-div"></div>
                    <div id="day-div-dic" class="day-div"></div>
                </div>
            </div>
        </div>`;

    element.appendChild($yearContent);
}

export function DaysOFYear() {
    const $dayNameYear = document.getElementsByClassName("day-name-div");
    const nameWeeck = [
        {day: 'L'}, {day: 'M'}, {day: 'M'}, {day: 'J'}, {day: 'V'}, {day: 'S'}, {day: 'D'}
    ];

    nameWeeck.forEach((item) => {
        for (let i = 0; i < 12; i++) {
            $dayNameYear[i].innerHTML += `<li class="day-name"> ${item.day} </li>`;
        }
    });
}

export function writeYear() {
    const $daysMonthYear = document.getElementsByClassName("day-div");
    //Enero
    for (let i = startDayYear(0); i > 0; i--) {
        $daysMonthYear[0].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(0); i++) {
        $daysMonthYear[0].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Febrero
    for (let i = startDayYear(1); i > 0; i--) {
        $daysMonthYear[1].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(1); i++) {
        $daysMonthYear[1].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Marzo
    for (let i = startDayYear(2); i > 0; i--) {
        $daysMonthYear[2].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(2); i++) {
        $daysMonthYear[2].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Abril
    for (let i = startDayYear(3); i > 0; i--) {
        $daysMonthYear[3].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(3); i++) {
        $daysMonthYear[3].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Mayo
    for (let i = startDayYear(4); i > 0; i--) {
        $daysMonthYear[4].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(4); i++) {
        $daysMonthYear[4].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Junio
    for (let i = startDayYear(5); i > 0; i--) {
        $daysMonthYear[5].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(5); i++) {
        $daysMonthYear[5].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Julio
    for (let i = startDayYear(6); i > 0; i--) {
        $daysMonthYear[6].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(6); i++) {
        $daysMonthYear[6].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Agosto
    for (let i = startDayYear(7); i > 0; i--) {
        $daysMonthYear[7].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(7); i++) {
        $daysMonthYear[7].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Septiembre
    for (let i = startDayYear(8); i > 0; i--) {
        $daysMonthYear[8].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(8); i++) {
        $daysMonthYear[8].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Octubre
    for (let i = startDayYear(9); i > 0; i--) {
        $daysMonthYear[9].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(9); i++) {
        $daysMonthYear[9].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Noviembre
    for (let i = startDayYear(10); i > 0; i--) {
        $daysMonthYear[10].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(10); i++) {
        $daysMonthYear[10].innerHTML += `<li class="day"> ${i} </li>`;
    }
    //Diciembre
    for (let i = startDayYear(11); i > 0; i--) {
        $daysMonthYear[11].innerHTML += `<li class="day lastMonthYear"> ${getTotalDays(currentMonth - 1)-(i - 1)} </li>`;
    }
    for (let i = 1; i <= getTotalDays(11); i++) {
        $daysMonthYear[11].innerHTML += `<li class="day"> ${i} </li>`;
    }
}