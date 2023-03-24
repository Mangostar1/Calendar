import { getTotalDays, startDay, currentDate } from "../calendar.js";
import { datesFetch } from '../helpers/datesFetch.js';

export function MonthComponent(element) {
    const $MonthContent = document.createElement('article');
    $MonthContent.classList.add('wrapper');
    $MonthContent.id = "container-month";
    $MonthContent.innerHTML = `
        <div id="dates-control-month" class="dates-control">
            <button id="prev-month" class="prev">&#10094;</button>
            <h1 id="date-month" class="fecha">Diciembre de 2021</h1>
            <button id="next-month" class="next">&#10095;</button>
        </div>
        <div id="days-of-month"></div>
        <div class="content-loader">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>`;

    element.appendChild($MonthContent);
}

export function DaysOfMonth(month) {
    const $wrapper = document.getElementById('days-of-month');
    const daysOfWeek = [
        {day: 'Lun'}, {day: 'Mar'}, {day: 'Mié'}, {day: 'Jue'}, {day: 'Vie'}, {day: 'Sáb'}, {day: 'Dom'}
    ];
    daysOfWeek.forEach((item) => {
        $wrapper.innerHTML += `<div class="grid-days"> ${item.day} </div>`;
    });
    
    for (let i = startDay(); i > 0; i--) {
        $wrapper.innerHTML += 
            `<div class="grid-item"><p class="day-number lastMonth"> ${getTotalDays(currentDate.getMonth() - 1)-(i - 1)} </p>
                <ul>
                    <li class="event"></li>
                </ul>
            </div>`;
    }
    
    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i == currentDate.getDate() && month == 0) {
            $wrapper.innerHTML += 
                `<div class="grid-item">
                    <p class="day-number day-month-active"> ${i} </p>
                    <ul>
                        <li class="event" id="evento-${i}"></li>
                    </ul>
                </div>`;
        } else {
            $wrapper.innerHTML += 
                `<div class="grid-item">
                    <p class="day-number"> ${i} </p>
                    <ul>
                        <li class="event" id="evento-${i}"></li>
                    </ul>
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
    document.querySelector(".content-loader").style.display="none";
}


//Eventos del mes
async function eventoMonth() {
    try {
        const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
        const basicMonthJson = await basicMonth.json();

        if (basicMonthJson.length !== 0) {
            for (let d = 0; d < basicMonthJson.events.length; d++) {

                let eventData = datesFetch(basicMonthJson, d).eventData;
                
                let getDateOf_dateMonthStart = eventData.dateStart.getDate();
                let getDateOf_dateMonthFinish = eventData.dateFinish.getDate();
                
                for (let i = getDateOf_dateMonthStart; i <= getDateOf_dateMonthFinish; i++) {
                    let $eventMonth = document.getElementById(`evento-${i}`);
                    if ($eventMonth) {
                            
                        if (eventData.dateStart.getMonth() === currentDate.getMonth() && eventData.dateStart.getFullYear() === currentDate.getFullYear()) {
                            $eventMonth.innerHTML += datesFetch(basicMonthJson, d).btns;
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
    //const basicMonth = await fetch("http://localhost:3000/events");// <-- For development
    const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");// <-- For production
    const basicMonthJson = await basicMonth.json();

    if (basicMonthJson.length !== 0) {// <-- Si dentro de un dia de la semana hay eventos, este recorre todos los eventos agendados en el dia
        for (let d = 0; d < basicMonthJson.length; d++) {// <-- Con este for recorro todos los eventos del dia en cuestion
            let datesJSON = basicMonthJson[d].dateStartEvent;
            
            const datesSplit = datesJSON.split('-');
            
            let dateMonth = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);
            let diames = dateMonth.getDate();
            let eventMonth = document.getElementById(`evento-${diames}`);

            let horaInicial = basicMonthJson[d].hourStart;
            let horafinal = basicMonthJson[d].hourFinish;
            let tituloEvento = basicMonthJson[d].title;
            let descriptcionEvent = basicMonthJson[d].description;

            let btns =
            `<button id="event-Modal" class="btn-item btm-event-month" data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}" data-description="${descriptcionEvent}">
                <span class="sp-title"> ${tituloEvento} </span>
            </button>`;
            
            if (dateMonth.getMonth() === currentDate.getMonth() && dateMonth.getFullYear() === currentDate.getFullYear()) {
                eventMonth.innerHTML += btns;
            }
        }
    }
}