/*-------------------------------------------------------*/
/*-- This Modal shows the details of the clicked event --*/
/*-------------------------------------------------------*/

export function handlerBtn(button) {
  const $eventModal = document.getElementById("event-Modal");
  ModalEventWeek($eventModal, button);
}

export function handlerBtnMobile() {
  alert("Evento Fetch con datos del json desde el celular");
}


function ModalEventWeek(element, button) {
  const $newDiv = document.createElement("div");

  $newDiv.classList.add("modal-add-event-calendar", "modal-view-event-calendar");
  $newDiv.id = "modal-id";

  $newDiv.innerHTML = `
    <div class="modal-close-content" style="background-color: ${button.dataset.colorEvent};" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./src/assets/icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">
        <h2 class="color-text modal-tittle">${button.dataset.title}</h2>

        <div id="modal-details-first-content">
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Fecha: </p>
            <p id="" class="color-text text-detail">${button.dataset.dateStart} - ${button.dataset.dateFinish}</p>
          </div>
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Hora: </p>
            <p id="" class="color-text text-detail">${button.dataset.hourStart} - ${button.dataset.hourFinish}</p>
          </div>
        </div>

        <div id="modal-details-second-content">
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Creador: </p>
            <p id="" class="color-text text-detail">${button.dataset.creator}</p>
          </div>
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Comentarios: </p>
            <p id="" class="color-text text-detail">${button.dataset.description}</p>
          </div>
        </div>
    </div>`;

  element.appendChild($newDiv);
}
