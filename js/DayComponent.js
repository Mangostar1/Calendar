import { currentDate} from "./calendar.js";

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
        <h2 id="cambia-dia"></h2>
        <div class="content-loader">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>`;

    element.appendChild($DayContent);
}

export function hourDayComponent(currentDate) {
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
                    <li class="event eventDay"></li>
                </ul>
            </div>`;
    });
    const nameDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    document.getElementById('cambia-dia').innerHTML = nameDay[currentDate.getDay()] + " " + currentDate.getDate();

    inicioEventoDia();
}

function IsLoaded() {
    document.querySelector(".content-loader").style.display="none";
}

async function inicioEventoDia() {
    try {
        const $eventoLi = document.getElementsByClassName("eventDay");
        //const basicStruc = await fetch("http://localhost:5500/basicStructure.json");// <-- For development
        const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
        const primerEvento = await basicStruc.json();
    
        if (primerEvento.length !== 0) {
            for (let e = 0; e < primerEvento.events.length; e++) {
                const datesJSON = primerEvento.events[e].dateStartEvent;
                const datesSplit = datesJSON.split("-");

                const datesFinishJSON = primerEvento.events[e].dateFinishEvent;
                const datesFinishSplit = datesJSON.split("-");
            
                let horaInicial = primerEvento.events[e].hourStart;
                let horaSplit = horaInicial.split(':');
                let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2], horaSplit[0], horaSplit[1], horaSplit[2]);

                let horafinal = primerEvento.events[e].hourFinish;
                let horafinalSplit = horafinal.split(':');
                let dateFinishEvent = new Date(datesFinishSplit[0], datesFinishSplit[1], datesFinishSplit[2], horafinalSplit[0], horafinalSplit[1], horafinalSplit[2]);

                let tituloEvento = primerEvento.events[e].title;
                let descriptcionEvent = primerEvento.events[e].description;
            
                let hours = fechaEvento.getHours();
    
                let btns =
                    `<button id="event-Modal" class="btn-item" data-date-start=${datesJSON} data-date-finish=${datesFinishJSON} data-hour-start="${horaInicial}" data-hour-finish="${horafinal}" data-title="${tituloEvento}" data-description="${descriptcionEvent}">
                        <span class="sp-title"> ${tituloEvento} </span>
                    </button>`;
            
                // Day
                if (fechaEvento.getDay() === currentDate.getDay() && fechaEvento.getDate() === currentDate.getDate() && fechaEvento.getMonth() === currentDate.getMonth() && fechaEvento.getFullYear() === currentDate.getFullYear()) {
                    $eventoLi[hours].innerHTML += btns;
                }
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        IsLoaded();
    }
}