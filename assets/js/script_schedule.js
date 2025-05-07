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

// Selector de día
const dayButtons = document.querySelectorAll('.day-btn');
dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Quitar clase activa de todos los botones
        dayButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase activa al botón seleccionado
        button.classList.add('active');

        // Aquí se cambiarían los horarios mostrados según el día
        // (Simulado - en una implementación completa cargaría los slots del día seleccionado)
        console.log(`Día seleccionado: ${button.dataset.day}`);
    });
});

// Añadir nueva franja horaria
document.getElementById('add-time-slot').addEventListener('click', () => {
    const timeSlots = document.querySelector('#monday-slots');
    const newSlot = document.createElement('div');
    newSlot.className = 'time-slot';
    newSlot.innerHTML = `
        <div class="time">
            <input type="time" value="14:00"> - 
            <input type="time" value="15:30">
        </div>
        <div class="slot-input">
            <input type="text" placeholder="Nombre de la actividad o clase">
            <select>
                <option value="class">Clase</option>
                <option value="study">Estudio</option>
                <option value="work">Trabajo</option>
                <option value="personal">Personal</option>
            </select>
        </div>
    `;
    timeSlots.appendChild(newSlot);
});

// Continuar al paso 2
document.getElementById('continue-btn').addEventListener('click', () => {
    // Guardar los datos del horario en localStorage o enviarlos al servidor
    // Esto es simulado - en una implementación real procesaríamos los datos ingresados

    // Guardar datos en localStorage (simulación)
    const scheduleData = {
        monday: [
            { time: "8:00 - 9:30", activity: "Matemáticas", type: "class" },
            { time: "9:45 - 11:15", activity: "Física", type: "class" },
            { time: "11:30 - 13:00", activity: "Estudio libre", type: "study" }
        ]
        // Aquí se agregarían los datos de los demás días
    };

    localStorage.setItem('zenithSchedule', JSON.stringify(scheduleData));

    // Redireccionar al siguiente paso
    window.location.href = '../zenith-optimize.html';
});

// Guardar borrador
document.getElementById('save-draft').addEventListener('click', () => {
    alert('¡Borrador guardado con éxito!');
});

// Integraciones con asistente de IA (simulado)
document.getElementById('ai-import').addEventListener('click', () => {
    alert('Esta funcionalidad conectaría con la API de Gemini para procesar un archivo de horario.');
    // Aquí se implementaría la conexión con la API de Gemini
});

document.getElementById('ai-help').addEventListener('click', () => {
    alert('El asistente IA te guiará en la configuración manual de tu horario.');
    // Aquí se implementaría la experiencia guiada con la API de Gemini
});