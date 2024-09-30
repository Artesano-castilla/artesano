const btn = document.getElementById('btn');
const sidebar = document.querySelector('.sidebar');
let isSidebarVisible = false; // Guardamos el estado del sidebar

btn.addEventListener('click', () => {
    isSidebarVisible = !isSidebarVisible; // Alternamos el estado
    sidebar.classList.toggle('active', isSidebarVisible); // Mostramos/ocultamos el sidebar
});

// Inicializa el slider
const initSlider = () => {
  // Selecciona los elementos del DOM necesarios
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".carta .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  
  // Calcula la posición máxima de desplazamiento
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Maneja el arrastre del pulgar de la barra de desplazamiento
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX; // Posición inicial del mouse
      const thumbPosition = scrollbarThumb.offsetLeft; // Posición inicial del pulgar
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; // Posición máxima del pulgar
      
      // Actualiza la posición del pulgar en el movimiento del mouse
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX; // Diferencia de movimiento del mouse
          const newThumbPosition = thumbPosition + deltaX; // Nueva posición del pulgar

          // Asegura que el pulgar se mantenga dentro de los límites
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; // Posición de desplazamiento correspondiente
          
          scrollbarThumb.style.left = `${boundedPosition}px`; // Actualiza la posición del pulgar
          imageList.scrollLeft = scrollPosition; // Desplaza la lista de imágenes
      }

      // Elimina los event listeners al soltar el mouse
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      // Agrega event listeners para la interacción de arrastre
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  // Desliza imágenes según los clics en los botones de deslizamiento
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1; // Determina la dirección
          const scrollAmount = imageList.clientWidth * direction; // Cantidad de desplazamiento
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); // Desplaza suavemente
      });
  });

   // Muestra u oculta los botones de deslizamiento según la posición de desplazamiento
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex"; // Oculta el botón anterior si está al inicio
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex"; // Oculta el botón siguiente si está al final
  }

  // Actualiza la posición del pulgar de la barra de desplazamiento según el desplazamiento de la imagen
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft; // Posición de desplazamiento actual
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth); // Calcula la nueva posición del pulgar
      scrollbarThumb.style.left = `${thumbPosition}px`; // Actualiza la posición del pulgar
  }

  // Llama a estas dos funciones cuando la lista de imágenes se desplaza
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition(); // Actualiza la posición del pulgar
      handleSlideButtons(); // Maneja la visibilidad de los botones
  });
}

// Inicializa el slider en el evento de carga y ajuste de la ventana
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
