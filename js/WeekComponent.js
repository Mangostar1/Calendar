import { currentDate, currentDayName, currentWeek, currentMonth, currentYear, getTotalDays, addDays, lessDays, startDay} from "./calendar.js";

export function WeekComponent(element) {
    const $WeekContent = document.createElement('div');
    $WeekContent.classList.add('container-week');
    $WeekContent.id = "container-week";
    
    $WeekContent.innerHTML = 
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

    element.appendChild($WeekContent);
}

export function hourWeekComponent(currentDate, getDay, getDate, getMonth, getFullYear) {

    const $weekContent = document.getElementById("days-of-week");
    const $weekDays = document.getElementsByClassName("diasNumber");
    const nameMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
        $weekContent.innerHTML += 
            `<div class="semanal">
                <ul>
                    <li class="event eventWeek"></li>
                </ul>
            </div>`;
    }

    hourDayWeek.forEach((item) => {
        document.getElementById("grid-hour").innerHTML += `<div class="horas"> ${item.hour} </div>`
    });

    for (var i = 0; i < 7; i++) {
        if (getDay === 1) {// <-- Lunes

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(tu, 1);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(we, 2);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(th, 3);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(fr, 4);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(sa, 5);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 6);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 2) {// <-- Martes

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 1);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(we, 1);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(th, 2);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(fr, 3);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(sa, 4);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 5);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 3) {// <-- Miercoles

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 2);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(tu, 1);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(th, 1);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(fr, 2);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(sa, 3);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 4);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 4) {// <-- Jueves

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 3);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(tu, 2);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(we, 1);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(fr, 1);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(sa, 2);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 3);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 5) {// <-- Viernes

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 4);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(tu, 3);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(we, 2);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(th, 1);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(sa, 1);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 2);
            $weekDays[6].innerHTML = su.getDate();

        }
        if (getDay === 6) {// <-- Sabado

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 5);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(tu, 4);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(we, 3);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(th, 2);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(fr, 1);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            addDays(su, 1);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 0) {// <-- Domingo

            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(mo, 6);
            $weekDays[0].innerHTML = mo.getDate();

            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(tu, 5);
            $weekDays[1].innerHTML = tu.getDate();

            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(we, 4);
            $weekDays[2].innerHTML = we.getDate();

            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(th, 3);
            $weekDays[3].innerHTML = th.getDate();

            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(fr, 2);
            $weekDays[4].innerHTML = fr.getDate();

            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            lessDays(sa, 1);
            $weekDays[5].innerHTML = sa.getDate();

            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            $weekDays[6].innerHTML = su.getDate();
        }
    }
    eventsWeek()
}

//Events Week
async function eventsWeek() {
    const basicWeek = await fetch("http://localhost:3000/events");
    const basicWeekJSON = await basicWeek.json();

    const eventWekk = document.getElementsByClassName("eventWeek");
    if (basicWeekJSON.length !== 0) {
        for (let e = 0; e < basicWeekJSON.length; e++) {
            
            //Dates yy - mm - dd for new Date()
            const datesJSON = basicWeekJSON[e].dateStartEvent;
            const datesSplit = datesJSON.split("-");
            //console.log(basicWeekJSON[e].dateStartEvent);
        
            //Hours hour:minutes:secons for new Date()
            const hoursJSON = basicWeekJSON[e].hourStart;
            const hoursFinishJSON = basicWeekJSON[e].hourFinish;
            const hoursSplit = hoursJSON.split(":");
            
            const titleEvent = basicWeekJSON[e].title

            
            let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2] , hoursSplit[0], hoursSplit[1], hoursSplit[2]);
            let numWeekEvent = fechaEvento.getWeekNumber();
            let numOfCurrentWeek = currentDate.getWeekNumber();
            let cont = 1;
            let day = 1; //El dia de la semana L a D | Actual en el calendario 1
            let horas = 0; //La hora del evento | Actual en el calendario
            let tmpEventDayWeek = fechaEvento.getDay(); // Trae el dia de la semana del json
            let tmpHourDayWeek = fechaEvento.getHours(); // Trae la hora del json
            //console.log(fechaEvento.getDay(), 'Dia de la semana')

            for (let w = 0; w < 168; w++) {//<-- 1 | 169
                //console.log(day, 'day');
                if(horas === tmpHourDayWeek && tmpEventDayWeek === day && fechaEvento.getMonth() === currentDate.getMonth() && fechaEvento.getFullYear() === currentDate.getFullYear() && numWeekEvent === numOfCurrentWeek){
                    eventWekk[w].innerHTML += 
                        `<button id="event-Modal" class="btn-item" data-hour-start="${hoursJSON}" data-hour-finish="${hoursFinishJSON}" data-title="${titleEvent}">
                            <span class="sp-hour"> ${hoursJSON} </span> - <span class="sp-title"> ${titleEvent} </span>
                        </button>`;
                }
        
                /* if(w % 7 == 0){
                    horas++;
                    day = 0;
                } */
                if(w === 6 || w === 13 || w === 20 || w === 27 || w === 34 || w === 41 || w === 48 || w === 55 || w === 62 || w === 69 || w === 76 || w === 83 || w === 90 || w === 97 || w === 104 || w === 111 || w === 118 || w === 125 || w === 132 || w === 139 || w === 146 || w === 153 || w === 160 || w === 167){
                    horas++;
                    day = 0;
                }
                day++;
                cont++;
            }
        }
    }
}