import { getTotalDays, startDay, startDayYear, fecha, currentDayName, currentWeek, currentMonth, currentYear} from "./calendar.js";

/*----------------------------------------------------------*/
/*-- Este Modal muestra los detalles del evento clickeado --*/
/*----------------------------------------------------------*/

export function handlerBtn() {
    const $eventModal = document.getElementById('event-Modal');
    ModalEventWeek($eventModal)
}

export function handlerBtnMobile() {
    alert("Evento Fetch con datos del json desde el celular");
}

//modal en construccion
async function ModalEventWeek(element) {
    const $newDiv = document.createElement('div');

    $newDiv.classList.add('modal');
    $newDiv.id = 'modal-id';

    //const basicStruc = await fetch("https://mangostar1.github.io/Calendar/basicStructure.json");// <-- For production
    const dateEvent = await fetch("http://localhost:3000/events");// <-- For development
    const dateEventJson = await dateEvent.json();

     //Dates yy - mm - dd for new Date()
    const datesJSON = dateEventJson[0].dayEvents[0].dateStartEvent;
    const datesSplit = datesJSON.split("-");

    //Hours hour:minutes:secons for new Date()
    const hoursJSON = dateEventJson[0].dayEvents[0].hourStart;
    const hoursSplit = hoursJSON.split(":");

    const titleEvent = dateEventJson[0].dayEvents[0].title;

    const descriptionEvent = dateEventJson[0].dayEvents[0].description;

    let fechaEvento = new Date(datesSplit[0], datesSplit[1] - 1, datesSplit[2] , hoursSplit[0], hoursSplit[1], hoursSplit[2]);

    $newDiv.innerHTML = 
    `<div class="modal-close-content" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">
        <h2 class="color-text">${titleEvent}</h2>

        <p class="color-text">${descriptionEvent}</p>

        <div class="inputs-content">
            <p class="color-text">el ${fechaEvento.toLocaleDateString()}</p>
        </div>

        <div class="inputs-content">
        <p class="color-text">${fechaEvento.toLocaleTimeString()} hrs</p>
        </div>
    </div>`;

    element.appendChild($newDiv);
}