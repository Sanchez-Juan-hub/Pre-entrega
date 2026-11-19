import { eliminarProducto, vaciarCarrito, cambiarCantidad } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

// Da formato a los precios: 18000 -> $18.000
const formatearPrecio = (valor) => `$${valor.toLocaleString("es-AR")}`;

// Crea la fila de un producto
const crearFila = (producto) => {
    const fila = document.createElement("article");
    fila.classList.add("carrito-fila");

    // Imagen del producto
    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    // Nombre
    const nombre = document.createElement("h3");
    nombre.classList.add("fila-nombre");
    nombre.textContent = producto.nombre;

    // Precio unitario
    const precio = document.createElement("span");
    precio.classList.add("fila-precio");
    precio.textContent = formatearPrecio(producto.precio);

    // Control de cantidad: boton "-", numero y boton "+"
    const control = document.createElement("div");
    control.classList.add("cantidad-control");

    const btnMenos = document.createElement("button");
    btnMenos.classList.add("btn-cantidad");
    btnMenos.textContent = "−";
    btnMenos.addEventListener("click", () => {
        cambiarCantidad(producto.id, -1);
        renderizarCarrito();
    });

    const cantidad = document.createElement("span");
    cantidad.classList.add("cantidad-valor");
    cantidad.textContent = producto.cantidad;

    const btnMas = document.createElement("button");
    btnMas.classList.add("btn-cantidad");
    btnMas.textContent = "+";
    btnMas.addEventListener("click", () => {
        cambiarCantidad(producto.id, 1);
        renderizarCarrito();
    });

    control.append(btnMenos, cantidad, btnMas);

    // Subtotal de la fila
    const subtotal = document.createElement("strong");
    subtotal.classList.add("fila-subtotal");
    subtotal.textContent = formatearPrecio(producto.precio * producto.cantidad);

    // Boton X para eliminar el producto
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar-x");
    btnEliminar.textContent = "✕";
    btnEliminar.setAttribute("aria-label", `Eliminar ${producto.nombre}`);
    btnEliminar.addEventListener("click", () => {
        eliminarProducto(producto.id);
        renderizarCarrito();
    });

    // Armamos la fila en el orden de las columnas
    fila.append(img, nombre, precio, control, subtotal, btnEliminar);
    return fila;
};

// renderizar el resumen de la derecha
const renderizarResumen = (carrito) => {
    const resumen = document.getElementById("resumen-carrito");
    resumen.innerHTML = "";

    // Suma de precio x cantidad de todos los productos
    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // Titulo
    const titulo = document.createElement("h2");
    titulo.classList.add("resumen-titulo");
    titulo.textContent = "Resumen";

    // Fila de subtotal
    const filaSubtotal = document.createElement("div");
    filaSubtotal.classList.add("resumen-fila");

    const etiquetaSubtotal = document.createElement("span");
    etiquetaSubtotal.textContent = "Subtotal";

    const valorSubtotal = document.createElement("span");
    valorSubtotal.textContent = formatearPrecio(subtotal);

    filaSubtotal.append(etiquetaSubtotal, valorSubtotal);

    // Fila de total (por ahora igual al subtotal; aca se pueden sumar envio o descuentos)
    const filaTotal = document.createElement("div");
    filaTotal.classList.add("resumen-fila", "resumen-total");

    const etiquetaTotal = document.createElement("span");
    etiquetaTotal.textContent = "Total";

    const valorTotal = document.createElement("span");
    valorTotal.textContent = formatearPrecio(subtotal);

    filaTotal.append(etiquetaTotal, valorTotal);

    // Boton continuar compra
    const btnContinuar = document.createElement("button");
    btnContinuar.classList.add("btn", "btn-continuar");
    btnContinuar.textContent = "Continuar compra";
    btnContinuar.addEventListener("click", () => {
        mostrarMensaje("Funcionalidad en construcción");
    });

    resumen.append(titulo, filaSubtotal, filaTotal, btnContinuar);
};

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");
    const resumen = document.getElementById("resumen-carrito");

    // Limpiamos lo renderizado antes
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";
    resumen.innerHTML = "";

    // Carrito vacio: mostramos mensaje y cortamos
    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito esta vacio";
        contenedor.appendChild(mensaje);
        return;
    }

    // Una fila por producto
    carrito.forEach((producto) => {
        contenedor.appendChild(crearFila(producto));
    });

    // Boton vaciar carrito
    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn", "btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    });
    divAcciones.appendChild(btnVaciar);

    // Resumen de la derecha
    renderizarResumen(carrito);
};

// renderiza el carrito cuando el HTML ya cargo
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});