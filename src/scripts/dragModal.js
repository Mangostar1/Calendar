/*--------------------------------------------------------------------------*/
/* 
  Function: dragModal
  Description: 
  This function allows a modal window, which opens from the calendar, to be 
  dragged and moved freely across the screen. The selected modal element can be 
  moved by the user by clicking and dragging the top section of the window 
  (specifically the area with the class "modal-close-content").

  Implementation:
  - The "mousedown" event is used to initiate the drag when the user clicks on 
    the appropriate section of the modal.
  - The "mousemove" and "mouseup" events handle the movement and the end of 
    the drag, respectively.
  - The modal's position is dynamically adjusted with CSS transformations to 
    reflect the real-time movement.

  Usage: 
  Call this function once the DOM is fully loaded and the modal has been 
  rendered in the HTML.

  Warning:
  Ensure that the modal structure includes the "modal-close-content" class for 
  the drag functionality to work properly.
*/
/*--------------------------------------------------------------------------*/

export function dragModal() {
  const draggableElement = document.querySelector(".modal-close-content").parentElement;
  const draggableElementModal = document.querySelector(".modal-close-content");
  let isDragging = false;
  let initialX;
  let initialY;
  let currentX;
  let currentY;
  let xOffset = 0;
  let yOffset = 0;

  draggableElementModal.addEventListener("mousedown", function (e) {
    isDragging = true;
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableElement);
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }
}
