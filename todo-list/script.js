// DOM 요소 가져오기
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// 로컬 스토리지에서 할 일 가져오기
document.addEventListener('DOMContentLoaded', getTodos);

// 할 일 추가 버튼 클릭 시 이벤트 처리
addButton.addEventListener('click', addTodo);

// 할 일 추가 함수
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const todoItem = document.createElement('li');
  todoItem.innerHTML = `<span>${todoText}</span><button class="delete-btn">삭제</button>`;
  todoList.appendChild(todoItem);

  todoItem.querySelector('span').addEventListener('click', toggleComplete);
  todoItem.querySelector('.delete-btn').addEventListener('click', deleteTodo);
  saveLocalTodos(todoText);
  todoInput.value = '';
}

// 할 일 완료 토글 함수
function toggleComplete() {
  this.classList.toggle('completed');
}

// 할 일 삭제 함수
function deleteTodo(e) {
  const todoItem = e.target.parentElement;
  removeLocalTodos(todoItem.firstChild.textContent);
  todoItem.remove();
}

// 로컬 스토리지에 할 일 저장 함수
function saveLocalTodos(todo) {
  let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 로컬 스토리지에서 할 일 불러오기 함수
function getTodos() {
  let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `<span>${todo}</span><button class="delete-btn">삭제</button>`;
    todoItem.querySelector('span').addEventListener('click', toggleComplete);
    todoItem.querySelector('.delete-btn').addEventListener('click', deleteTodo);
    todoList.appendChild(todoItem);
  });
}

// 로컬 스토리지에서 할 일 삭제 함수
function removeLocalTodos(todo) {
  let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  todos = todos.filter(t => t !== todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
