export function WeekComponent(element) {
    let WeekContent = document.createElement('div');
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

export function hourWeekComponent(getDay) {
    let containerWeek = document.getElementById("container-week");
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

    let cont = 1;
    let day = 1;
    let horas = 0;
    let tmpEventDayWeek = 3; // dynamic
    let tmpHourDayWeek = 4; ; // dynamic

    for (let w = 1; w < 169; w++) {

        if(horas == tmpHourDayWeek && tmpEventDayWeek == day){
            weekContent.innerHTML += 
                `<div class="semanal">
                    <ul>
                        <li class="event eventWeek"> Hora ${horas} Day ${day}</li>
                    </ul>
                </div>`;
        }else{
            weekContent.innerHTML += 
                `<div class="semanal">
                    <ul>
                        <li class="event eventWeek"></li>
                    </ul>
                </div>`;
        }

        if(w % 7 == 0){
            horas++;
            day = 0;
        }
        day++;
        cont++;
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

    for (var i = 0; i < 7; i++) {//Corregir este for o pasar por testeo
        if (getDay === 1) {
            weekDays[i].innerHTML = currentWeek + countStartMon++;
        } else if (getDay === 2) {
            let d = new Date();
            d.setDate(currentWeek + countStartTue++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 3) {
            let d = new Date();
            d.setDate(currentWeek + countStartWed++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 4) {
            let d = new Date();
            d.setDate(currentWeek + countStartThr++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 5) {
            let d = new Date();
            d.setDate(currentWeek + countStartFre++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 6) {
            let d = new Date();
            d.setDate(currentWeek + countStartSat++);
            weekDays[i].innerHTML = d.getDate();
        } else if (getDay === 0) {
            let d = new Date();
            d.setDate(currentWeek + countStartSun++);
            weekDays[i].innerHTML = d.getDate();
        }
    }
}