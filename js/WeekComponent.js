import { fecha, currentDayName, currentWeek, currentMonth, currentYear} from "./calendar.js";

export function WeekComponent(element) {
    const WeekContent = document.createElement('div');
    WeekContent.classList.add('container-week');
    WeekContent.id = "container-week";
    
    WeekContent.innerHTML = 
    `<div id="dates-control-week" class="dates-control">
        <button id="prev-week" class="prev">&#10094;</button>
        <h1 id="fecha-week" class="fecha">Diciembre de 2021</h1>
        <button id="next-week" class="next">&#10095;</button>
    </div>
    <div id="days-of-week">
        <div class="grid-days">
            <p class="diaa-week">Lun</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Mar</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Mié</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Jue</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Vie</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Sáb</p>
            <p class="diaa-week diasNumber"></p>
        </div>

        <div class="grid-days">
            <p class="diaa-week">Dom</p>
            <p class="diaa-week diasNumber"></p>
        </div>
        <div id="grid-hour"></div>
    </div>`;

    element.appendChild(WeekContent);
}

export function hourWeekComponent(getDay, getDate, getMonth, getFullYear) {

    let weekContent = document.getElementById("days-of-week");
    const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let weekDays = document.getElementsByClassName("diasNumber");
    const hourDayWeek = [{
        hour: "Horas"}, 
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

    for (let w = 1; w < 169; w++) {
        weekContent.innerHTML += 
            `<div class="semanal">
                <ul>
                    <li class="event eventWeek"></li>
                </ul>
            </div>`;
    }

    hourDayWeek.forEach((item) => {
        document.getElementById("grid-hour").innerHTML += `<div class="horas"> ${item.hour} </div>`
    });

    let countStartMon = 0; //lunes
    let countStartTue = -1; //martes
    let countStartWed = -2; //miercoles
    let countStartThr = -3; //jueves
    let countStartFre = -4; //viernes
    let countStartSat = -5; //sabado
    let countStartSun = -6; //domingo

    for (var i = 0; i < 7; i++) {//Corregir este for o pasar por testeo | Este for imprime las fechas de la semana en pantalla
        if (getDay === 1) {
            weekDays[i].innerHTML = getDate + countStartMon++;
        } else if (getDay === 2) {
            let d = new Date();
            d.setDate(getDate + countStartTue++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 3) {
            let d = new Date();
            d.setDate(getDate + countStartWed++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 4) {
            let d = new Date();
            d.setDate(getDate + countStartThr++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 5) {
            let d = new Date();
            d.setDate(getDate + countStartFre++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 6) {
            let d = new Date();
            d.setDate(getDate + countStartSat++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 0) {
            let d = new Date();
            d.setDate(getDate + countStartSun++);
            weekDays[i].innerHTML = d.getDate();
        }
    }
    eventsWeek()
}

//Events Week
async function eventsWeek() {
    const basicWeek = await fetch("http://localhost:5500/basicStructure.json");
    const basicWeekJSON = await basicWeek.json();

    const eventWekk = document.getElementsByClassName("eventWeek");
    for (let i = 0; i < 7; i++) {
        if (basicWeekJSON.events[i].dayEvents !== 0) {
            for (let e = 0; e < (basicWeekJSON.events[i].dayEvents).length; e++) {// <-- Events in
                
                //Dates yy - mm - dd for new Date()
                const datesJSON = basicWeekJSON.events[i].dayEvents[e].dateStartEvent;
                const datesSplit = datesJSON.split("-");
            
                //Hours hour:minutes:secons for new Date()
                const hoursJSON = basicWeekJSON.events[i].dayEvents[e].hourStart;
                const hoursSplit = hoursJSON.split(":");
                
                const titleEvent = basicWeekJSON.events[i].dayEvents[e].title
                
                let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2] , hoursSplit[0], hoursSplit[1], hoursSplit[2]);
                let weekContent = document.getElementById("days-of-week");
                let cont = 1;
                let day = 1; //El dia de la semana L a D |
                let horas = 0; //La hora del evento |
                let tmpEventDayWeek = fechaEvento.getDay(); // Trae el dia de la semana del json
                let tmpHourDayWeek = fechaEvento.getHours(); // Trae la hora del json
                
                /* if (horas == tmpHourDayWeek && tmpEventDayWeek == day) {
                } */

                for (let w = 1; w < 169; w++) {
                    if(horas === tmpHourDayWeek && tmpEventDayWeek === day){
                        eventWekk[w].innerHTML += 
                            `<button id="event-Modal" class="btn-item" onclick="handleBtn()"><span class="sp-hour"> ${hoursJSON} </span> - <span class="sp-title"> ${titleEvent} </span></button>`;
                    }
            
                    if(w % 7 == 0){
                        horas++;
                        day = 0;
                    }
                    day++;
                    cont++;
                }
            }
        }
    }
}