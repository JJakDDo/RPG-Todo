export class ToDoView {
  constructor() {
    this.initTodoView();
    this.btnAddTodo = document.getElementById("btnAddTodo");
    this.inputAddTodo = document.getElementById("inputAddTodo");
    this.todoList = document.getElementById("todoList");
    this.btnShowAddToDo = document.getElementById("btnShowAddToDo");
    this.inputToDo = document.getElementById("inputTodo");
    console.log(this.inputToDo);
    this.inputToDo.classList.add("hide");
    this.showAddToDoInput = document.getElementById("showAddToDoInput");

    this.addShowAddToDoHandler();

    // body 영역을 클릭하면 inputToDo 요소가 사라지고 btnShowAddToDo가 다시 나타남
    this.body = document.body;
    this.body.addEventListener("click", (event) => {
      event.preventDefault;
      const target = event.target;
      if (target === this.btnShowAddToDo) return;
      if (target === this.inputAddTodo) {
        return;
      }

      this.inputToDo.classList.add("hide");
      this.showAddToDoInput.classList.remove("hide");
    });
  }

  /*
    투두 목록들을 브라우저에 출력하기
    todos 투두 배열
  */
  render(todos) {
    //먼저 DOM에 존재하는 리스트를 삭제한다.
    this.clearList();
    //배열을 돌면서 각 투두를 DOM에 추가한다.
    todos.forEach((item) => {
      this.todoList.innerHTML += this.getTodoTemplate(item);
    });
    this.inputAddTodo.value = "";
  }

  renderModal() {
    this.body.innerHTML = `
      <div id="modalOverlay">
        <div id="modal">
          <p>할 일</p>
          <p>상세내용</p>
          <p>마감일</p>
          <button>수정</button>
        </div>
      </div>
    `;
  }

  // 새롭게 추가되는 투두만 목록의 마지막에 출력한다.
  renderAddedTodo(todo) {
    this.todoList.innerHTML += this.getTodoTemplate(todo);
    this.inputAddTodo.value = "";
  }

  initTodoView() {
    this.listDiv = document.getElementById("list");
    this.listDiv.innerHTML = `
    <div id="toDoContainer">
      <p>할 일</p>
      <ul id="todoList"></ul>
      <div id="inputTodo">
        <input id="inputAddTodo" type="text"/>
        <button id="btnAddTodo">추가</button>
      </div>
      <div id="showAddToDoInput">
        <button id="btnShowAddToDo">+ 할 일 추가</button>
      </div>
    </div>`;
  }

  getTodoTemplate(item) {
    return `
        <li id=${item._id}>
          <div id="todoContainer">
            <div id="todoInfoContainer">
              <span class="todoText">${item.todo}</span>
              <span class="expText">+${item.exp} exp</span>
            </div>
            <span class="deadlineText">오늘</span>
          </div>
            <button class="btnCompleteTodo">완료</button>
            <button class="btnDeleteTodo">포기</button>
        </li>
        `;
  }

  clearList() {
    this.todoList.innerHTML = "";
  }

  // 투두 추가 버튼의 클릭 이벤트 핸들러를 만들어준다.
  addTodoHandler(handler) {
    this.btnAddTodo.addEventListener("click", (event) => {
      event.preventDefault;
      if (this.inputAddTodo.value) {
        handler(this.inputAddTodo.value);
      }
    });
  }

  // 투두 삭제 버튼의 클릭 이벤트 핸들러를 만들어준다.
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

  // 투두 완료 버튼의 클릭 이벤트 핸들러를 만들어준다.
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

  addShowAddToDoHandler() {
    this.btnShowAddToDo.addEventListener("click", (event) => {
      event.preventDefault;
      this.inputToDo.classList.remove("hide");
      this.showAddToDoInput.classList.add("hide");
    });
  }
}
