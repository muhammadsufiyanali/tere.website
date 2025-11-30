const navbar = document.querySelector(".navbar2")
const btn = document.querySelector(".menu-btn")

btn.addEventListener("click", () => {
    navbar.classList.toggle("active")
})