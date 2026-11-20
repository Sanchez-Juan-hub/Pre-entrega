// Muestra en el contador el total de unidades del carrito
export const actualizarContador = (carrito) => {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        // Suma las unidades de cada producto; si el total es 0, deja el texto vacío
        contador.textContent = carrito.reduce((acc, producto) => acc + (producto.cantidad ?? 1), 0) || "";
    }
}

// Busca el contenedor de toasts; si no existe, lo crea una sola vez por las dudas
const obtenerContenedorToasts = () => {
    let contenedor = document.getElementById('contenedor-toasts');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-toasts';
        document.body.appendChild(contenedor);
    }
    return contenedor;
}

// Aviso que desaparece solo
export const mostrarMensaje = (texto) => {
    const contenedor = obtenerContenedorToasts();

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = texto;
    contenedor.appendChild(toast);

    // Activa la animación de entrada
    setTimeout(() => toast.classList.add('toast-visible'), 10);

    // A los 2 segundos lo ocultamos y luego lo eliminamos del DOM
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Toast (notificacion tipo popup que desaparece a los segundos) con botones confirmar y cancelar. Devuelve una promesa: true si confirma, false si cancela
export const confirmarAccion = (texto) => {
    return new Promise((resolve) => {
        const contenedor = obtenerContenedorToasts();

        // Si ya hay una confirmación abierta, no creamos otra para que no se acumulen y se confunda el usuario
        if (contenedor.querySelector('.toast-confirmacion')) {
            resolve(false);
            return;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast', 'toast-confirmacion');

        const mensaje = document.createElement('p');
        mensaje.textContent = texto;

        const botones = document.createElement('div');
        botones.classList.add('toast-botones');

        const btnConfirmar = document.createElement('button');
        btnConfirmar.classList.add('toast-btn', 'toast-btn-confirmar');
        btnConfirmar.textContent = 'Confirmar';

        const btnCancelar = document.createElement('button');
        btnCancelar.classList.add('toast-btn', 'toast-btn-cancelar');
        btnCancelar.textContent = 'Cancelar';

        // Cierra el toast con animación y devuelve la respuesta
        const cerrar = (respuesta) => {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 300);
            resolve(respuesta);
        };

        btnConfirmar.addEventListener('click', () => cerrar(true));
        btnCancelar.addEventListener('click', () => cerrar(false));

        botones.append(btnConfirmar, btnCancelar);
        toast.append(mensaje, botones);
        contenedor.appendChild(toast);

        setTimeout(() => toast.classList.add('toast-visible'), 10);
    });
}