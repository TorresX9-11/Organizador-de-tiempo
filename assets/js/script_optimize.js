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

// Simulación del análisis de IA
document.getElementById('analyze-btn').addEventListener('click', () => {
    const loadingOverlay = document.getElementById('loading-overlay');

    // Mostrar overlay de carga
    loadingOverlay.style.display = 'flex';

    // Simulación del tiempo de procesamiento
    setTimeout(() => {
        loadingOverlay.style.display = 'none';

        // Aquí se conectaría con la API de Gemini para el análisis real
        alert('¡Análisis completo! Se han encontrado espacios óptimos para tu actividad.');
    }, 2000);
});

// Selección de espacios recomendados
document.querySelectorAll('.slot-card').forEach(card => {
    card.addEventListener('click', () => {
        const slotId = card.dataset.slot;

        // Simulación de selección (en una implementación real se marcaría en el calendario)
        alert(`Has seleccionado el espacio con ID ${slotId}. Esta actividad se añadirá a tu horario.`);

        // Marcar visual en el calendario
        document.getElementById(`slot-${slotId}`).classList.add('study');
        document.getElementById(`slot-${slotId}`).classList.remove('free');
        document.getElementById(`slot-${slotId}`).textContent = document.getElementById('activity-name').value || 'Nueva actividad';
    });
});

// Espacios libres clickeables
document.querySelectorAll('.calendar-cell.free').forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.add('study');
        cell.classList.remove('free');
        cell.textContent = document.getElementById('activity-name').value || 'Nueva actividad';
    });
});

// Continuar al paso 3
document.getElementById('continue-btn').addEventListener('click', () => {
    // Guardar los datos del horario optimizado en localStorage
    // Esto es simulado - en una implementación real procesaríamos los datos

    // Redireccionar al siguiente paso
    window.location.href = 'pag3/zenith-finalize.html';
});

// Cargar datos del paso anterior
// Esto es simulado - en una implementación real cargaríamos los datos de localStorage o de la API
window.addEventListener('DOMContentLoaded', () => {
    // Cargar horario desde localStorage si existe
    const savedSchedule = localStorage.getItem('zenithSchedule');
    if (savedSchedule) {
        console.log('Horario cargado:', JSON.parse(savedSchedule));
        // Actualizar la UI con el horario cargado
    }
});