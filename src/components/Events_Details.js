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
    
    const $newDiv = document.createElement('div');
    
    $newDiv.classList.add('modal');
    $newDiv.id = 'modal-id';

    $newDiv.innerHTML = 
    `<div class="modal-close-content" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./src/assets/icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">
        <h2 class="color-text modal-tittle">${button.dataset.title}</h2>

        <p class="color-text modal-description">${button.dataset.description}</p>

        <h2 class="color-text">Fecha</h2>

        <div class="inputs-content">
            <p class="color-text modal-hour"><span class="text-bold">Desde:</span>  ${button.dataset.dateStart}</p>
            <p class="color-text modal-hour"><span class="text-bold">Hasta:</span>  ${button.dataset.dateFinish}</p>
        </div>

        <h2 class="color-text">Hora</h2>

        <div class="inputs-content">
            <p class="color-text modal-hour"><span class="text-bold">Desde:</span>  ${button.dataset.hourStart} hrs</p>
            <p class="color-text modal-hour"><span class="text-bold">Hasta las:</span>  ${button.dataset.hourFinish} hrs</p>
        </div>
    </div>`;

    element.appendChild($newDiv);
}