import { getTotalDays, startDay, currentWeek, currentMonth, currentYear} from "./calendar.js";

export function MonthComponent(element) {
    let MonthContent = document.createElement('div');
    MonthContent.classList.add('wrapper');
    MonthContent.id = "container-month";
    MonthContent.innerHTML = `
        <div id="dates-control-month" class="dates-control">
            <button id="prev-month" class="prev">&#10094;</button>
            <h1 id="fecha-month" class="fecha">Diciembre de 2021</h1>
            <button id="next-month" class="next">&#10095;</button>
        </div>
        <div id="days-of-month"></div>`;

    element.appendChild(MonthContent);
}

export function DaysOfMonth(month) {
    let wrapper = document.getElementById('days-of-month');
    const daysOfWeek = [
        {day: 'Lun'}, {day: 'Mar'}, {day: 'Mié'}, {day: 'Jue'}, {day: 'Vie'}, {day: 'Sáb'}, {day: 'Dom'}
    ];
    daysOfWeek.forEach((item) => {
        wrapper.innerHTML += `<div class="grid-days"> ${item.day} </div>`;
    });
    
    for (let i = startDay(); i > 0; i--) {
        wrapper.innerHTML += 
            `<div class="grid-item"><p class="day-number lastMonth"> ${getTotalDays(currentMonth - 1)-(i - 1)} </p>
                <ul>
                    <li class="event"></li>
                </ul>
            </div>`;
    }
    
    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i == currentWeek && month == 0) {
            wrapper.innerHTML += 
                `<div class="grid-item">
                    <p class="day-number day-month-active"> ${i} </p>
                    <ul>
                        <li class="event" id="evento-${i}"></li>
                    </ul>
                </div>`;
        } else {
            wrapper.innerHTML += 
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
    const basicMonth = await fetch("http://localhost:5500/basicStructure.json");
    //const basicMonth = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
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
            eventMonth.innerHTML = 
                `<button class="btn-item" id="btn-event-${i}">
                    <span class="sp-hour"> ${horaInicialAA} - ${horafinalAA} </span> 
                    <br> 
                    <span class="sp-title"> ${tituloEventoAA} </span>
                </button>`;
        } else {
            eventMonth.innerHTML = `<li class="event"></li>`;
        }
    }
}

async function eventoMonthMobile() {
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
            eventMonth.innerHTML = 
                `<button class="btn-item" id="btn-event-${i}">
                </button>`;
        } else {
            eventMonth.innerHTML = `<li class="event"></li>`;
        }
    }
}