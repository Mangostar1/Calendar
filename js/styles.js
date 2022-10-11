/*---------------------*/
/* Styles for Calendar */
/*---------------------*/

//Agregar un onload quiza

setTimeout(() => {// <-- Para dejar cargar los eventos en el DOM antes de darles estilos
    
    let btnEventMonth = document.getElementsByClassName('btm-event-month');
    let titleSP = document.getElementsByClassName('sp-title');
    let hourSP = document.getElementsByClassName('sp-hour');

    for (let b = 0; b < btnEventMonth.length; b++) {
        /* console.log(btnEventMonth[b]);
        console.log(titleSP[b]);
        console.log(hourSP[b]); */
    }
}, 100);