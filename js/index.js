// Importante las funcionas para enviar objetos al array
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";

// Crea una tarjeta (article) a partir de un producto
const crearTarjeta = (producto) => {
    // Contenedor de la tarjeta con su clase CSS
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    // Imagen: la ruta del JSON no trae "./", así que se lo agregamos
    const img = document.createElement("img");
    img.src = `./${producto.img}`;
    img.alt = producto.nombre; // texto alternativo para accesibilidad

    // Nombre del producto
    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    // Descripción
    const descripcion = document.createElement("p");
    descripcion.classList.add("descripcion");
    descripcion.textContent = producto.descripcion;

    // Precio con el signo $ adelante
    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `$${producto.precio}`;

    // Botón que agrega este producto al carrito al hacer click
    const boton = document.createElement("button");
    boton.classList.add("btn");
    boton.textContent = "Agregar al carrito";
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    // Armamos la tarjeta con todos sus elementos, en orden
    tarjeta.append(img, titulo, descripcion, precio, boton); 
    //Usé append en lugar de varios appendChild, para meter varios elementos de una vez.
    return tarjeta; 
    // devolvemos la tarjeta lista para insertar
};

// Renderiza los productos agrupados por categoría
const renderizarProductos = () => {
    // Único contenedor del HTML donde se insertan todas las secciones
    const contenedorPrincipal = document.getElementById("contenedor-productos");

    // Pedimos el JSON de productos
    fetch("./data/productos.json")
        .then((response) => response.json()) // convertimos la respuesta a objeto JS
        .then((data) => {
            // Categorías sin repetir, en el orden en que aparecen en el JSON
            const categorias = [...new Set(data.map((producto) => producto.categoria))];

            //No vimos pero me sirve para que no se repitan las categorías y para que el orden de las secciones sea el mismo que en el JSON.
            //new Set(...) elimina las categorías repetidas, y el [...] spread creo lo convierte otra vez en array. 
            //El orden de las secciones en la página es el orden en que aparece cada categoría por primera vez en el JSON

            // Una sección por cada categoría
            categorias.forEach((categoria) => {
                const seccion = document.createElement("section");

                // Título de la categoría
                const titulo = document.createElement("h2");
                titulo.classList.add("titulo-productos");
                titulo.textContent = categoria;

                // Div que agrupa las tarjetas de esta categoría
                const contenedor = document.createElement("div");
                contenedor.classList.add("contenedor-tarjetas");

                // Filtramos los productos de esta categoría y agregamos sus tarjetas
                data
                    .filter((producto) => producto.categoria === categoria)
                    .forEach((producto) => {
                        contenedor.appendChild(crearTarjeta(producto));
                    });

                // Metemos título y tarjetas en la sección, y la sección en la página
                seccion.append(titulo, contenedor);
                contenedorPrincipal.appendChild(seccion);
            });
        })
        .catch((error) => console.log(error)); // muestra en consola si falla el fetch
};

// Espera a que el HTML esté cargado para poder acceder a sus elementos
document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito(); // lee el carrito guardado
    actualizarContador(carrito);      // muestra la cantidad en el contador
    renderizarProductos();            // dibuja los productos en la página
});