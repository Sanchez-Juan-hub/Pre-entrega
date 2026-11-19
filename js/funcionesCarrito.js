import { obtenerCarrito, guardarCarrito, vaciarCarritoStorage } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    //Usamos la funcion que pide el carrito al localStorage
    const carrito = obtenerCarrito();
    carrito.push(producto);

    //Usamos la funcion que guarda el carrito en el localStorage
    guardarCarrito(carrito);

    // Usamos la funcion UI que actualiza en numero en carrito
    actualizarContador(carrito);
    mostrarMensaje("Producto agregado al carrito");
}

export const eliminarProducto = (indice) => {
    // Eliminar un elemento del carrito array por su indice
    const carrito =obtenerCarrito();
    carrito.splice(indice, 1);

    // Actualizamos el carrito en el localStorage
    guardarCarrito(carrito);

    // Actualizamos el contador
    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado");
}

export const vaciarCarrito = () => {
    // vaciarCarritoStorage();
    // actualizarContador([]);
    // mostrarMensaje("Carrito vaciado");
    const confirmacion = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmacion) {
        vaciarCarritoStorage();
        actualizarContador([]);
        mostrarMensaje("Carrito vaciado");
        return;
    }
}