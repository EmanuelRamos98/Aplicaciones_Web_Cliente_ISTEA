//Variable para la lista de productos
let productos = [];

//Variable para la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
//Variable para la lista de carritos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector(".contenedor-catalogo");

//Para construir la lista de favoritos
const listaFavoritos = document.querySelector(".lista-favoritos");
//para el contador de favoritos
const favCount = document.querySelector(".fav-count");

//Render Carrito
const listaCarrito = document.querySelector(".lista-carrito");
// Contador para cuantos elementos tiene el carrito
const cartCount = document.querySelector(".cart-count");

//Total de la compra
const cartTotal = document.querySelector(".cart-total");

//Para el mensaje toast/emergente
const toast = document.getElementById("toast");

//Credenciales de airtable
const AIRTABLE_BASE_ID = "appvMRzO2IWQvVdIc";
const AIRTABLE_PAT =
    "pathwXZI9eo6Nw8uC.310d7dd001935b2d0275eb3b169af5a5d6cb27b742a7da40e00b043aa2475826";

//Carga de los productos desde el JSON
const cargarProductos = async () => {
    try {
        const res = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/tbllj2K9B18RyJGIa?sort[0][field]=id&sort[0][direction]=asc`,
            {
                headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
            },
        );
        if (!res.ok) {
            throw new Error(
                `Airtable devolvió un error: ${res.status} ${res.statusText}`,
            );
        }

        const data = await res.json();
        productos = data.records.map((r) => r.fields);

        renderizarCatalogo();
        renderizarFavoritos();
        renderizarCarrito();
    } catch (error) {
        console.error("Error al cargar los productos", error);
    } finally {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("oculto");
        }
    }
};

//Funcion para renderizar
const renderizarCatalogo = () => {
    //Si no estoy donde se necesita el catalogo, no lo cargues
    if (!contenedorCatalogo) return;
    //Borramos para que no haya que nos aletere
    contenedorCatalogo.innerHTML = "";
    //Luego hacemos el mapeo
    const catalogo = productos
        .map((pro) => {
            const esFavorito = favoritos.includes(pro.id);
            const estaEnCarrito = carrito.some((item) => item.id === pro.id);
            return `
                <article data-id="${pro.id}">
                    <img src="${pro.img}" alt="${pro.nombre}" />
                    <h2>${pro.nombre}</h2>
                    <h3>$${pro.precio.toLocaleString("es-ar")}</h3>
                    
                    <button class="btn-favorito-catalogo ${esFavorito ? "active-favoritos" : ""}" data-id="${pro.id}">
                        ${esFavorito ? "En favoritos" : "Agregar a favoritos"}
                    </button>
        
                    <button class="btn-carrito-catalogo ${estaEnCarrito ? "active-carrito" : ""}" data-id="${pro.id}">
                        ${estaEnCarrito ? "En el carrito" : "Comprar"}
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
        cart.addEventListener("click", agregarAlCarrito);
    });
};

if (contenedorCatalogo) {
    contenedorCatalogo.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            const article = e.target.closest("article");
            if (!article) {
                return;
            } else {
                window.location.href = `detalle.html?id=${article.dataset.id}`;
            }
        }
    });
}

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
    renderizarFavoritos();
    renderizarCatalogo();
};

//Para renderizar favoritos
const renderizarFavoritos = () => {
    listaFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = `
            <p>No tienes productos en favoritos<p/>
        `;
        //Si el contador es 0, el elemento fav-count tiene que desaparecer
        favCount.textContent = 0;
        favCount.classList.remove("active");
        return;
    }

    favoritos.forEach((id) => {
        const prod = productos.find((p) => p.id === id);
        if (!prod) return;

        const li = document.createElement("li");
        li.className = "item-fav";
        li.innerHTML = `
            <div class="contenedor-li-fav">
                <img src="${prod.img}" alt="Imagen de ${prod.nombre}">
                <span>${prod.nombre}</span>
            </div>
            <button class="btn-fav-remove" data-id="${id}">
                <span class="sr-only">Quitar</span>
            </button>
        `;
        listaFavoritos.appendChild(li);
    });

    favCount.textContent = favoritos.length;
    favCount.classList.add("active");
};

listaFavoritos.addEventListener("click", (element) => {
    const btn = element.target.closest(".btn-fav-remove");
    if (btn) {
        const id = Number(btn.dataset.id);
        favoritos = favoritos.filter((favId) => favId !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        renderizarFavoritos();
        renderizarCatalogo();
        renderizarDetalle();
    }
});

//Carrito---------------------
//Agregar al carrito

const agregarAlCarrito = (element) => {
    const id = Number(element.target.dataset.id);
    const existe = carrito.find((item) => item.id === id);

    if (existe) {
        return;
    } else {
        carrito.push({ id, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCatalogo();
    renderizarCarrito();
    renderizarDetalle();
    mostrarToast();
};

//Toast mensaje emergente
const mostrarToast = () => {
    if (!toast) return;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2000);
};

//Renderizar el carrito
const renderizarCarrito = () => {
    listaCarrito.innerHTML = "";

    //Estado en vacio del carrito
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <p> Tu carrito esta vacio </p>
        `;
        cartCount.textContent = 0;
        cartCount.classList.remove("active");
        cartTotal.innerHTML = "";
        return;
    }

    let total = 0;
    carrito.forEach((item) => {
        const prod = productos.find((p) => p.id === item.id);
        if (!prod) return;

        const subtotal = prod.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement("li");

        li.className = "item-cart";
        li.innerHTML = `
            <img src="${prod.img}" alt="Imagen de ${prod.nombre}"/>
            <div class="cart-data">
                <div class="cart-text"> <h2>${prod.nombre}</h2>
                    <h3>$${prod.precio.toLocaleString("es-AR")} x ${item.cantidad}
                        = $${subtotal.toLocaleString("es-AR")}
                    </h3>
                </div>
                
                <div class="cart-controles">
                    <button class="menos" data-id="${item.id}">
                        <span class="sr-only">Restar -1</span>
                    </button>

                    <span class="cantidad-txt">${item.cantidad}</span>

                    <button class="mas" data-id="${item.id}">
                        <span class="sr-only">Sumar +1</span>
                    </button>

                    <button class="eliminar" data-id="${item.id}">
                        <span class="sr-only">Eliminar item del carrito</span>
                    </button>
                </div>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    cartTotal.innerHTML =
        "Total de mi compra: " + " $" + total.toLocaleString("es-AR");

    cartCount.classList.add("active");
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = totalItems;

    //Liseners para los botones de control
    //Suma
    listaCarrito.querySelectorAll(".mas").forEach((btn) => {
        btn.addEventListener("click", () =>
            modificarCantidad(Number(btn.dataset.id), 1),
        );
    });
    //Resta
    listaCarrito.querySelectorAll(".menos").forEach((btn) => {
        btn.addEventListener("click", () =>
            modificarCantidad(Number(btn.dataset.id), -1),
        );
    });
    //Eliminar del carrito
    listaCarrito.querySelectorAll(".eliminar").forEach((btn) => {
        btn.addEventListener("click", () =>
            eliminarDelCarrito(Number(btn.dataset.id)),
        );
    });
};

const modificarCantidad = (id, delta) => {
    const item = carrito.find((item) => item.id === id);

    if (item) {
        item.cantidad = Math.max(1, item.cantidad + delta); //la funcion math.max esta para vigilar que no baje de 1
        localStorage.setItem("carrito", JSON.stringify(carrito));

        renderizarCarrito();
    }
};

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((item) => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCatalogo();
    renderizarCarrito();
    renderizarDetalle();
};

//Ver detalle
const renderizarDetalle = () => {
    const contenedor = document.getElementById("detalle");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const prod = productos.find((p) => p.id === id);

    if (!prod) {
        window.location.href = "404.html";
        return;
    }

    const esFavorito = favoritos.includes(prod.id);
    const enCarrito = carrito.some((item) => item.id === prod.id);

    contenedor.innerHTML = `
        <h1>${prod.nombre}</h1>
                <div class="container-detalle-img">
                    <img src="${prod.img}" alt="Imagen de muestra de ${prod.nombre}"/>
                </div>
                <div class='container-btn-detalle'>
                    <button class="btn-detalle btn-favorito-catalogo  ${esFavorito ? "active-favoritos" : ""}" data-id="${prod.id}">
                        ${esFavorito ? "En favoritos" : "Agregar a favoritos"}
                    </button>
                    <button class="btn-detalle btn-carrito-catalogo ${enCarrito ? "active-carrito" : ""}" data-id="${prod.id}">
                        ${enCarrito ? "En el carrito" : "Comprar"}
                    </button>
                </div>
                <h2>Llega mañana</h2>
                <h3>$ ${prod.precio.toLocaleString("es-ar")}</h3>
                <p>${prod.detalle}</p>
                <ul>
                    <li>${prod.Caract_1}</li>
                    <li>${prod.Caract_2}</li>
                    <li>${prod.Caract_3}</li>
                    <li>${prod.Caract_4}</li>
                </ul>

    `;

    contenedor
        .querySelector(".btn-favorito-catalogo")
        ?.addEventListener("click", toggleFavoritos);

    contenedor
        .querySelector(".btn-carrito-catalogo")
        ?.addEventListener("click", agregarAlCarrito);

    /* Renderizamos la lista de otros */
    const otros = document.querySelector(".container-otros");
    if (!otros) return;

    const otrosFiltrados = productos
        .filter((p) => p.id !== id) //filtro el array
        .sort(() => Math.random() - 0.5) // lo mezclo para no mostrar los mismo siempre
        .slice(0, 5); //muestro solamente esta cantidad

    otros.innerHTML = otrosFiltrados
        .map(
            (item) => `
        <article data-id="${item.id}">
            <h2>${item.nombre}</h2>
            <img src="${item.img}" alt="Miniatura de ${item.nombre}" style="cursor: pointer;" />
        </article>
    `,
        )
        .join("");

    otros.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            const article = e.target.closest("article");
            if (article) {
                window.location.href = `detalle.html?id=${article.dataset.id}`;
            }
        }
    });
};

//Le decimos al Dom que al cargar ejecute esta funcion
document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductos();

    //Carga solamente si el .detalle-producto existe
    if (document.getElementById("detalle")) {
        renderizarDetalle();
    }
});
