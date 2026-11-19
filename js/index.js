import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";

// Funcion que renderiza los productos en la pagina principal en contenedor-tarjetas, obteniendo los datos de productos.json
const renderizarProductors = () => {
    // Tomamos el div para meter las tarjetas de los productos
    const contenedor = document.getElementById("contenedor-tarjetas");

    fetch("./data/productos.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((producto) => {
                // creamos los articles y sus contenidos
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("card");
                
                // Tener muy en cuenta al crear la url de las img
                const img = document.createElement("img");
                img.src = `./${producto.img}`;
                img.alt = producto.nombre;
        
                const titulo = document.createElement("h3");
                titulo.textContent = producto.nombre;
        
                const precio = document.createElement("p");
                precio.textContent = `$${producto.precio}`;
        
                const boton = document.createElement("button");
                boton.classList.add("btn");
                boton.textContent = "Agregar al carrito";
        
                boton.addEventListener("click", () => {
                agregarAlCarrito(producto);
                });
        
                // Armar la estructura
                tarjeta.appendChild(img);
                tarjeta.appendChild(titulo);
                // descripcion falta
                tarjeta.appendChild(precio);
                tarjeta.appendChild(boton);
        
                contenedor.appendChild(tarjeta);
            });
        })
        .catch((error) => console.log(error));         
        
};

// El evento "DOMContentLoaded" sirve para que no lea un getElementById cuando aun no existe ese id.
// Antes de que el navegador cree el nodo HTML, el codigo JS no puede acceder a ese nodo. Por eso se usa este evento.
document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductors();
});