//Objeto

const producto = {
    modelo: "158",
    nombre: "Alfeta",
    marca: "Alfa Romeo",
    precio: 15000,
};

document.getElementById("ejemplo1").innerHTML =
    "Modelo " +
    producto.modelo +
    " nombre: " +
    producto.nombre +
    " Marca: " +
    producto.marca +
    " Precio: $" +
    producto.precio +
    " " +
    typeof producto;

//JSON
//Parse
const JSONproducto =
    '{"modelo": "158","nombre": "Alfeta","marca": "Alfa Romeo","precio": 15000 }';

const productoParse = JSON.parse(JSONproducto);
document.getElementById("ejemplo2").innerHTML =
    "Modelo " +
    productoParse.modelo +
    " nombre: " +
    productoParse.nombre +
    " Marca: " +
    productoParse.marca +
    " Precio: $" +
    productoParse.precio +
    " " +
    typeof productoParse;

//Stringfy
const carrito = {
    items: ["Alfa Romeo 158", "Maseratti 240F"],
    total: 48000,
    usuario: "Alexis",
};

const carritoString = JSON.stringify(carrito);
console.log(carritoString);

//map
const productosCatalogo = [
    {
        id: 1,
        modelo: "158",
        nombre: "Alfeta",
        marca: "Alfa Romeo",
        precio: 15000,
        img: "./data/img/Alfa-Romeo-158-scaled.webp",
    },
    {
        id: 2,
        modelo: "240F",
        nombre: "Maseratti 240F",
        marca: "Maseratti",
        precio: 19000,
        img: "./data/img/Maserati-240f-escala.webp",
    },
    {
        id: 3,
        modelo: "W 196 R",
        nombre: "Mercedes Benz",
        marca: "Mercedes Benz",
        precio: 17600,
        img: "./data/img/Mercedes-benz-W196r-escala.jpg",
    },
];

const catalogo = productosCatalogo
    .map(
        (producto) => `<article>
                        <img
                            src=${producto.img}
                            alt=${producto.nombre}
                        />
                        <h2>${producto.nombre} ${producto.modelo}</h2>
                        <h3>$${producto.precio.toLocaleString("es-ar")}</h3>
                        <button class="btn-outline">Favorito</button>
                        <button class="btn-fill">Agregar</button>
                    </article>`,
    )
    .join("");

document.getElementById("catalogo").innerHTML = catalogo;
