//* This function returns a <button> element to the following components "DayComponent", "WeekComponent", and "Months Component".

export function datesFetch(fetchJSON, numFor, componentInfo) {
  //fetch.json(), for index
  let hoursEventDiration;
  let differenceInHours = 0;
  const event = fetchJSON.events[numFor];

  let dateStartUTC = event.dateStartEvent.replace('Z', '');;
  let dateFinishUTC = event.dateFinishEvent.replace('Z', '');;
  
  const eventData = {
    dateStart: new Date(dateStartUTC),
    dateFinish: new Date(dateFinishUTC),
    title: event.title,
    description: event.description,
    color: event.typeInformation.colorBackgroundType,
    creator: event.creator,
    statusText: event.statusInformation.status,
    statusColor: event.statusInformation.colorStatus
  };

  if (eventData.dateStart.toDateString() === eventData.dateFinish.toDateString()) {
    hoursEventDiration = eventData.dateFinish - eventData.dateStart;
    differenceInHours = Math.floor(hoursEventDiration / (1000 * 60 * 60));
  }

  let $btns = `
    <div 
      id="event-Modal" 
      class="btn-item component-${componentInfo} ${componentInfo}-event-hours-duration-${differenceInHours}" 
      style="background-color: ${eventData.color};"
      data-date-start=${eventData.dateStart.toLocaleDateString()} 
      data-date-finish=${eventData.dateFinish.toLocaleDateString()} 
      data-hour-start="${eventData.dateStart.toLocaleTimeString()}" 
      data-hour-finish="${eventData.dateFinish.toLocaleTimeString()}" 
      data-title="${eventData.title}" 
      data-creator="${eventData.creator}"
      data-statusText="${eventData.statusText}" 
      data-statusColor="${eventData.statusColor}" 
      data-color-event="${eventData.color}" 
      data-description="${eventData.description}">
        ${eventData.title}
    </div>`;

  return {
    eventData,
    btns: $btns,
    differenceInHours
  };
}
