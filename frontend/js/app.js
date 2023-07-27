const getTasks = async function(){
    const request = await fetch('http://localhost:8000/api/tasks');
    const tasks = await request.json();

    return tasks;
}

const getCategories = async function(){
    const request = await fetch('http://localhost:8000/api/categories');
    const categories = await request.json();
  
    return categories;
};

const deleteTask = async function(id){
    // faire la requête DELETE vers notre API
    await fetch('http://localhost:8000/api/tasks/' + id, {
        "method": "DELETE"
    });
};

const deleteTaskElement = function(taskElement){
    // supprimer l'élément du DOM
    taskElement.remove();
}

const showModal = function () {
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.classList.add('show');
};

const hideModal = function () {
const modalDialog = document.querySelector('.modal-dialog');
modalDialog.classList.remove('show');
};

const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const newTaskElement = document.createElement('li');
    newTaskElement.setAttribute('data-id', task.id);

    const textElement = document.createElement('p');
    textElement.textContent = task.title;
    newTaskElement.append(textElement);

    const categoryElement = document.createElement('em');
    categoryElement.textContent = task.category.name;
    newTaskElement.append(categoryElement);;
    
    const deleteBtnElement = document.createElement('div');
    deleteBtnElement.addEventListener('click', function(){
        if(confirm('Zetes sur de supprimer la tâche ?')){
            deleteTask(task.id).then(() => {
                deleteTaskElement(newTaskElement);
            }).catch(() => {
                alert('La requête de suppression a echoué !');
            });
        }
    });

    deleteBtnElement.classList.add('delete');
    newTaskElement.append(deleteBtnElement);

    const editBtnElement = document.createElement('div');
    editBtnElement.classList.add('edit');
    newTaskElement.append(editBtnElement);

    taskList.append(newTaskElement);
};

// Ajouter un écouteur d'événements click sur le bouton
const newTaskButton = document.querySelector('.create-task-container button')
newTaskButton.addEventListener('click', showModal);

// Ajouter un écouteur d'événements submit sur le formulaire
const taskForm = document.querySelector('.modal-dialog form');
taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const taskTitle = document.getElementById('task-title').value;
  const taskCategory = document.getElementById('task-category').value;
  addNewTask(taskTitle, taskCategory);
});

const addNewTask = async function(title, category){
    // Envoyer une requête POST à l'API pour ajouter une nouvelle tâche
    return fetch('http://localhost:8000/api/tasks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: title,
        category: category
    })
})
.then((response) => {
    return response.json();
})
.then((newTask) => {
    createTaskElement(newTask); // Afficher la nouvelle tâche dans le DOM
    hideModal(); // Masquer la modale après avoir ajouté la tâche
  })
  .catch((error) => {
    alert('Échec de l\'ajout de la nouvelle tâche. Veuillez réessayer.');
  });
}


/*const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const taskExampleElement = document.querySelector('#task-example');
    const newTaskElement = taskExampleElement.cloneNode(true);
    newTaskElement.style.visibility = 'visible';
    newTaskElement.removeAttribute('id');

    taskExampleElement.style.visibility = 'hidden';

    newTaskElement.setAttribute('data-id', task.id);
    newTaskElement.querySelector('p').textContent = task.title;

    taskList.append(newTaskElement);
};*/

// Fonction pour le chargement initial des tâches
const loadTasks = function(){
    getTasks().then((tasks) => {
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }).catch(() => {
        console.log('Erreur de requête');
    });
};

// Chargement initial des tâches
window.addEventListener('DOMContentLoaded', loadTasks);