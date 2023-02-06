import { currentDate, addDays, lessDays} from "./calendar.js";

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
    </div>
    <div class="content-loader">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>`;

    element.appendChild($WeekContent);
}

export function hourWeekComponent(currentDate, getDay) {

    const $weekContent = document.getElementById("days-of-week");
    const $weekDays = document.getElementsByClassName("diasNumber");
    const hourDayWeek = [
        "00:00 hrs", 
        "01:00 hrs",
        "02:00 hrs", 
        "03:00 hrs", 
        "04:00 hrs", 
        "05:00 hrs", 
        "06:00 hrs", 
        "07:00 hrs", 
        "08:00 hrs", 
        "09:00 hrs", 
        "10:00 hrs", 
        "11:00 hrs", 
        "12:00 hrs", 
        "13:00 hrs", 
        "14:00 hrs", 
        "15:00 hrs", 
        "16:00 hrs", 
        "17:00 hrs", 
        "18:00 hrs", 
        "19:00 hrs", 
        "20:00 hrs", 
        "21:00 hrs", 
        "22:00 hrs", 
        "23:00 hrs"
    ];

    for (let w = 0; w < 168; w++) {
        $weekContent.innerHTML += 
            `<div class="semanal">
                <ul>
                    <li class="event eventWeek"></li>
                </ul>
            </div>`;
    }
        
    
    for (var i = 0; i < 7; i++) {
        if (getDay === 1) {// <-- Lunes
            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            $weekDays[0].innerHTML = mo.getDate();

            addDays(tu, 1);
            $weekDays[1].innerHTML = tu.getDate();

            addDays(we, 2);
            $weekDays[2].innerHTML = we.getDate();

            addDays(th, 3);
            $weekDays[3].innerHTML = th.getDate();

            addDays(fr, 4);
            $weekDays[4].innerHTML = fr.getDate();

            addDays(sa, 5);
            $weekDays[5].innerHTML = sa.getDate();

            addDays(su, 6);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 2) {// <-- Martes
            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            
            lessDays(mo, 1);
            $weekDays[0].innerHTML = mo.getDate();

            $weekDays[1].innerHTML = tu.getDate();

            addDays(we, 1);
            $weekDays[2].innerHTML = we.getDate();

            addDays(th, 2);
            $weekDays[3].innerHTML = th.getDate();

            addDays(fr, 3);
            $weekDays[4].innerHTML = fr.getDate();

            addDays(sa, 4);
            $weekDays[5].innerHTML = sa.getDate();

            addDays(su, 5);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 3) {// <-- Miercoles
            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            lessDays(mo, 2);
            $weekDays[0].innerHTML = mo.getDate();

            lessDays(tu, 1);
            $weekDays[1].innerHTML = tu.getDate();

            $weekDays[2].innerHTML = we.getDate();

            addDays(th, 1);
            $weekDays[3].innerHTML = th.getDate();

            addDays(fr, 2);
            $weekDays[4].innerHTML = fr.getDate();

            addDays(sa, 3);
            $weekDays[5].innerHTML = sa.getDate();

            addDays(su, 4);
            $weekDays[6].innerHTML = su.getDate();
        }
        if (getDay === 4) {// <-- Jueves
            let mo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let tu = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let we = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let th = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let fr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let sa = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            let su = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            lessDays(mo, 3);
            $weekDays[0].innerHTML = mo.getDate();

            lessDays(tu, 2);
            $weekDays[1].innerHTML = tu.getDate();

            lessDays(we, 1);
            $weekDays[2].innerHTML = we.getDate();

            $weekDays[3].innerHTML = th.getDate();

            addDays(fr, 1);
            $weekDays[4].innerHTML = fr.getDate();

            addDays(sa, 2);
            $weekDays[5].innerHTML = sa.getDate();

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

    /*-Horas-*/
    setTimeout(() => {
        let semanal = document.querySelectorAll('.semanal');

        function pushHoursWeek(hora) {
            return `<p class="hours-in-Week">${hora}</p>`
        }
        
        for (let h = 0; h < 7; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[0]);
        }
        for (let h = 7; h < 14; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[1]);
        }
        for (let h = 14; h < 21; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[2]);
        }
        for (let h = 21; h < 28; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[3]);
        }
        for (let h = 28; h < 35; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[4]);
        }
        for (let h = 35; h < 42; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[5]);
        }
        for (let h = 42; h < 49; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[6]);
        }
        for (let h = 49; h < 56; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[7]);
        }
        for (let h = 56; h < 63; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[8]);
        }
        for (let h = 63; h < 70; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[9]);
        }
        for (let h = 70; h < 77; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[10]);
        }
        for (let h = 77; h < 84; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[11]);
        }
        for (let h = 84; h < 91; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[12]);
        }
        for (let h = 91; h < 98; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[13]);
        }
        for (let h = 98; h < 105; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[14]);
        }
        for (let h = 105; h < 112; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[15]);
        }
        for (let h = 112; h < 119; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[16]);
        }
        for (let h = 119; h < 126; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[17]);
        }
        for (let h = 126; h < 133; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[18]);
        }
        for (let h = 133; h < 140; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[19]);
        }
        for (let h = 140; h < 147; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[20]);
        }
        for (let h = 147; h < 154; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[21]);
        }
        for (let h = 154; h < 161; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[22]);
        }
        for (let h = 161; h < 168; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[23]);
        }
    }, 1);
}

/*-------------*/
/*-Eventos API-*/
/*-------------*/
function IsLoaded() {
    document.querySelector(".content-loader").style.display="none";
}

//Events Week
async function eventsWeek() {
    try {
        const basicWeek = await fetch("http://localhost:3000/events");
        const basicWeekJSON = await basicWeek.json();
    
        const eventWekk = document.getElementsByClassName("eventWeek");
        /* console.log(eventWekk); */
        if (basicWeekJSON.length !== 0) {
            for (let e = 0; e < basicWeekJSON.length; e++) {
                
                //Dates yy - mm - dd for new Date()
                const datesJSON = basicWeekJSON[e].dateStartEvent;
                const datesSplit = datesJSON.split("-");
            
                //Hours hour:minutes:secons for new Date()
                const hoursJSON = basicWeekJSON[e].hourStart;
                const hoursFinishJSON = basicWeekJSON[e].hourFinish;
                const hoursSplit = hoursJSON.split(":");
                
                const titleEvent = basicWeekJSON[e].title
                let descriptcionEvent = basicWeekJSON[e].description;
                
                let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2] , hoursSplit[0], hoursSplit[1], hoursSplit[2]);
                let numWeekEvent = fechaEvento.getWeekNumber();
                let numOfCurrentWeek = currentDate.getWeekNumber();
                let cont = 1;
                let day = 1; //El dia de la semana L a D | Actual en el calendario 1
                let horas = 0; //La hora del evento | Actual en el calendario
                let tmpEventDayWeek = fechaEvento.getDay(); // Trae el dia de la semana del json
                let tmpHourDayWeek = fechaEvento.getHours(); // Trae la hora del json
                
                let $btns = 
                    `<button id="event-Modal" class="btn-item" data-hour-start="${hoursJSON}" data-hour-finish="${hoursFinishJSON}" data-title="${titleEvent}" data-description="${descriptcionEvent}">
                        <span class="sp-title"> ${titleEvent} </span>
                    </button>`;
    
                for (let w = 0; w < 168; w++) {//<-- 1 | 169 || 0 | 168
                    if(horas === fechaEvento.getHours() && fechaEvento.getDay() === day && fechaEvento.getMonth() === currentDate.getMonth() && fechaEvento.getFullYear() === currentDate.getFullYear() && numWeekEvent === numOfCurrentWeek){
                        eventWekk[w].innerHTML += $btns;
                        console.log(w, 'tercero');
                        IsLoaded();
                    } else {
                        IsLoaded();
                    }
            
                    if(w === 6 || w === 13 || w === 20 || w === 27 || w === 34 || w === 41 || w === 48 || w === 55 || w === 62 || w === 69 || w === 76 || w === 83 || w === 90 || w === 97 || w === 104 || w === 111 || w === 118 || w === 125 || w === 132 || w === 139 || w === 146 || w === 153 || w === 160 || w === 167){
                        horas++;
                        day = 0;
                        /* console.log(w, 'primero') */
                    }
                    day++;
                    cont++;
                    /* console.log(w, 'segundo') */
                    
                    /* if(w % 7 == 0){
                        horas++;
                        day = 0;
                    }
                    day++;
                    cont++; */

                    /* console.log('dia ->', day, 'horas ->', horas) */
                }
            }
        }
    } catch (err) {
        console.error(err);
        IsLoaded();
    }
}