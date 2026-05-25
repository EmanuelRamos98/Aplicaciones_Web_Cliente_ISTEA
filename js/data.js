const productosCatalogo = [
    {
        id: 1,
        nombre: "Alfa Romeo 158 | Alfeta",
        precio: 15000,
        img: "./data/img/Alfa-Romeo-158-scaled.webp",
    },
    {
        id: 2,
        nombre: "Maserati 250F",
        precio: 19000,
        img: "./data/img/Maserati-240f-escala.webp",
    },
    {
        id: 3,
        nombre: "Mercedes Benz W 196 R",
        precio: 17600,
        img: "./data/img/Mercedes-benz-W196r-escala.jpg",
    },
    {
        id: 4,
        nombre: "Lotus 25",
        precio: 16500,
        img: "./data/img/Lotus-25-escala.jpg",
    },
    {
        id: 5,
        nombre: "Lotus 49",
        precio: 18000,
        img: "./data/img/lotus-49-escala.jpg",
    },
    {
        id: 6,
        nombre: "Lotus 72d",
        precio: 18500,
        img: "./data/img/Lotus-72d-escala.jpg",
    },
    {
        id: 7,
        nombre: "Ferrari 312T",
        precio: 21000,
        img: "./data/img/Ferrari-312T-escala.webp",
    },
    {
        id: 8,
        nombre: "Lotus 79",
        precio: 19500,
        img: "./data/img/Lotus-79-escala.jpg",
    },
    {
        id: 9,
        nombre: "McLaren MP4/4",
        precio: 23000,
        img: "./data/img/McLaren-mp4-4-escala.jpg",
    },
    {
        id: 10,
        nombre: "Williams FW14B",
        precio: 20500,
        img: "./data/img/William-fw14b-escala.jpg",
    },
    {
        id: 11,
        nombre: "Ferrari F2004",
        precio: 22000,
        img: "./data/img/Ferrari-f2004-escala.webp",
    },
    {
        id: 12,
        nombre: "Brawn GP 001",
        precio: 17000,
        img: "./data/img/Brawn-BGP001-escala.png",
    },
    {
        id: 13,
        nombre: "Red Bull RB7",
        precio: 19800,
        img: "./data/img/RedBull-rb7-escala.jpg",
    },
    {
        id: 14,
        nombre: "Mercedes W11",
        precio: 21500,
        img: "./data/img/Mercedes-benz-w11-escala.jpg",
    },
    {
        id: 15,
        nombre: "Red Bull RB19",
        precio: 24000,
        img: "./data/img/RedBull-rb19-escala.jpg",
    },
];

const catalogo = productosCatalogo
    .map(
        (producto) => `
                    <article>
                        <img
                            src=${producto.img}
                            alt=${producto.nombre}
                        />
                        <h2>${producto.nombre}</h2>
                        <h3>$${producto.precio.toLocaleString("es-ar")}</h3>
                        <button class="btn-outline">Favorito</button>
                        <button class="btn-fill">Agregar</button>
                    </article>
    `,
    )
    .join("");

document.querySelector(".contenedor-catalogo").innerHTML = catalogo;
