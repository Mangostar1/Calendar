import { currentDate } from "../../index.js";
import languageHandler from "../../i18n/en-es.js";
import { MonthComponent, DaysOfMonth } from "../Month/MonthComponent.js";
import URL from "../../helpers/UrlToFetch.js";
//This modal event has the function of entering an event into a database

export async function NewModalEvent(element) {

  let year = parseInt(element.dataset.year);
  let month = parseInt(element.dataset.month);
  let day = parseInt(element.dataset.day);
  let hourElement;
  let newDate;

  if (element.dataset.hourComplete || element.dataset.hour) {
    hourElement = element.dataset.hourComplete || element.dataset.hour;
    let [hourStr, minuteStr] = hourElement.split(':');

    let hour = parseInt(hourStr, 10);
    let minute = parseInt(minuteStr, 10);

    newDate = new Date(year, month, day, hour, minute);
  } else {
    newDate = new Date(year, month, day);
  }

  
  //Gets the dates and times of the scheduling form
  let yearFormatted = newDate.getFullYear().toString().padStart(4, '0');
  let monthFormatted = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are indexed from 0
  let dayFormatted= newDate.getDate().toString().padStart(2, '0');
  let hourFormatted = newDate.getHours().toString().padStart(2, '0');
  let minuteFormatted = newDate.getMinutes().toString().padStart(2, '0');
  // Formatear la cadena
  let formattedDate = `${yearFormatted}-${monthFormatted}-${dayFormatted}T${hourFormatted}:${minuteFormatted}`;

  const $newDiv = document.createElement("div");

  $newDiv.classList.add("modal-add-event-calendar");
  $newDiv.id = "modal-id";

  $newDiv.innerHTML = `
    <div class="modal-close-content" id="closeModalID">
        <button class="btn-close-modal" id="btn-close-modal-ID">
            <img src="./src/assets/icons/close-svgrepo-com.svg" class="closeModal" id="closeModal-ID">
        </button>
        <h4 class="text-white" style="text-align: left; padding-left: 1rem; color: #fff;">Agregar Evento</h4>
    </div>
    <form class="modal-content-info" id="enviarActividad">

      
      <div class="form-group row">
        <label for="dateInput" class="col-sm-3 col-form-label">Fecha de inicio</label>
        <div class="col-sm-9">
          <input type='datetime-local' class="form-control date-input-add-event" id="dateInput" name="dateInput" value="${`${formattedDate}`}">
        </div>
      </div>

      <div class="form-group row">
        <label for="dateInputEnd" class="col-sm-3 col-form-label">Fecha de termino</label>
        <div class="col-sm-9">
          <input type='datetime-local' class="form-control date-input-add-event" id="dateInputEnd" name="dateInputEnd" value="${`${formattedDate}`}">
        </div>
      </div>

      <div class="form-group row">
        <label for="titleEvent" class="col-sm-3 col-form-label">Titulo</label>
        <div class="col-sm-9">
          <input type='text' class="form-control text-input-add-event" id='titleEvent' name="titleEvent" placeholder="Añade un titulo">
        </div>
      </div>

      <div class="form-group row">
        <label for="descriptionEvent" class="col-sm-3 col-form-label">Comentario</label>
        <div class="col-sm-9">
          <textarea id='descriptionEvent' name="descriptionEvent" class="form-control text-input-add-event" placeholder="Añade un comentario" ></textarea>
        </div>
      </div>

      <div class="modal-submit-content">
          <button class="buttonModa" id='buttonModalID'>Aceptar</button>
      </div>
    </form>
  `;

  element.appendChild($newDiv);
}

export function closeModal() {
  const $elements = document.getElementsByClassName("modal-add-event-calendar");
  while ($elements.length > 0) {
    $elements[0].parentNode.removeChild($elements[0]);
  }
}

/*------------*/
/* Fetch data */
/*------------*/

document.addEventListener("click", async (e) => {
  if (e.target.matches("#buttonModalID") === true) {
    e.preventDefault();

    let send = false;

    const $title = document.getElementById("titleEvent").value;
    const $description = document.getElementById("descriptionEvent").value;
    const $date = document.getElementById("dateInput").value;
    const $dateFinish = document.getElementById("dateInputEnd").value;

    const timeDateStart = $date.split("T")[1];
    const timeDateFinish = $dateFinish.split("T")[1];

    
    if ($date < $dateFinish) {//<-- Prevents the user from scheduling an event with an end date less than the start date when scheduling the event
      send = true;
    } else {
      send = false;
    }

    if (send) {
      
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "dateStartEvent": $date,
          "hourStart": timeDateStart,
          "dateFinishEvent": $dateFinish,
          "hourFinish": timeDateFinish,
          "title": $title,
          "description": $description,
          "statusInformation": {
            "statusCode": 1,
            "status": "activo",
            "colorStatus": "green"
          },
          "typeInformation": {
            "type": 1,
            "colorBackgroundType": "#0096a6",
            "colorType": "white"
          }
          // userId: userId,
          // sendCreateActivity: true
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(response => {
        console.log('Respuesta exitosa:', response);
        Swal.fire({
          title: "Listo",
          text: "El evento fue ingresado con éxito",
          icon: "success"
        }).then(function(){
            document.getElementsByClassName("calendar-container")[0].lastChild.remove();
            MonthComponent(document.getElementsByClassName("calendar-container")[0]);
            DaysOfMonth(currentDate.getMonth(), currentDate);
            document.getElementById("dates-control-month").style = "display: flex";
            document.getElementById("date-month").innerHTML =
              languageHandler.es.monthNames[currentDate.getMonth()] +
              ` ` +
              currentDate.getFullYear();
        });
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          title: "Error",
          text: "Problemas al crear un agendamiento: " + error,
          icon: "error"
        });
      });

    } else {
      Swal.fire({
        title: "Error",
        text: "La fecha y hora de inicio debe ser menor a la fecha de término",
        icon: "error"
      });
    }


  }
});

//extra code for stylesheet
let btnMobile = document.querySelector(".new-event");

/* setInterval(() => {
    if(window.innerWidth < 768){
        btnMobile.style.cssText = 'position: absolute; bottom: 2rem; right: 1rem;';
    }
}, 1000); */
