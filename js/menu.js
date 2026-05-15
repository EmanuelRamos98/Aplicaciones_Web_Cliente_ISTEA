const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menu-btn");
const cartNav = document.querySelector(".cart-navigation");
const cartToggle = document.querySelector(".carrito-btn");
const closeAll = document.querySelector(".fantasma");

/* funcion para resetear y evitar errores en los btn */
/* quita la clase auxiliar que los oculta cuando el otro esta activo */
const resetButtons = () => {
    navToggle.classList.remove("ocultar");
    cartToggle.classList.remove("ocultar");
};

navToggle.addEventListener("click", () => {
    const isVisible = primaryNav.getAttribute("data-visible") === "true";

    primaryNav.setAttribute("data-visible", !isVisible);
    navToggle.setAttribute("aria-expanded", !isVisible);

    if (!isVisible) {
        cartToggle.classList.add("ocultar");
        closeAll.classList.add("activo"); /* activo el "fantasma" */
    } else {
        resetButtons();
        closeAll.classList.remove("activo");
    }
});

cartToggle.addEventListener("click", () => {
    const isVisible = cartNav.getAttribute("data-visible") === "true";

    cartNav.setAttribute("data-visible", !isVisible);
    cartToggle.setAttribute("aria-expanded", !isVisible);

    if (!isVisible) {
        navToggle.classList.add("ocultar");
        closeAll.classList.add("activo");
    } else {
        resetButtons();
        closeAll.classList.remove("activo");
    }
});

closeAll.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");

    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);

    cartNav.setAttribute("data-visible", false);
    cartToggle.setAttribute("aria-expanded", false);

    closeAll.classList.remove("activo");
    resetButtons();
});
