/*----------------------------------------------------------*/
/*-- Este Modal muestra los detalles del evento clickeado --*/
/*----------------------------------------------------------*/

export function handlerBtn(button) {
  const $eventModal = document.getElementById("event-Modal");
  ModalEventWeek($eventModal, button);
}

export function handlerBtnMobile() {
  alert("Evento Fetch con datos del json desde el celular");
}

//modal en construccion
function ModalEventWeek(element, button) {

  let btn = `<div class="modal-details-content-info">
                  <button id="confirm-button" data-schedule="${button.dataset.schedule}" data-email-address="${button.dataset.emailAddress}">Confirmar Hora</button>
              </div>`;
  
  const $newDiv = document.createElement("div");

  const ELEMENT_DAY = document.getElementById("container-Day-Hours");//<-- Day component
  const ELEMENT_WEEK = document.getElementById("container-week");//<-- Week component
  const ELEMENT_MONTH = document.getElementById("days-of-month");//<-- Month component

  $newDiv.classList.add("modal-add-event-calendar", "modal-view-event-calendar");
  $newDiv.id = "modal-id";

  $newDiv.innerHTML = `
    <div class="modal-close-content" style="background-color: ${button.dataset.colorEvent};" id="closeModalID">
        <p class="new-tittle-location">${button.dataset.title}</p>
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="../calendar/assets/icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
    </div>
    <div class="modal-content-info">

        <h2 class="color-text modal-tittle">${button.dataset.title}</h2>

        <div id="modal-details-first-content">
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Fecha: </p>
            <p id="" class="color-text text-detail">${button.dataset.dateStart}</p>
          </div>
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Hora: </p>
            <p id="" class="color-text text-detail">${button.dataset.hourStart}</p>
          </div>

          <div class="modal-details-content-info">
            <div class="status-color-box" style="background-color: ${button.dataset.statuscolor};"></div>
            <p id="" class="color-text text-detail">${button.dataset.statusText}</p>
          </div>
        </div>

        <div id="modal-details-second-content">
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Paciente: </p>
            <p id="" class="color-text text-detail">${button.dataset.creator}</p>
          </div>
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Telefono: </p>
            <p id="" class="color-text text-detail">${button.dataset.phoneNumber}</p>
          </div>
          <div class="modal-details-content-info">
            <p id="" class="color-text text-bold">Email: </p>
            <p id="" class="color-text text-detail">${button.dataset.emailAddress}</p>
          </div>

          ${button.dataset.statuscolor === "#f27474" ? btn : ""}

          
        </div>
    </div>`;

  /* element.appendChild($newDiv); */
  if (ELEMENT_DAY) {
    ELEMENT_DAY.appendChild($newDiv);
  } else if (ELEMENT_WEEK) {
    ELEMENT_WEEK.appendChild($newDiv);
  } else if (ELEMENT_MONTH) {
    ELEMENT_MONTH.appendChild($newDiv);
  }

  if (button.dataset.statuscolor === "#f27474") {
    // Obtener el botón
    let confirmButton = document.getElementById("confirm-button");
  
    if (confirmButton) {

      const configmScheduleObj = {
        scheduleId: confirmButton.dataset.schedule,
        patientEmail: confirmButton.dataset.emailAddress,
        configmSchedule: true
      }
      
  
      confirmButton.addEventListener("click", () => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede deshacer.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, continuar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            const URL = `../../src/app/services/calendarService.php?configmSchedule=true`;
          
            $.ajax({
              type: "POST",
              url: URL,
              data: configmScheduleObj,
              success: function(response) {
          
                if (response.success) {
                  Swal.fire({
                    title: "¡Solicitud procesada!",
                    text: "La solicitud de cita ha sido actualizada correctamente.",
                    icon: "success"
                  }).then(() => {
                    window.location.reload(); // Recargar la página tras la confirmación
                  });
                } else {
                  Swal.fire({
                    title: "Error",
                    text: response.error || "Hubo un problema al actualizar la cita. Inténtalo de nuevo.",
                    icon: "error"
                  });
                }
              },
              error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
                Swal.fire({
                  title: "Error",
                  text: "No se pudo conectar con el servidor.",
                  icon: "error"
                });
              }
            });
          }          
        });
      }, { once: true }); // <- Evita agregar múltiples event listeners
    } else {
      console.error("No se encontró el botón con id 'confirm-button'.");
    }
  }
  
}

/* OLD CONTENT */

{/* <div class="modal-details-content-info">
  <p id="" class="color-text text-bold">Comentarios: </p>
  <p id="" class="color-text text-detail">${button.dataset.description}</p>
</div>

<p id="" class="color-text text-detail">${button.dataset.dateStart} - ${button.dataset.dateFinish}</p>
<p id="" class="color-text text-detail">${button.dataset.hourStart} - ${button.dataset.hourFinish}</p> */}