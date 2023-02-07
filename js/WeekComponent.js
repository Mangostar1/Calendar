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
        const basicWeek = await fetch("http://localhost:3000/events");
        const basicWeekJSON = await basicWeek.json();
    
        const eventWekk = document.querySelectorAll(".eventWeek");
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
                    }
            
                    if(w === 6 || w === 13 || w === 20 || w === 27 || w === 34 || w === 41 || w === 48 || w === 55 || w === 62 || w === 69 || w === 76 || w === 83 || w === 90 || w === 97 || w === 104 || w === 111 || w === 118 || w === 125 || w === 132 || w === 139 || w === 146 || w === 153 || w === 160 || w === 167){
                        horas++;
                        day = 0;
                    }
                    day++;
                    cont++;
                }
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        IsLoaded();
    }
}