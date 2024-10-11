// Selecciona todos los enlaces del menú lateral
const sidebarLinks = document.querySelectorAll("#sidebar .list-items li a");
const checkbox = document.getElementById("btn"); // El checkbox que controla el menú lateral

// Función para cerrar el menú y navegar al ancla
sidebarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    checkbox.checked = false; // Cierra el menú lateral
  });
});
