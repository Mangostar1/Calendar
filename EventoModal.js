import {wrapper} from './calendar.js';

export function NewModalEvent(element) {
    let newDiv = document.createElement('div');

    newDiv.classList.add('modal');

    newDiv.innerHTML = 
    '<div class="modal-close-content">' +
    `<img src="./icons/close-svgrepo-com.svg" class="closeModal" id="closeModalID">`+
    '</div>' +

    `<input type='text' id='titleEvent' placeholder="Añade un titulo"></input>` +

    '<label for="dateInput">Date Imput</label>' +
    `<input type='date' id='dateInput'></input>` +

    '<label for="timeInput">Hour Imput</label>' +
    `<input type='time' id='timeInput'></input>` +

    '<div class="modal-submit-content">' +
    `<button class="buttonModa" id='buttonModalID'>Aceptar</button>` +
    '</div>'
    ;

    element.appendChild(newDiv);

    let closeModal = document.getElementsByClassName('closeModal');
    closeModal[0].addEventListener('click', (element) => {
        element.removeChild(newDiv);
    });

    /* closeModal.onclick = (element) => {
        console.log('hola');
        element.removeChild(newDiv);
    } */

    let buttonModal = document.querySelector('.buttonModa');
    buttonModal.onclick = () => {
        console.log('hola desde boton aceptar');
    }
}