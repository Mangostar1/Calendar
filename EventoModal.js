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
    console.log('cerrando modal');
    console.log(document.querySelector('div.modal'));
    console.log(element);
    element.removeChild(document.getElementsByClassName('modal')[0]);
    console.log(document.querySelector('div.modal'));
}