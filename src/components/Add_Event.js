//Este evento modal tiene la funcion de ingresar a una base de datos un evento

//Este archivo es solo a modo de ejemplo.
export function NewModalEvent(element) {
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
        <input type='text' id='titleEvent' placeholder="Añade un titulo" />

        <textarea id='descriptionEvent' placeholder="Añade una descripcion" ></textarea>

        <div class="inputs-content">
            <label for="dateInput" class="labels-modal">Fecha de inicio</label>
            <input type='date' id='dateInput'  />
        </div>

        <div class="inputs-content">
            <label for="timeInput" class="labels-modal">Hora de inicio</label>
            <input type='time' id='timeInput' />

            <label for="timeInputEnd" class="labels-modal">Hora de termino</label>
            <input type='time' id='timeInputEnd' />
        </div>

        <div class="modal-submit-content">
            <button class="buttonModa" id='buttonModalID'>Aceptar</button>
        </div>
    </div>`;

    element.appendChild($newDiv);
}

export function closeModal() {
    const $elements = document.getElementsByClassName("modal");
    while($elements.length > 0){
        $elements[0].parentNode.removeChild($elements[0]);
    }
}


/*------------------*/
/* Datos formulario */
/*------------------*/

document.addEventListener('click', async(e) => {
    if(e.target.matches('#buttonModalID') === true){
        const $title = document.getElementById('titleEvent').value;
        const $description = document.getElementById('descriptionEvent').value;
        const $date = document.getElementById('dateInput').value;
        const $time = document.getElementById('timeInput').value;
        const $timeEnd = document.getElementById('timeInputEnd').value;

        console.log($title, $description, $date, $time, $timeEnd);

        await fetch('http://localhost:3000/events', {//<-- URL for POST
            'method' : 'POST',
            'headers' : {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                "dateStartEvent": `${$date}`,
                "hourStart": `${$time}`,
                "dateFinishEvent": `${$date}`,
                "hourFinish": `${$timeEnd}`,
                "title": `${$title}`,
                "description": `${$description}`,
                "statusInformation": {
                    "statusCode": "001",
                    "status": "activo",
                    "colorStatus": "green"
                },
                "typeInformation": {
                    "type": "0001",
                    "colorBackgroundType": "#0096a6",
                    "colorType": "white"
                }
            })
        });
    }
});

//extra code for stylesheet
let btnMobile = document.querySelector('.new-event');

/* setInterval(() => {
    if(window.innerWidth < 768){
        btnMobile.style.cssText = 'position: absolute; bottom: 2rem; right: 1rem;';
    }
}, 1000); */