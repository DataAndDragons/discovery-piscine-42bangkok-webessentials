// This script contains all the logic for creating, deleting, and saving tasks.

// --- 1. SETUP: Get references to the HTML elements ---
const newButton = document.getElementById('new-btn');
const ftList = document.getElementById('ft_list');
let todoList = []; // This array will hold our to-do items as strings.

// --- 2. MAIN LOGIC: Event Listeners ---

// When the "New" button is clicked, ask for a new task.
newButton.addEventListener('click', function() {
    const todoText = prompt("Enter a new TO DO:");
    // Check if the user entered something and didn't click cancel.
    if (todoText && todoText.trim() !== "") {
        addToDo(todoText.trim());
    }
});

// When the page loads, load tasks from cookies.
window.onload = function() {
    loadToDos();
};

// --- 3. HELPER FUNCTIONS ---

/**
 * Adds a new to-do to the top of the list and saves the list to cookies.
 * @param {string} text - The text of the to-do item.
 */
function addToDo(text) {
    // unshift() adds the new item to the BEGINNING of the array.
    todoList.unshift(text);
    saveToDos();
    renderList();
}

/**
 * Removes a to-do from the list and saves the change.
 * @param {number} index - The index of the item to remove in the todoList array.
 */
function removeToDo(index) {
    // splice() removes items from an array.
    todoList.splice(index, 1);
    saveToDos();
    renderList();
}

/**
 * Clears the current list in the HTML and rebuilds it from our todoList array.
 * This function keeps the visual list perfectly in sync with our data.
 */
function renderList() {
    // Clear the existing list to prevent duplicates.
    ftList.innerHTML = '';
    // Loop through our array and create a div for each item.
    todoList.forEach((text, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.textContent = text;
        todoDiv.classList.add('todo-item'); // Add a class for styling.

        // Add a click listener to this new div for deletion.
        todoDiv.addEventListener('click', function() {
            if (confirm(`Do you want to remove this TO DO: "${text}"?`)) {
                removeToDo(index);
            }
        });
        
        // Add the new div to the top of the ft_list container.
        ftList.appendChild(todoDiv);
    });
}


// --- 4. COOKIE MANAGEMENT FUNCTIONS ---

/**
 * Saves the current todoList array into a cookie.
 */
function saveToDos() {
    // Cookies can only store strings, so we convert our array to a JSON string.
    const todoString = JSON.stringify(todoList);
    // Set a cookie that expires in 1 year.
    document.cookie = `todos=${encodeURIComponent(todoString)}; max-age=31536000; path=/`;
}

/**
 * Loads the to-do list from the cookie when the page opens.
 */
function loadToDos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));

    if (todoCookie) {
        // If the cookie exists, get its value, decode it, and parse it back into an array.
        const todoString = decodeURIComponent(todoCookie.split('=')[1]);
        todoList = JSON.parse(todoString);
        renderList();
    }
}

