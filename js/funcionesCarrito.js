import { obtenerCarrito, guardarCarrito, vaciarCarritoStorage } from "./storage.js";
import { actualizarContador, mostrarMensaje, confirmarAccion } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    //Usamos la funcion que pide el carrito al localStorage
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 }); 
        // copia del producto + cantidad
    }

    //Usamos la funcion que guarda el carrito en el localStorage
    guardarCarrito(carrito);

    // Usamos la funcion UI que actualiza en numero en carrito
    actualizarContador(carrito);
    mostrarMensaje("Producto agregado al carrito");
};

export const eliminarProducto = (id) => {
    // Eliminar un elemento del carrito array por su id
    const carrito = obtenerCarrito().filter ((item) => item.id !== id);

    // Actualizamos el carrito en el localStorage
    guardarCarrito(carrito);

    // Actualizamos el contador
    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado");
};

// Suma o resta unidades a un producto (o sea = 1 o -1). La cantidad minima es 1
export const cambiarCantidad = (id, cambio) => {
    const carrito = obtenerCarrito();
    const item = carrito.find((producto) => producto.id === id);
    if (!item) return;

    item.cantidad = Math.max(1, item.cantidad + cambio);

    guardarCarrito(carrito);
    actualizarContador(carrito);
};

// Pide confirmación con un toast; devuelve true si se vació y false si se canceló
export const vaciarCarrito = async () => {
    const confirmado = await confirmarAccion("¿Seguro que querés vaciar el carrito?");
    if (!confirmado) return false;

    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("Carrito vaciado");
    return true;
};