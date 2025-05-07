// Script para manejar el menú hamburguesa en dispositivos móviles
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle de menú móvil
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });

    // Animaciones para los miembros del equipo
    const teamMembers = document.querySelectorAll('.team-member');

    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para manejar la animación de entrada
    function handleScrollAnimation() {
        teamMembers.forEach(member => {
            if (isInViewport(member)) {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar estilos para la animación
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Evento de scroll para activar animaciones
    window.addEventListener('scroll', handleScrollAnimation);

    // Llamar una vez para elementos ya visibles al cargar
    handleScrollAnimation();
});