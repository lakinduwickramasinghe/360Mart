const menuIcon = document.getElementById("menu-bars");
const mobileMenu = document.getElementById("mobile-menu");

menuIcon.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
});
