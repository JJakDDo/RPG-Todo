export class ToDoView {
  constructor() {
    this.initTodoView();
    this.btnAddTodo = document.getElementById("btnAddTodo");
    this.inputAddTodo = document.getElementById("inputAddTodo");
    this.todoList = document.getElementById("todoList");
  }

  render(todos) {
    console.log(todos);
    this.clearList();
    todos.forEach((item) => {
      this.todoList.innerHTML += this.getTodoTemplate(item);
    });
    this.inputAddTodo.value = "";
  }

  renderAddedTodo(todo) {
    this.todoList.innerHTML += this.getTodoTemplate(todo);
    this.inputAddTodo.value = "";
  }

  initTodoView() {
    this.listDiv = document.getElementById("list");
    this.listDiv.innerHTML = `
    <div id="toDoContainer">
      <div id="inputTodo">
        <input id="inputAddTodo" type="text" />
        <button id="btnAddTodo">추가</button>
      </div>
      <ul id="todoList"></ul>
    </div>`;
  }

  getTodoTemplate(item) {
    return `
        <li id=${item._id}>
            <span class="todoText">${item.todo}</span>
            <button class="btnCompleteTodo">완료</button>
            <button class="btnDeleteTodo">포기</button>
        </li>
        `;
  }

  clearList() {
    this.todoList.innerHTML = "";
  }

  addTodoHandler(handler) {
    this.btnAddTodo.addEventListener("click", (event) => {
      event.preventDefault;
      if (this.inputAddTodo.value) {
        handler(this.inputAddTodo.value);
      }
    });
    // this.inputAddTodo.addEventListener("keyup", (event) => {
    //   if (event.keyCode == 13) {
    //     event.preventDefault;
    //     if (this.inputAddTodo.value) {
    //       handler(this.inputAddTodo.value);
    //     }
    //   }
    // });
  }

  deleteTodoHandler(handler) {
    this.todoList.addEventListener("click", (event) => {
      event.preventDefault;
      const target = event.target;
      if (target.classList[0] === "btnDeleteTodo") {
        handler(target.parentNode.id);
        this.todoList.removeChild(target.parentNode);
      }
    });
  }

  completeTodoHandler(handler) {
    this.todoList.addEventListener("click", (event) => {
      event.preventDefault;
      const target = event.target;
      if (target.classList[0] === "btnCompleteTodo") {
        handler(target.parentNode.id);
        this.todoList.removeChild(target.parentNode);
      }
    });
  }
}
