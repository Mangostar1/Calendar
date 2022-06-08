import {wrapper} from './calendar.js';

export function NewModalEvent(element, num) {
    let newDiv = document.createElement('div');

    newDiv.classList.add('modal');

    newDiv.innerHTML = 
    '<div class="modal-close-content" id="closeModalID">' +
        `<button class="btn-close-modal">` +
            `<img src="./icons/close-svgrepo-com.svg" class="closeModal">`+
        `</button>` +
    '</div>' +
    '<div class="modal-content-info">' +
        `<input type='text' id='titleEvent' placeholder="Añade un titulo"></input>` +

        `<div class="inputs-content">` +
            '<label for="dateInput" class="labels-modal">Fecha de inicio</label>' +
            `<input type='date' id='dateInput'></input>` +
        `</div>` +

        `<div class="inputs-content">` +
            '<label for="timeInput" class="labels-modal">Hora de inicio</label>' +
            `<input type='time' id='timeInput'></input>` +
        `</div>` +

        '<div class="modal-submit-content">' +
            `<button class="buttonModa" id='buttonModalID'>Aceptar</button>` +
        '</div>' +
    '</div>';
    ;

    element.appendChild(newDiv);

    let buttonModal = document.getElementsByClassName('buttonModa');
    buttonModal[0].onclick = () => {
        console.log('hola desde boton aceptar');
        let title = document.getElementById('titleEvent').value;
        let date = document.getElementById('dateInput').value;
        let time = document.getElementById('timeInput').value;
        console.log(title, date, time);
    }
}

export function closeModal(element) {
    console.log('hola desde closeModal');
    const elements = document.getElementsByClassName("modal");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}