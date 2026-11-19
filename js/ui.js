// Muestra en el contador el total de unidades del carrito
export const actualizarContador = (carrito) => {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.reduce((acc, producto) => acc + (producto.cantidad ?? 1), 0);
    }
}

// Muestra un aviso discreto que desaparece solo
export const mostrarMensaje = (texto) => {
    // Buscamos el contenedor de avisos; si no existe, lo creamos una sola vez
    let contenedor = document.getElementById('contenedor-toasts');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-toasts';
        document.body.appendChild(contenedor);
    }

    // Creamos el aviso con su texto
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = texto;
    contenedor.appendChild(toast);

    // Pasado un momento le agregamos la clase que lo hace visible (activa la animación)
    setTimeout(() => toast.classList.add('toast-visible'), 10);

    // A los 2 segundos lo ocultamos y, cuando termina la animación, lo eliminamos del DOM
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}