import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Actualizamos el contador al cargar la página
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
});