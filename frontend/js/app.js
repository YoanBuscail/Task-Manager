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

const getTags = async function(){
    const request = await fetch('http://localhost:8000/api/tags');
    const tags = await request.json();

    return tags;
}

const deleteTask = async function(id){
    // faire la requête DELETE vers notre API
    await fetch('http://localhost:8000/api/tasks/' + id, {
        "method": "DELETE"
    });
};

const deleteTaskElement = function(taskElement){
    // supprimer l'élément du DOM
    taskElement.remove();
};

const editTask = async function(id, task_title){
    const response = await fetch('http://localhost:8000/api/tasks/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: task_title,
        })
    });

    const data = await response.json();

    // On retourne la tâche au niveau de la fonction
    return data.task;
};

const editTaskElement = async function(task){
    const editForm = document.querySelector('#edit-task-form');
    editForm.querySelector('#edit-task-id').value = task.id;
    editForm.querySelector('#edit-task-title').value = task.title;

    document.querySelector('#edit-task-form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
    
        const updatedTask = await editTask(data.get('id'), data.get('title'));
        updateTaskElement(updatedTask);
        toggleEditModal();
        
    })
};

const updateTaskElement = function(updatedTask) {
    const taskElement = document.querySelector(`li[data-id="${updatedTask.id}"]`);

    if (taskElement) {
        const textElement = taskElement.querySelector('p');
        textElement.textContent = updatedTask.title;
    }
}

const createTask = async function(task_title, task_category_id = null, task_tags = []){
    const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: task_title,
            category_id: task_category_id,
            tags: task_tags
        })
    });

    // On récupère la tâche qui vient d'être créée
    const data = await response.json();

    // On retourne la tâche au niveau de la fonction
    return data.task;
}

const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const newTaskElement = document.createElement('li');
    newTaskElement.setAttribute('data-id', task.id);

    const textElement = document.createElement('p');
    textElement.textContent = task.title;
    newTaskElement.append(textElement);

    if(task.tags){
        task.tags.forEach((tag) => {
            const tagElement = document.createElement('span');
            tagElement.textContent = tag.name;
    
            textElement.append(tagElement);
        });
    }
    
    if(task.category){
        const categoryElement = document.createElement('em');
        categoryElement.textContent = task.category.name;
        newTaskElement.append(categoryElement);
    }
    
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
    editBtnElement.addEventListener('click', function(){
        editTaskElement(task);
        toggleEditModal();
    });
    editBtnElement.classList.add('edit');
    newTaskElement.append(editBtnElement);

    // Affiche le success message
    const successMessage = document.querySelector('.message.success');
    successMessage.style.display = 'block';

    // Cache le success message après un délai
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);

    taskList.append(newTaskElement);
};

const toggleModal = function () {
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.classList.toggle('show');
};

const toggleEditModal = function () {
    const modalDialog = document.querySelector('.edit-modal-dialog');
    modalDialog.classList.toggle('show');
};

window.addEventListener('DOMContentLoaded', function(){
    getTasks().then((tasks) => {
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }).catch(() => {
        console.log('Erreur de requête');
    });

    document.querySelector('#create-task-btn').addEventListener('click', () => {
        toggleModal();
    });

    document.querySelector('.close-modal-btn').addEventListener('click', () => {
        toggleModal();
    });

    document.querySelector('#task-create-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

         // Je stock la nouvelle tâche dans une constante
         createTask(data.get('title'), data.get('category_id'), data.getAll('tags[]')).then((task) => {
            // Je viens créer un nouvel élément au niveau du DOM pour afficher la tâche
            createTaskElement(task);

            // Je vide le champ avant de fermer la modal
            document.querySelector('#task-title').value = "";

            // Je ferme la modal (le formulaire de création d'une tâche) après la création
            toggleModal();

            
        }).catch(() => {
            alert('La requête a echoué !');
        });
    })

    getCategories().then((categories) => {
        categories.forEach((category) => {
            //Insérer au niveau du "select" mes catégories
            const select = document.querySelector('#task-category');

            const newOption = document.createElement('option');
            newOption.setAttribute('value', category.id);
            newOption.textContent = category.name;

            select.append(newOption);
        });
    }).catch(() => {
        console.log("Impossible de récupérer les catégories");
    });

    getTags().then((tags) => {
        tags.forEach((tag) => {
            const select = document.querySelector('#task-tags');
            const divElement = document.createElement("div");

            const inputElement = document.createElement("input");
            inputElement.setAttribute("type", "checkbox");
            inputElement.setAttribute("id", "tag-" + tag.id);
            inputElement.setAttribute("name", "tags[]");
            inputElement.setAttribute("value", tag.id);

            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", "tag-" + tag.id);
            labelElement.textContent = tag.name;

            divElement.append(inputElement);
            divElement.append(labelElement);
            
            document.querySelector('#task-tags').append(divElement);
        });
    }).catch(() => {
        console.log("Impossible de récupérer les tags");
    });

})