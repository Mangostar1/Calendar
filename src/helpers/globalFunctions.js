// Funciones para mostrar y ocultar el modal en los componentes
function openModalBtn(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModalBtn(id) {
  document.getElementById(id).classList.add("hidden");
}