// Selectors
const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
// if page is loadded, execute function
document.addEventListener('DOMContentLoaded', getTodos)
toDoButton.addEventListener('click', addToDo)
toDoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterToDo)

// Functions
function addToDo(event) {
  //preventing form from submitting
  event.preventDefault()
  // console.log('hello')
  const toDoDiv = document.createElement('div')
  toDoDiv.classList.add('todo')


  //create li
  const newToDo = document.createElement('li')
  newToDo.innerText = toDoInput.value
  newToDo.classList.add('todo-item')
  toDoDiv.appendChild(newToDo)

  // add to do to local storage
  saveLocalTodos(toDoInput.value)

  // check completed task button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-btn')
  toDoDiv.appendChild(completedButton)

  // trash task button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  toDoDiv.appendChild(trashButton)

  //append to todo-list
  toDoList.appendChild(toDoDiv)

  //clear todo input value
  toDoInput.value = ''
}

function deleteCheck(e) {
  // console.log(e.target)
  const item = e.target

  //delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement
    //animation
    todo.classList.add('fall')
    removeLocalToDos(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })

  } else {
    (item.classList[0] === 'complete-btn')
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }

  //check mark
  // if (item.classList[0] === 'complete-btn')
  // const todo = item.parentElement
  // todo.classList.toggle('completed')
}

function filterToDo(e) {
  // console.log(e)
  const todos = toDoList.childNodes
  // console.log(todos)

  // // console.log(todos)
  todos.forEach(function (todo) {
    // if (e.target.value === 'all'){
    //   todo.style.display = 'flex'
    // console.log(todo)
    // }

    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
    }
  })
}

// saving todos to local storage
function saveLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo')
    //create li
    const newToDo = document.createElement('li')
    newToDo.innerText = todo
    newToDo.classList.add('todo-item')
    toDoDiv.appendChild(newToDo)
    // check completed task button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    toDoDiv.appendChild(completedButton)
    // trash task button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    toDoDiv.appendChild(trashButton)
    //append to todo-list
    toDoList.appendChild(toDoDiv)
  })
}

//remove localStorage todos
function removeLocalToDos(todo){
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const toDoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(toDoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}