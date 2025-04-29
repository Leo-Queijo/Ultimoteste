let consultations = [];
let selectedDay = '';
let selectedCell = null;

function saveConsultations() {
    localStorage.setItem('consultations', JSON.stringify(consultations));
}

function loadConsultations() {
    const saved = localStorage.getItem('consultations');
    if (saved) {
        consultations = JSON.parse(saved);
        renderConsultations();
    }
}

function renderConsultations() {
    const reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = '';
    consultations.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `${c.day} - ${c.doctor} às ${c.time}`;
        li.classList.add('alert', 'alert-success');
        reminderList.appendChild(li);

        const dayCell = [...document.querySelectorAll('.calendar td')].find(td => td.innerText === c.day);
        if (dayCell) {
            dayCell.classList.add('green');
        }
    });
}

document.querySelectorAll(".calendar td").forEach(td => {
    td.addEventListener("dblclick", () => {
        const modal = new bootstrap.Modal(document.getElementById('consultationModal'));
        modal.show();

        selectedDay = td.innerText;
        selectedCell = td;

        const existing = consultations.find(c => c.day === selectedDay);
        document.getElementById("cancelButton").style.display = existing ? "block" : "none";
    });
});

document.getElementById('consultationForm').addEventListener("submit", function (e) {
    e.preventDefault();

    const doctor = document.getElementById('doctor').value;
    const time = document.getElementById('time').value;

    if (consultations.some(c => c.day === selectedDay)) {
        alert('Já existe uma consulta marcada para este dia!');
        bootstrap.Modal.getInstance(document.getElementById('consultationModal')).hide();
        return;
    }

    const consultation = { day: selectedDay, doctor, time };
    consultations.push(consultation);
    saveConsultations();

    const li = document.createElement('li');
    li.innerHTML = `${selectedDay} - ${doctor} às ${time}`;
    li.classList.add('alert', 'alert-success');
    document.getElementById('reminderList').appendChild(li);

    selectedCell.classList.add("green");
    bootstrap.Modal.getInstance(document.getElementById('consultationModal')).hide();
});

document.getElementById("cancelButton").addEventListener("click", () => {
    if (selectedCell) selectedCell.classList.remove("green");

    consultations = consultations.filter(c => c.day !== selectedDay);
    saveConsultations();

    const reminders = document.getElementById('reminderList').querySelectorAll('li');
    reminders.forEach(reminder => {
        if (reminder.innerText.includes(selectedDay)) {
            reminder.remove();
        }
    });

    bootstrap.Modal.getInstance(document.getElementById('consultationModal')).hide();
});

loadConsultations();
