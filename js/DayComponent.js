import { getTotalDays, startDay, currentWeek, currentMonth, currentYear, currentDayName} from "./calendar.js";

export function DayComponent(element) {
    const $DayContent = document.createElement('div');
    $DayContent.classList.add('day-content');
    $DayContent.id = "container-Day";
    $DayContent.innerHTML = `
        <div id="dates-control-day" class="dates-control">
            <button id="prev-day" class="prev"> &#10094; </button>
            <h1 id="fecha-day" class="fecha">Diciembre de 2021</h1>
            <button id="next-day" class="next"> &#10095; </button>
        </div>
        <hr>
        <h2 id="cambia-dia"></h2>`;

    element.appendChild($DayContent);
}

export function hourDayComponent() {
    const $containerDay = document.getElementById("container-Day");
    let hourDay = [{
        hour: "00:00 hrs"}, 
        {hour: "01:00 hrs"}, 
        {hour: "02:00 hrs"}, 
        {hour: "03:00 hrs"}, 
        {hour: "04:00 hrs"},
        {hour: "05:00 hrs"}, 
        {hour: "06:00 hrs"}, 
        {hour: "07:00 hrs"}, 
        {hour: "08:00 hrs"}, 
        {hour: "09:00 hrs"}, 
        {hour: "10:00 hrs"}, 
        {hour: "11:00 hrs"}, 
        {hour: "12:00 hrs"}, 
        {hour: "13:00 hrs"}, 
        {hour: "14:00 hrs"}, 
        {hour: "15:00 hrs"}, 
        {hour: "16:00 hrs"}, 
        {hour: "17:00 hrs"}, 
        {hour: "18:00 hrs"}, 
        {hour: "19:00 hrs"}, 
        {hour: "20:00 hrs"}, 
        {hour: "21:00 hrs"}, 
        {hour: "22:00 hrs"}, 
        {hour: "23:00 hrs"}
    ];
    hourDay.forEach((item) => {
        $containerDay.innerHTML += 
            `<div class="diario">
                <p class="hora">  ${item.hour} </p>
                <ul>
                    <li class="event">Test</li>
                </ul>
            </div>`;
    });
    inicioEventoDia();
}

const $eventoLi = document.getElementsByClassName("event");

async function inicioEventoDia() {
    //const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");// <-- For production
    const basicStruc = await fetch("http://localhost:3000/events");// <-- For development
    const primerEvento = await basicStruc.json();

    const datesJSON = primerEvento[0].dayEvents[0].dateStartEvent;
    const datesSplit = datesJSON.split("-");

    let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);

    let horaInicial = primerEvento[0].dayEvents[0].hourStart;
    let horafinal = primerEvento[0].dayEvents[0].hourFinish;
    let tituloEvento = primerEvento[0].dayEvents[0].title;

    let hours = fechaEvento.getHours();

    // Day
    if (fechaEvento.getDate() === currentWeek && fechaEvento.getDay() === currentDayName && fechaEvento.getFullYear() === currentYear) {
        $eventoLi[hours].innerHTML = 
            `<button id="event-Modal" class="btn-item" data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}">
                <span class="sp-hour"> ${horaInicial} </span> - <span class="sp-title"> ${tituloEvento} </span>
            </button>`;
    } else {
        $eventoLi[hours].innerHTML = '<li class="event"></li>';
    }
}