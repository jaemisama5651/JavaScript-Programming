# todo-list
## 1. **프로젝트 개요**

- **프로젝트 이름:** todo-list

- **목적:** 사용자가 해야 할 일을 추가하고, 완료된 작업을 체크하거나 삭제할 수 있는 간단한 할 일 목록 앱. 새로고침 후에도 할 일 목록이 유지되도록 로컬 스토리지를 활용합니다.

- **기능:** 1.할 일 추가 2. 할 일 삭제 3. 할 일 완료 체크 4. 로컬 스토리지에 데이터 저장

## 2. **프로젝트 폴더 구성**

```
todo-list/
│
├── index.html           
├── style.css   
├── script.js   
└── README.md   
```

## 3. **프로젝트 개발의 주요 포인트**

### 1. **HTML 기본 구조**
   - 할 일 목록을 위한 `input` 필드와 추가 버튼, 목록을 담을 `ul` 태그가 필요합니다.

   - 각 요소에 `id`나 `class`를 지정해 DOM 조작 및 스타일링이 쉽게 되도록 설정합니다.

### 2. **CSS로 UI 스타일링**
   - 기본적인 레이아웃을 잡고, 흰색 배경과 검정색 텍스트 조합으로 깔끔한 모던 UI를 디자인합니다.

   - `box-shadow`를 사용해 각 요소에 깊이감을 부여하여 사용자 경험을 향상시킵니다.

### 3. **JavaScript로 DOM 조작**
   - 사용자가 입력한 할 일을 목록에 추가하거나 삭제할 수 있도록 DOM 요소를 동적으로 생성 및 삭제하는 방법을 익혀야 합니다.

   - `LocalStorage`를 이용해 할 일 데이터를 저장하고, 새로고침 후에도 목록을 유지하는 기능을 구현합니다.

### 4. **이벤트 처리**
   - 사용자가 할 일을 추가하는 버튼 클릭 시 이벤트를 처리합니다.

   - 각 할 일 항목의 완료 여부를 체크하거나 삭제하는 이벤트를 처리하여 동적인 사용자 인터랙션을 구현합니다.

---

## 4. **단계별 코드 작성**

### **1. HTML 작성**

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Todo List</h1>
    <div class="input-container">
      <input type="text" id="todo-input" placeholder="Enter a new task">
      <button id="add-button">Add</button>
    </div>
    <ul id="todo-list"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

---

### **2. CSS 스타일링**

`style.css`
```css
body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 70%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

li.completed {
  text-decoration: line-through;
  color: #888;
}

li button {
  background-color: red;
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

li button:hover {
  background-color: darkred;
}
```

---

### **3. 자바스크립트 작성**

`script.js`
```javascript
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
  todoItem.innerHTML = `
    <span>${todoText}</span>
    <button class="delete-btn">Delete</button>
  `;

  todoItem.addEventListener('click', toggleComplete);
  todoItem.querySelector('.delete-btn').addEventListener('click', deleteTodo);
  todoList.appendChild(todoItem);

  saveLocalTodos(todoText);
  todoInput.value = '';
}

// 할 일 완료 토글 함수
function toggleComplete(e) {
  e.target.classList.toggle('completed');
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
    todoItem.innerHTML = `
      <span>${todo}</span>
      <button class="delete-btn">Delete</button>
    `;
    todoItem.addEventListener('click', toggleComplete);
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
```



