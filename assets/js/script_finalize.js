// JavaScript para el menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// // Cambiar vista del calendario
// const viewButtons = document.querySelectorAll('.calendar-view-btn');
// viewButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         // Quitar clase activa de todos los botones
//         viewButtons.forEach(btn => btn.classList.remove('active'));
//         // Añadir clase activa al botón seleccionado
//         button.classList.add('active');
        
//         // Aquí se cambiaría la vista del calendario (semana/día)
//         const view = button.dataset.view;
//         console.log(`Vista cambiada a: ${view}`);
        
//         // En una implementación real, cambiaríamos la vista del calendario
//         if (view === 'day') {
//             alert('Cambiando a vista diaria...');
//             // Aquí se