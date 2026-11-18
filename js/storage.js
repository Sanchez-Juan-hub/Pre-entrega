const KEY = "carrito";

export const guardarCarrito = (carrito) => {
    // Convertimos a json antes de guardar con strigify
    localStorage.setItem(KEY, JSON.stringify(carrito));
}

export const obtenerCarrito = () => {
    // Convertimos a js para obtener los datos con parse, si no hay nada en el localStorage devolvemos un array vacio
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
}