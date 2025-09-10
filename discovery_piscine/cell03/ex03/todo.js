const newButton = document.getElementById('new-btn');
const ftList = document.getElementById('ft_list');
let todoList = []; 


newButton.addEventListener('click', function() {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
        addToDo(todoText.trim());
    }
});


window.onload = function() {
    loadToDos();
};


function addToDo(text) {
    todoList.unshift(text);
    saveToDos();
    renderList();
}

function removeToDo(index) {

    todoList.splice(index, 1);
    saveToDos();
    renderList();
}


function renderList() {
  
    ftList.innerHTML = '';
    
    todoList.forEach((text, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.textContent = text;
        todoDiv.classList.add('todo-item'); 

       
        todoDiv.addEventListener('click', function() {
            if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
                removeToDo(index);
            }
        });

        ftList.appendChild(todoDiv);
    });
}



function saveToDos() {

    const todoString = JSON.stringify(todoList);

    document.cookie = `todos=${encodeURIComponent(todoString)}; max-age=31536000; path=/`;
}


function loadToDos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));

    if (todoCookie) {
       
        const todoString = decodeURIComponent(todoCookie.split('=')[1]);
        todoList = JSON.parse(todoString);
        renderList();
    }
}

