document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  // Verificar que todos los campos requeridos tengan valor
  if (nombre && email && mensaje) {
    // Crear el mensaje para WhatsApp
    const textoMensaje = `Hola, soy ${nombre}.%0AMi teléfono es: ${telefono}.%0AEmail: ${email}.%0AMensaje: ${mensaje}`;

    // Número de WhatsApp
    const numeroWhatsApp = "5492216905085";
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoMensaje}`;

    // Redirigir a la URL de WhatsApp en una nueva pestaña
    window.open(url, "_blank");
  } else {
    alert("Por favor, complete todos los campos requeridos.");
  }
});
