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
    const timeSlots = document.querySelectorAll('.time-slot');
    const scheduleData = [];

    timeSlots.forEach(slot => {
        const timeInputs = slot.querySelectorAll('input[type="time"]');
        const activityInput = slot.querySelector('input[type="text"]').value;
        const typeSelect = slot.querySelector('select').value;

        scheduleData.push({
            time: `${timeInputs[0].value} - ${timeInputs[1].value}`,
            activity: activityInput,
            type: typeSelect
        });
    });

    // Enviar datos al servidor PHP
    fetch('http://localhost/organizador/save_schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ day: 'monday', schedule: scheduleData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = '../zenith-optimize.html';
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
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