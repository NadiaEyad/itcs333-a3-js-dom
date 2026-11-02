(() =>{
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const errorMsg = document.getElementById('error-msg');
const counter = document.getElementById('counter');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const taskText = input.value.trim();

    if(taskText === ''){
        errorMsg.classList.remove('hidden');
        return;
    }

    errorMsg.classList.add('hidden');

    const item = document.createElement('li');
    const taskSpan = document.createElement('span');

    taskSpan.className = 'item-text';
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';

    item.appendChild(taskSpan);
    item.appendChild(deleteButton);
    list.appendChild(item);
    filterTasks(currentFilter);
    updateCounter();
    
    input.value = '';

});


list.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn'))
        list.removeChild(event.target.parentNode);
    else if(event.target.classList.contains('item-text'))
        event.target.parentNode.classList.toggle('completed');

    filterTasks(currentFilter);
    updateCounter();
});


let currentFilter = 'all';
function filterTasks(filter) {

    const items = list.querySelectorAll('li');

    items.forEach(function (item){
        const isCompleted = item.classList.contains('completed');

        if(filter === 'all')
            item.style.display = '';
        else if(filter === 'active'){
            if(isCompleted)
                item.style.display = 'none';
            else
                item.style.display = '';
        }//else if
        else if (filter === 'done'){
            if(isCompleted)
                item.style.display = '';
            else
                item.style.display = 'none';
        }//else if
    })
}// function


document.getElementById('filter-all').addEventListener('click', function(){
    currentFilter = 'all';
    filterTasks(currentFilter);
});

document.getElementById('filter-active').addEventListener('click', function(){
    currentFilter = 'active';
    filterTasks(currentFilter);
});

document.getElementById('filter-done').addEventListener('click', function(){
    currentFilter = 'done';
    filterTasks(currentFilter);
});


function updateCounter(){
    const items = list.querySelectorAll('li');
    let remaining = 0;

    for(let item of items){
        if(!item.classList.contains('completed'))
            remaining++;
    }

    if(remaining === 1)
        counter.textContent = remaining + ' item left';
    else
        counter.textContent = remaining + ' items left';
}

updateCounter();

})();
