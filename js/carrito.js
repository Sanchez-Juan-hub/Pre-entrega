const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    // Si no hay productos en el carrito crea una etiqueta <p> con un mensaje y la agrega al contenedor
    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito esta vacio";
        contenedor.appendChild(mensaje);
        // Sin esta funcion de retorno, la funcion no corta e intenta renderizar tarjetas
        return;
    }

    // Si hay productos en el carrito, recorre el array y crea una tarjeta para cada producto
    carrito.forEach((producto, index) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-eliminar-carrito");
        btnEliminar.textContent = "Eliminar producto";
        

        btnEliminar.addEventListener("click", () => {
            // Elimina el producto del carrito
            eliminarProducto(index);
            // Reseteo de tarjetas
            renderizarCarrito();
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(btnEliminar);

        contenedor.appendChild(tarjeta);
    });

    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn", "btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar carrito";

    btnVaciar.addEventListener("click", () => {
        // Vacía el carrito
        vaciarCarrito();
        // Reseteo de tarjetas
        renderizarCarrito();
    });

    divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});