let test = document.getElementById('test-calendar');
let DateTest = new Date().getDate();

let fecha = new Date();//esta no se importa ni declara aca, sino que en calendar

let currentDayName = fecha.getDay();
let currentWeek = fecha.getDate();
let currentMonth = fecha.getMonth();
let currentYear = fecha.getFullYear();


MonthComponent(test);
DaysOfMonth(1);

function isLeap() {//se importa desde calendar
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

    function getTotalDays(month) {//se importa desde calendar
    if (month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {
        return isLeap() ? 29 : 28;
    }
}

function MonthComponent(element) {
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

function DaysOfMonth(month) {
      //corregir el dia en que comienza el mes
    function startDay() {
        let start = new Date(currentYear, currentMonth, 1);
        return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
    }
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
        async function eventoMonth() {
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
                    eventMonth.innerHTML = `<button class="btn-item" id="btn-event-${i}"><span class="sp-hour"> ${horaInicialAA} - ${horafinalAA} </span> <br> <span class="sp-title"> ${tituloEventoAA} </span></button>`;
                } else {
                    eventMonth.innerHTML = `<li class="event"></li>`;
                }
            }
    }
    eventoMonth();
}