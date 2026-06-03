//Variable para la lista de productos
let productos = [];

//Variable para la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
//Variable para la lista de carritos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector(".contenedor-catalogo");

//Carga de los productos desde el JSON
const cargarProductos = async () => {
    try {
        const res = await fetch("../data/productos.json");
        productos = await res.json();
        renderizarCatalogo();
    } catch (error) {
        console.error("Error al cargar los productos", error);
    }
};

//Funcion para renderizar
const renderizarCatalogo = () => {
    //Borramos para que no haya que nos aletere
    contenedorCatalogo.innerHTML = "";
    //Luego hacemos el mapeo
    const catalogo = productos
        .map((pro) => {
            const esFavorito = favoritos.includes(pro.id);
            const estaEnCarrito = carrito.includes(pro.id);
            return `
                    <article>
                        <img
                            src=${pro.img}
                            alt=${pro.nombre}
                        />
                        <h2>${pro.nombre}</h2>
                        <h3>$${pro.precio.toLocaleString("es-ar")}</h3>
                        <button class="btn-favorito-catalogo ${esFavorito ? "active-favoritos" : ""}" data-id="${pro.id}">
                            ${esFavorito ? "En favoritos" : "Agregar a favoritos"}
                        </button>
            
                        <button class="btn-carrito-catalogo ${estaEnCarrito ? "active-carrito" : ""}" data-id="${pro.id}">
                            ${estaEnCarrito ? "En el carrito" : "Agregar a carrito"}
                        </button>
                    </article>
    `;
        })
        .join("");
    //Lo mostrasmos en el html
    contenedorCatalogo.innerHTML = catalogo;

    //Invocamos la funcion que maneja favoritos
    document.querySelectorAll(".btn-favorito-catalogo").forEach((fav) => {
        fav.addEventListener("click", toggleFavoritos);
    });

    document.querySelectorAll(".btn-carrito-catalogo").forEach((cart) => {
        cart.addEventListener("click", toggleCarrito);
    });
};

// Función Favoritos
const toggleFavoritos = (event) => {
    const id = Number(event.currentTarget.dataset.id);

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((favID) => favID !== id);
        event.currentTarget.classList.remove("active-favoritos");
        event.currentTarget.textContent = "Agregar a favoritos";
    } else {
        favoritos.push(id);
        event.currentTarget.classList.add("active-favoritos");
        event.currentTarget.textContent = "En favoritos";
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

// Función Carrito
const toggleCarrito = (event) => {
    const id = Number(event.currentTarget.dataset.id);

    if (carrito.includes(id)) {
        carrito = carrito.filter((carrID) => carrID !== id);
        event.currentTarget.classList.remove("active-carrito");
        event.currentTarget.textContent = "Agregar al carrito";
    } else {
        carrito.push(id);
        event.currentTarget.classList.add("active-carrito");
        event.currentTarget.textContent = "En el Carrito";
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Le decimos al Dom que al cargar ejecute esta funcion
document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductos();
});
