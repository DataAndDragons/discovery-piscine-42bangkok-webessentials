
$(document).ready(function() {


    const ftList = $('#ft_list'); 
    let todoList = []; 




    $('#new-btn').on('click', function() {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== "") {
            addToDo(todoText.trim());
        }
    });

  
    ftList.on('click', '.todo-item', function() {
    
        const clickedItem = $(this);
        const text = clickedItem.text();
        const index = clickedItem.data('index'); // Get the index we stored on the element.

        if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
            removeToDo(index);
        }
    });

    function addToDo(text) {
        todoList.unshift(text);
        saveToDos();
        renderList();
    }

    function removeToDo(index) {
      
        todoList = todoList.filter((item, i) => i !== index);
        saveToDos();
        renderList();
    }

    function renderList() {
        ftList.empty(); 

        $.each(todoList, function(index, text) {
            $('<div/>')
                .addClass('todo-item') 
                .text(text)            
                .data('index', index)  
                .appendTo(ftList);     
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

    loadToDos();
});

