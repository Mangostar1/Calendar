import { getTotalDays, startDay, currentDate, currentWeek, currentMonth, currentYear, currentDayName} from "./calendar.js";

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

export function hourDayComponent(currentDate, getDay, getDate, getMonth, getFullYear) {
    const $containerDay = document.getElementById("container-Day");
    const hourDay = [{
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
                    <li class="event eventDay">Test</li>
                </ul>
            </div>`;
    });
    const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    document.getElementById('cambia-dia').innerHTML = nameDay[currentDate.getDay()] + " " + currentDate.getDate();

    inicioEventoDia();
}

async function inicioEventoDia() {
    const $eventoLi = document.getElementsByClassName("eventDay");
    //const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");// <-- For production
    const basicStruc = await fetch("http://localhost:3000/events");// <-- For development
    const primerEvento = await basicStruc.json();

    if (primerEvento.length !== 0) {
        for (let e = 0; e < primerEvento.length; e++) {
            const datesJSON = primerEvento[e].dateStartEvent;
            const datesSplit = datesJSON.split("-");
        
            let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2]);
        
            let horaInicial = primerEvento[e].hourStart;
            let horafinal = primerEvento[e].hourFinish;
            let tituloEvento = primerEvento[e].title;
            let descriptcionEvent = primerEvento[e].description;
        
            let hours = fechaEvento.getHours();

            let btns =
                `<button id="event-Modal" class="btn-item" data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}" data-description="${descriptcionEvent}">
                    <span class="sp-title"> ${tituloEvento} </span>
                </button>`;
        
            // Day
            if (fechaEvento.getDay() === currentDate.getDay() && fechaEvento.getDate() === currentDate.getDate() && fechaEvento.getMonth() === currentDate.getMonth() && fechaEvento.getFullYear() === currentDate.getFullYear()) {
                $eventoLi[hours].innerHTML += btns;
                document.querySelector(".content-loader").style.display="none";
            }
        }
    }
}