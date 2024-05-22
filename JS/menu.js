document.addEventListener('DOMContentLoaded', function() {
    const menuBars = document.getElementById('menu-bars');
    const verticalMenu = document.getElementById('vertical-menu');
    
    menuBars.addEventListener('click', function() {
        verticalMenu.classList.toggle('active');
    });
});