const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, insira uma tarefa!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span class="task-content">${taskText}</span>
        <button class="complete">Concluir</button>
        <button class="delete">Excluir</button>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = '';

    const completeButton = taskItem.querySelector('.complete');
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        showNotification();
    });


    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });
}

function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
