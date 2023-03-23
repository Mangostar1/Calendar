export function dragModal() {
    const draggableElement = document.querySelector('.modal-close-content');
    let isDragging = false;
    let originalX;
    let originalY;
    let currentX;
    let currentY;

    draggableElement.addEventListener('mousedown', function(e) {
        isDragging = true;
        originalX = e.clientX;
        originalY = e.clientY;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - originalX;
            currentY = e.clientY - originalY;
            draggableElement.parentElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

}
