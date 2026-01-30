//Hämta och visa alla todo's. Använder webbläsarens inbyggda fetch()-funktion för att anropa backend-API:et.
//Här först skickas en generell förfrågan där 'metod' utelämnas och i dessa fall tolkar webbläsaren det som en GET-förfrågan.
async function fetchTodos() {
    const response = await fetch('/todos'); //Sätter response till svaret från servern (i detta fall en lista med todo's i JSON-format)
    const todos = await response.json(); //Konverterar JSON-svaret till ett JavaScript-objekt (i detta fall en array med todo-objekt)
    const todoList = document.getElementById('todoList'); //Hämtar referens till ul-elementet där todo's ska visas.
    
    //Rensa ul-elementet i index.html. I detta fall innebär det inte någon säkerheetsrisk att använda innerHTML då innehållet kommer från servern.
    todoList.innerHTML = '';

    //Loop som går igenom varje todo i Javascript-objektet 'todoList' och skapar motsvarande HTML-element för att visa dem på sidan.
    //Sätter även klassnamn på elementen för att möjliggöra CSS-styling.
    todos.forEach(todo => {
        //skapa list-item element
        const li = document.createElement('li');
        li.classList.add('todo-item');

        //skapa checkbox för växling av klar/oklar samt händelsehanterare som vid aktivering anropar funktionen toggleTodo med todo's id
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.classList.add('todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(todo._id));

        //skapa span element för textinnehållet i todo'n
        const span = document.createElement('span');
        span.textContent = todo.task;
        span.classList.add('todo-text');
        
        //Om todo'n är markerad som klar, lägg till genomstrykning
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }

        //Skapa knapp-element för radering av todo'n samt händelsehanterare som vid aktivering anropar funktionen deleteTodo med todo's id
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo._id));
        
        //Lägg till checkbox, span och delete-knapp i list-item elementet och ordningen avgörs här. Så att checkbox kommer först, sedan texten och sist delete-knappen.
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        //Lägg till list-item elementet i ul-elementet i index.html.
        todoList.appendChild(li);        
    });
}

//Funktion för att lägga till en ny todo. Anropar backend-API:et med en POST-förfrågan och skickar med den nya todo'n i request body som JSON.
async function addTodo() {
    const todoInput = document.getElementById('todoInput');//hämtar referens till input-fältet där användaren skriver in den nya todo'n
    const newTodo = todoInput.value.trim();//hämtar värdet från input-fältet och tar bort eventuella blanksteg i början och slutet.
    //If sats som säkerställer att en tom todo inte skickas till servern. Egentligen onödig då input-fältet i index.html har 'required' attributet som förhindrar tomma inmatningar.
    if (newTodo) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTodo }),
        }); //Skickar en POST-förfrågan till /todos ändpunkten. Via header Content-Type anges att request body är i JSON-format. I body skickas den nya todo'n som ett JSON-objekt.

        //If sats som kontrollerar om svaret från servern är ok (statuskod 200-299). Om så är fallet rensas input-fältet och fetchTodos anropas för att uppdatera listan med todo's. Om inte visas en alert med felmeddelande.
        if (response.ok) {
            todoInput.value = '';
            fetchTodos();
        }
        else {
            alert('Failed to add todo')
        }
    }
}

//Funktion för att radera en todo. Anropar backend-API:et med en DELETE-förfrågan till /todos/:id ändpunkten. Via fetchTodos uppdateras listan efter radering.
async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });

    fetchTodos();
}

//Funktion för att växla en todo's 'completed' status. Anropar backend-API:et med en PATCH-förfrågan till /todos/:id ändpunkten. Via fetchTodos uppdateras listan efter växling.
async function toggleTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'PATCH'
    });

    fetchTodos();
}

//
document.getElementById('todoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Load todos on page load
fetchTodos();
