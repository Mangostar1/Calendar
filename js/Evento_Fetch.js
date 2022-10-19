import { getTotalDays, startDay, startDayYear, currentDate, currentDayName, currentWeek, currentMonth, currentYear} from "./calendar.js";

/*----------------------------------------------------------*/
/*-- Este Modal muestra los detalles del evento clickeado --*/
/*----------------------------------------------------------*/

export function handlerBtn(button) {
    const $eventModal = document.getElementById('event-Modal');
    ModalEventWeek($eventModal, button)
}

export function handlerBtnMobile() {
    alert("Evento Fetch con datos del json desde el celular");
}

//modal en construccion
function ModalEventWeek(element, button) {
    const btnItem = document.getElementById('event-Modal');
    //const btnItem = document.querySelectorAll('.btn-item');
    //console.log(btnItem.length);

    const $newDiv = document.createElement('div');
    
    $newDiv.classList.add('modal');
    $newDiv.id = 'modal-id';

    $newDiv.innerHTML = 
    `<div class="modal-close-content" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">
        <h2 class="color-text">${button.dataset.title}</h2>

        <p class="color-text">Descripcion</p>

        <div class="inputs-content">
            <p class="color-text">Desde: ${button.dataset.hourFinish}</p>
        </div>

        <div class="inputs-content">
        <p class="color-text">Hasta las: ${button.dataset.hourStart} hrs</p>
        </div>
    </div>`;

    element.appendChild($newDiv);
}