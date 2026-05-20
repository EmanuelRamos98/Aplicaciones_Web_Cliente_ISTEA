const primaryNav = document.querySelector(".primary-navigation");
const menuBtn = document.querySelector(".menu-btn");
const cartNav = document.querySelector(".cart-navigation");
const cartBtn = document.querySelector(".carrito-btn");
const closeAll = document.querySelector(".fantasma");

/* funcion para resetear y evitar errores en los btn */
/* quita la clase auxiliar que los oculta cuando el otro esta activo */
const resetButtons = () => {
    menuBtn.classList.remove("ocultar");
    cartBtn.classList.remove("ocultar");
};

/* Funcion que muestra el panel segun el btn que se activa */
const mostrarPanel = (elementoNav, activeBtn, ocultaBtn) => {
    const isVisible = primaryNav.getAttribute("data-visible") === "true";

    elementoNav.setAttribute("data-visible", !isVisible);
    activeBtn.setAttribute("aria-expanded", !isVisible);

    if (!isVisible) {
        ocultaBtn.classList.add("ocultar");
        closeAll.classList.add("activo"); /* activo el "fantasma" */
    } else {
        resetButtons();
        closeAll.classList.remove("activo");
    }
};

const cerrarTodo = () => {
    primaryNav.setAttribute("data-visible", false);
    menuBtn.setAttribute("aria-expanded", false);

    cartNav.setAttribute("data-visible", false);
    cartBtn.setAttribute("aria-expanded", false);

    closeAll.classList.remove("activo");
    resetButtons();
};

menuBtn.addEventListener("click", () =>
    mostrarPanel(primaryNav, menuBtn, cartBtn),
);
cartBtn.addEventListener("click", () =>
    mostrarPanel(cartNav, cartBtn, menuBtn),
);
closeAll.addEventListener("click", cerrarTodo);
