const primaryNav = document.querySelector(".primary-navigation");
const menuBtn = document.querySelector(".menu-btn");

const cartNav = document.querySelector(".cart-navigation");
const cartBtn = document.querySelector(".carrito-btn");

const favoritosNav = document.querySelector(".favoritos-navigation");
const favoritoBtn = document.querySelector(".favoritos-btn");
const closeAll = document.querySelector(".fantasma");

/* Agrupo los btns y paneles */
const todosLosPaneles = [primaryNav, cartNav, favoritosNav];
const todosLosBtn = [menuBtn, cartBtn, favoritoBtn];

/* funcion para resetear y evitar errores en los btn */
/* quita la clase auxiliar que los oculta cuando el otro esta activo */
const resetButtons = () => {
    todosLosBtn.forEach((btn) => btn.classList.remove("ocultar"));
};

/* Funcion que muestra el panel segun el btn que se activa */
const mostrarPanel = (elementoNav, activeBtn) => {
    const isVisble = elementoNav.getAttribute("data-visible") === "true";

    elementoNav.setAttribute("data-visible", !isVisble);
    activeBtn.setAttribute("aria-expanded", !isVisble);

    if (!isVisble) {
        todosLosBtn.forEach((btn) => {
            if (btn !== activeBtn) {
                btn.classList.add("ocultar");
            }
        });
        closeAll.classList.add("activo");
        document.body.classList.toggle("no-scroll");
    } else {
        resetButtons();
        closeAll.classList.remove("activo");
        document.body.classList.remove("no-scroll");
    }
};

const cerrarTodo = () => {
    todosLosPaneles.forEach((panel) =>
        panel.setAttribute("data-visible", false),
    );
    todosLosBtn.forEach((btn) => btn.setAttribute("aria-expanded", false));

    closeAll.classList.remove("activo");
    document.body.classList.remove("no-scroll");
    resetButtons();
};

menuBtn.addEventListener("click", () => mostrarPanel(primaryNav, menuBtn));
cartBtn.addEventListener("click", () => mostrarPanel(cartNav, cartBtn));
favoritoBtn.addEventListener("click", () =>
    mostrarPanel(favoritosNav, favoritoBtn),
);

closeAll.addEventListener("click", cerrarTodo);
