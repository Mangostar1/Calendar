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
            <p class="day-week">Lun</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Mar</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Mié</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Jue</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Vie</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Sáb</p>
            <p class="day-week daysNumber"></p>
        </div>

        <div class="grid-days">
            <p class="day-week">Dom</p>
            <p class="day-week daysNumber"></p>
        </div>
    </div>
    <div class="content-loader">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>`;

    element.appendChild($WeekContent);
}

export function hourWeekComponent(currentDate, getDay) {

    const $weekContent = document.getElementById("days-of-week");
    const $weekDays = document.getElementsByClassName("daysNumber");
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
        const days = [
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        ];
    
        for (let j = 0; j < 7; j++) {
            switch (getDay) {
                case 1://<-- Monday
                addDays(days[j], j);
                break;
            case 2://<-- Tuesday
                addDays(days[j], j - 1);
                break;
            case 3://<-- Wednesday
                addDays(days[j], j - 2);
                break;
            case 4://<-- Thursday
                addDays(days[j], j - 3);
                break;
            case 5://<-- Friday
                addDays(days[j], j - 4);
                break;
            case 6://<-- Saturday
                addDays(days[j], j - 5);
                break;
            case 0://<-- Sunday
                addDays(days[j], j - 6);
                break;
            }
            $weekDays[j].innerHTML = days[j].getDate();
        }
    }
    eventsWeek()

    /*--Hours--*/
    setTimeout(() => {
        let semanal = document.querySelectorAll('.semanal');

        function pushHoursWeek(hora) {
            return `<p class="hours-in-Week">${hora}</p>`
        }
        

        for (let h = 0; h < 168; h++) {
            semanal[h].innerHTML += pushHoursWeek(hourDayWeek[Math.floor(h / 7)]);
        }
    }, 1);
}

/*-------------*/
/*-API Events-*/
/*-------------*/
function IsLoaded() {
    document.querySelector(".content-loader").style.display="none";
}

//Events Week
async function eventsWeek() {
    try {
        //const basicWeek = await fetch("http://localhost:5500/basicStructure.json");
        const basicWeek = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");
        const basicWeekJSON = await basicWeek.json();
    
        const eventWekk = document.querySelectorAll(".eventWeek");
        if (basicWeekJSON.events.length !== 0) {
            for (let e = 0; e < basicWeekJSON.events.length; e++) {
                
                //Dates yy - mm - dd for new Date()
                const datesJSON = basicWeekJSON.events[e].dateStartEvent;
                const datesSplit = datesJSON.split("-");

                const datesFinishJSON = basicWeekJSON.events[e].dateFinishEvent;
                const datesFinishSplit = datesFinishJSON.split("-");
            
                //Hours hour:minutes:secons for new Date()
                const hoursJSON = basicWeekJSON.events[e].hourStart;
                const hoursSplit = hoursJSON.split(":");

                const hoursFinishJSON = basicWeekJSON.events[e].hourFinish;
                const hoursFinishSplit = hoursJSON.split(":");
                
                const titleEvent = basicWeekJSON.events[e].title
                let descriptcionEvent = basicWeekJSON.events[e].description;
                
                let dateWeekStart = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2], hoursSplit[0], hoursSplit[1], hoursSplit[2]);
                let dateWeekFinish = new Date(datesFinishSplit[0], datesFinishSplit[1] - 1, datesFinishSplit[2], hoursFinishSplit[0], hoursFinishSplit[1], hoursFinishSplit[2]);

                let numWeekEventStart = dateWeekStart.getWeekNumber();
                let numOfCurrentWeek = currentDate.getWeekNumber();
                let numWeekEventFinish = dateWeekFinish.getWeekNumber();
                let day = 1; //El dia de la semana L a D | parte en 1 para que corresponda con el lunes del objeto Date()
                let horas = 0; //La hora del evento | Actual en el calendario
                
                let $btns = 
                    `<button style="background-color: ${basicWeekJSON.events[e].typeInformation.colorBackgroundType};" id="event-Modal" class="btn-item" data-date-start=${datesJSON} data-date-finish=${datesFinishJSON} data-hour-start="${hoursJSON}" data-hour-finish="${hoursFinishJSON}" data-title="${titleEvent}" data-description="${descriptcionEvent}">
                        <span class="sp-title"> ${titleEvent} </span>
                    </button>`;
    
                for (let w = 0; w < 168; w++) {
                    if(
                        horas === dateWeekStart.getHours() 
                        && dateWeekStart.getDay() === day % 7 
                        && dateWeekStart.getMonth() === currentDate.getMonth() 
                        && dateWeekStart.getFullYear() === currentDate.getFullYear() 
                        && numWeekEventStart === numOfCurrentWeek){
                            
                            eventWekk[w].innerHTML += $btns;
                        
                    }

                    if (
                        dateWeekStart.getDate() < dateWeekFinish.getDate()) {
                            console.log(day % 7, dateWeekFinish.toLocaleDateString())
                            if (
                                dateWeekFinish.getDay() === day % 7 
                                && horas === dateWeekFinish.getHours()
                                && dateWeekFinish.getMonth() === currentDate.getMonth()
                                && numWeekEventFinish === numOfCurrentWeek) {
                                    
                                    console.log(w);
                                    eventWekk[w].innerHTML += $btns;

                            }
                    }

                    
                    /*Si este if valida la condiicon, se suma una hora en el dia y se reinicia el "day" a 0 para que 
                    este corresponda el comienzo de la semana pero en una hora diferente */
                    if ((w + 1) % 7 == 0) {
                        horas++;
                        day = 0;//<-- Se establece en 0. Al salir del "if" este volvera a valer 1 como en su declaracion inicial en la linea 193
                    }
                    day++;
                }
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        IsLoaded();
    }
}

/* 

Este calendario semanal imprime unos 168 "<div class="semanal">" en el DOM y estos provienen de la funcion 
"hourWeekComponent()". Se imprimen 168 porque esa es la cantidad de "<div>" necesarios para representar 
el formato 24/7 de un calendario semanal, porque en este se muestran los 7 dias de la semana y cada dia tiene sus 
respectivas 24 horas.

La forma en la que se incertan eventos al interior de este calendario es a traves de la funcion eventsWeek() 
el cual recorrorre el calendario desde el 0 hasta el 167, cada 7 iteraciones se le suma +1 a la variable "hora" 
para asi poder tener acceso a la siguiente hora en el calendario.

*/