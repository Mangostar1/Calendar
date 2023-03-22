import { currentDate } from "./calendar.js";
import { datesFetch } from './datesFetch.js';

export function DayComponent(element) {
    const $DayContent = document.createElement('article');
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
    const hourDay = [
        {hour: "00:00 hrs"}, 
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
        const $eventLi = document.getElementsByClassName("eventDay");
        const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
        const primerEvento = await basicStruc.json();
    
        if (primerEvento.length !== 0) {
            for (let e = 0; e < primerEvento.events.length; e++) {

                let eventData = datesFetch(primerEvento, e).eventData;

                let hora = eventData.dateStart.getHours();
                
                if (
                    
                    eventData.dateStart.getDay() === currentDate.getDay()
                    && eventData.dateStart.getDate() === currentDate.getDate()
                    && eventData.dateStart.getMonth() === currentDate.getMonth()
                    && eventData.dateStart.getFullYear() === currentDate.getFullYear()
                ) {
                    $eventLi[hora].innerHTML += datesFetch(primerEvento, e).btns;
                }

                //Probando cosas | Funcinando relativamente bien, falta controlar que se imprima un boton por hora
                // se imprimen 24 botones cada hora o div
                if (
                    eventData.dateStart.getHours() < eventData.dateFinish.getHours()
                    && eventData.dateStart.getDate() === currentDate.getDate()
                ) {
                    const duracion = (eventData.dateFinish - eventData.dateStart) / (1000 * 60 * 60);
                    for (let i = 0; i <= duracion; i++) {
                        const hora = new Date(eventData.dateStart.getTime() + (i * 60 * 60 * 1000)).getHours();
                        $eventLi[hora].innerHTML += datesFetch(primerEvento, e).btns;
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