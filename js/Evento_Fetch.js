import { getTotalDays, startDay, startDayYear, fecha, currentDayName, currentWeek, currentMonth, currentYear} from "./calendar.js";

export function handlerBtn() {
    const eventModal = document.getElementById('event-Modal');
    ModalEventWeek(eventModal)
}

export function handlerBtnMobile() {
    alert("Evento Fetch con datos del json desde el celular");
}

//modal en construccion
function ModalEventWeek(element) {
    let newDiv = document.createElement('div');

    newDiv.classList.add('modal');
    newDiv.id = 'modal-id';

    newDiv.innerHTML = 
    `<div class="modal-close-content" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">
        <input type='text' id='titleEvent' placeholder="Añade un titulo"></input>

        <textarea id='descriptionEvent' placeholder="Añade una descripcion"></textarea>

        <div class="inputs-content">
            <label for="dateInput" class="labels-modal">Fecha de inicio</label>
            <input type='date' id='dateInput'></input>
        </div>

        <div class="inputs-content">
            <label for="timeInput" class="labels-modal">Hora de inicio</label>
            <input type='time' id='timeInput'></input>
        </div>

        <div class="modal-submit-content">
            <button class="buttonModa" id='buttonModalID'>Aceptar</button>
        </div>
    </div>`;

    element.appendChild(newDiv);
}