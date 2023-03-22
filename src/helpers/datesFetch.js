export function datesFetch(fetchJSON, numFor) {

    const event = fetchJSON.events[numFor];

    const eventData = {
        dateStart: new Date(`${event.dateStartEvent} ${event.hourStart}`),
        dateFinish: new Date(`${event.dateFinishEvent} ${event.hourFinish}`),
        title: event.title,
        description: event.description,
        color: event.typeInformation.colorBackgroundType
    }
    
    let $btns =
        `<button 
        style="background-color: ${eventData.color};" 
        id="event-Modal" 
        class="btn-item" 
        data-date-start=${eventData.dateStart.toLocaleDateString()} 
        data-date-finish=${eventData.dateFinish.toLocaleDateString()} 
        data-hour-start="${eventData.dateStart.toLocaleTimeString()}" 
        data-hour-finish="${eventData.dateFinish.toLocaleTimeString()}" 
        data-title="${eventData.title}" 
        data-description="${eventData.description}">
            <span class="sp-title"> ${eventData.title} </span>
        </button>`;

        return {
            eventData,
            btns: $btns
        }
}