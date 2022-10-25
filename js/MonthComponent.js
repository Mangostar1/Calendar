import { getTotalDays, startDay, currentDate, currentWeek, currentMonth, currentYear, currentDayName} from "./calendar.js";

export function MonthComponent(element) {
    const $MonthContent = document.createElement('div');
    $MonthContent.classList.add('wrapper');
    $MonthContent.id = "container-month";
    $MonthContent.innerHTML = `
        <div id="dates-control-month" class="dates-control">
            <button id="prev-month" class="prev">&#10094;</button>
            <h1 id="fecha-month" class="fecha">Diciembre de 2021</h1>
            <button id="next-month" class="next">&#10095;</button>
        </div>
        <div id="days-of-month"></div>`;

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
        if (i == currentWeek && month == 0) {
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

//Eventos del mes
async function eventoMonth() {
    const basicMonth = await fetch("http://localhost:3000/events");// <-- For development
    //const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");// <-- For production
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

            if (dateMonth.getMonth() === currentDate.getMonth() && dateMonth.getFullYear() === currentDate.getFullYear()) {
                eventMonth.innerHTML += 
                    `<button id="event-Modal" class="btn-item btm-event-month" data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}">
                        <span class="sp-hour"> ${horaInicial} - ${horafinal} </span> 
                        <br> 
                        <span class="sp-title"> ${tituloEvento} </span>
                    </button>`;
            } /* else {
                eventMonth.innerHTML = `<li class="event"> </li>`;
            } */
        }
    }
}


//Se requiere actualizar este evento al formato actual
async function eventoMonthMobile() {
    //const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
    const basicMonth = await fetch("http://localhost:3000/events");// <-- For development
    const basicMonthJson = await basicMonth.json();

    for (let i = 0; i < 3; i++) {
        let datesJSON = basicMonthJson[i].dateStartEvent;

        const datesSplit = datesJSON.split('-');

        let dateMonth = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);
        let diames = dateMonth.getDate();
        let eventMonth = document.getElementById(`evento-${diames}`);

        let horaInicialAA = basicMonthJson[i].hourStart;
        let horafinalAA = basicMonthJson[i].hourFinish;
        let tituloEventoAA = basicMonthJson[i].title;

        if (dateMonth.getMonth() === currentMonth && dateMonth.getFullYear() === currentYear) {
            eventMonth.innerHTML = 
                `<button id="event-Modal" class="btn-item" id="btn-event-${i}">
                </button>`;
        } else {
            eventMonth.innerHTML = `<li class="event"></li>`;
        }
    }
}