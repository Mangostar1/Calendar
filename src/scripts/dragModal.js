export function dragModal() {
  const draggableElement = document.querySelector(
    ".modal-close-content"
  ).parentElement;
  let isDragging = false;
  let initialX;
  let initialY;
  let currentX;
  let currentY;
  let xOffset = 0;
  let yOffset = 0;

  draggableElement.addEventListener("mousedown", function (e) {
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
