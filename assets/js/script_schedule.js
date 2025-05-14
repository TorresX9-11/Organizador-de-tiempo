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
    document.getElementById('save-draft').addEventListener('click', saveToLocalStorage);
    window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

});
// Funciones para agregar y eliminar filas en la tabla de horarios
function addRow() {
    const tableBody = document.getElementById('schedule-body');
    const row = document.createElement('tr');

    // Celda para hora con inputs de tipo "time"
    const timeCell = document.createElement('td');
    const startTime = document.createElement('input');
    startTime.type = 'time';
    const endTime = document.createElement('input');
    endTime.type = 'time';

    timeCell.appendChild(startTime);
    timeCell.appendChild(document.createTextNode(' a '));
    timeCell.appendChild(endTime);
    row.appendChild(timeCell);

    // Celdas para los días de la semana
    for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        cell.appendChild(input);
        row.appendChild(cell);
    }

    // Botón de eliminar fila
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.onclick = () => row.remove();
    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
}


function clearSchedule() {
    const tableBody = document.getElementById('schedule-body');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });
    });
}
function saveToLocalStorage() {
    const schedule = [];
    const rows = document.querySelectorAll('#schedule-body tr');

    rows.forEach(row => {
        const time = row.children[0].querySelector('input').value;
        const days = [];
        for (let i = 1; i <= 7; i++) {
            const input = row.children[i].querySelector('input');
            days.push(input.value);
        }
        schedule.push({ time, days });
    });

    localStorage.setItem('weeklySchedule', JSON.stringify(schedule));
    alert('Horario guardado localmente.');
}
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('weeklySchedule'));
    if (!data) return;

    const tableBody = document.getElementById('schedule-body');
    tableBody.innerHTML = ''; // Limpiar

    data.forEach(slot => {
        const row = document.createElement('tr');

        const timeCell = document.createElement('td');
        const timeInput = document.createElement('input');
        timeInput.type = 'text';
        timeInput.value = slot.time;
        timeCell.appendChild(timeInput);
        row.appendChild(timeCell);

        slot.days.forEach(value => {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            cell.appendChild(input);
            row.appendChild(cell);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.onclick = () => row.remove();
        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}
