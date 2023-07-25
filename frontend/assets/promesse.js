fetch("http://127.0.0.1:8000/api/tasks")
    .then(response => {
        return response.json();
    })
    .then(tasks => {
        return tasks;
    })
    .then(tasks => {

        document.querySelector(".tasklist").textContent = "";

        for (const task of tasks) {
            const elementToAdd = document.createElement('li');

            elementToAdd.textContent = task.title;

            const taskListElement = document.querySelector('.tasklist');

            taskListElement.append(elementToAdd);
        }
    })

const taskIdToDelete = '3';
const taskListElement = document.querySelector('.tasklist');
const requestOptions = {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    }
};

fetch(`http://127.0.0.1:8000/api/tasks/${taskIdToDelete}`, requestOptions)
    .then(response => {
    if (!response.ok) {
        console.log("La suppression de la tâche a échoué.");
    }
    console.log('La tâche a été supprimée avec succès.');
    
    // Supprimer la tâche de la liste côté client
    const taskElementToDelete = document.querySelector(`[data-id="${taskIdToDelete}"]`);
    if (taskElementToDelete) {
      taskListElement.removeChild(taskElementToDelete);
    }

    })
    
    
/* async function getTask(){
    const response = await fetch("http://127.0.0.1:8000/api/tasks");
    const tasks = await response.json();

    console.log(tasks);
} */

/* console.log(document.querySelector(".tasklist")); */

/* let task = document.querySelector(".tasklist").textContent;
console.log(task); */


