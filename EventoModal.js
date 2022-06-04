import {wrapper} from './calendar.js';

let DaysCalendar = document.getElementsByClassName('grid-item');

export function NewModalEvent() {
    let newDiv = document.createElement('div');

    newDiv.classList.add('modal');

    newDiv.innerHTML = 
    '<div class="modal-close-content">' +
    `<img src="./icons/close-svgrepo-com.svg" class="closeModal" id="closeModal">`+
    '</div>' +

    `<input type='text' id='titleEvent' placeholder="Añade un titulo"></input>` +

    '<label for="dateInput">Date Imput</label>' +
    `<input type='date' id='dateInput'></input>` +

    '<label for="timeInput">Hour Imput</label>' +
    `<input type='time' id='timeInput'></input>` +

    '<div class="modal-submit-content">' +
    `<button id='button'>Aceptar</button>` +
    '</div>'
    ;

    wrapper.appendChild(newDiv);

    let closeModal = document.getElementById('closeModal');
    closeModal.onclick = () => {
    wrapper.removeChild(newDiv);
    }
}
/* NewModalEvent(); */
