export function YearComponent(element) {
    let yearContent = document.createElement('div');
    yearContent.classList.add('year-content');
    yearContent.id = "container-Year";
    yearContent.innerHTML = 
        `<div id="dates-control-year" class="dates-control">
            <button id="prev-year" class="prev">&#10094;</button>
            <h1 id="fecha-year" class="fecha">Diciembre de 2021</h1>
            <button id="next-year" class="next">&#10095;</button>
        </div>
        <div id="days-of-year">
            <div class="meses">
                <h2 class="tittle">Enero</h2>
                <div class="calendar">
                    <div id="day-name-ene" class="day-name-div"></div>
                    <div id="day-div-ene" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Febrero</h2>
                <div class="calendar">
                    <div id="day-name-feb" class="day-name-div"></div>
                    <div id="day-div-feb" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Marzo</h2>
                <div class="calendar">
                    <div id="day-name-mar" class="day-name-div"></div>
                    <div id="day-div-mar" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Abril</h2>
                <div class="calendar">
                    <div id="day-name-abr" class="day-name-div"></div>
                    <div id="day-div-abr" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Mayo</h2>
                <div class="calendar">
                    <div id="day-name-may" class="day-name-div"></div>
                    <div id="day-div-may" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Junio</h2>
                <div class="calendar">
                    <div id="day-name-jun" class="day-name-div"></div>
                    <div id="day-div-jun" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Julio</h2>
                <div class="calendar">
                    <div id="day-name-jul" class="day-name-div"></div>
                    <div id="day-div-jul" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Agosto</h2>
                <div class="calendar">
                    <div id="day-name-ago" class="day-name-div"></div>
                    <div id="day-div-ago" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Septiembre</h2>
                <div class="calendar">
                    <div id="day-name-sep" class="day-name-div"></div>
                    <div id="day-div-sep" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Octubre</h2>
                <div class="calendar">
                    <div id="day-name-oct" class="day-name-div"></div>
                    <div id="day-div-oct" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Noviembre</h2>
                <div class="calendar">
                    <div id="day-name-nov" class="day-name-div"></div>
                    <div id="day-div-nov" class="day-div"></div>
                </div>
            </div>

            <div class="meses">
                <h2 class="tittle">Diciembre</h2>
                <div class="calendar">
                    <div id="day-name-dic" class="day-name-div"></div>
                    <div id="day-div-dic" class="day-div"></div>
                </div>
            </div>
        </div>`;

    element.appendChild(yearContent);
}