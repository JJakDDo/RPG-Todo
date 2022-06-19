export class View {
  constructor(player) {
    this.initTodoView();

    this.btnAddTodo = document.getElementById("btnAddTodo");
    this.inputAddTodo = document.getElementById("inputAddTodo");
    this.todoList = document.getElementById("todoList");

    this.canvas = document.getElementById("playerCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 48;
    this.canvas.height = 96;

    this.player = player;
  }

  initTodoView() {
    this.main = document.getElementById("main");
    this.main.innerHTML = `<div id="playerInfo">
        <canvas id="playerCanvas"></canvas>
        <div id="levelInfo">
          <span id="lvl">lvl</span>
          <div id="expInfo">
            <div id="bar"></div>
            <div id="barTemp"></div>
          </div>
        </div>
      </div>
      <div id="inputTodo">
        <input id="inputAddTodo" type="text" />
        <button id="btnAddTodo">추가</button>
      </div>
      <div id="list">
        <ul id="todoList"></ul>
      </div>`;
  }

  render(todos) {
    this.clearList();
    todos.forEach((item) => {
      this.todoList.innerHTML += this.getTodoTemplate(item);
    });
    this.inputAddTodo.value = "";
  }

  renderPlayer(user) {
    const lvl = document.getElementById("lvl");
    const bar = document.getElementById("bar");
    const barTemp = document.getElementById("barTemp");

    lvl.innerText = `레벨 ${user.level} (${user.exp}/${user.requiredExp})`;
    bar.style.width = `${
      (user.exp / user.requiredExp) * barTemp.clientWidth
    }px`;
  }

  clearList() {
    this.todoList.innerHTML = "";
  }

  getTodoTemplate(item) {
    return `
        <li id=${item.id}>
            <span class="todoText">${item.todo}</span>
            <img class="monsterImg" src="src/${item.monster}.png"></img>
            <button class="btnCompleteTodo">완료</button>
            <button class="btnDeleteTodo">포기</button>
        </li>
        `;
  }

  addTodoHandler(handler) {
    this.btnAddTodo.addEventListener("click", (event) => {
      event.preventDefault;
      if (this.inputAddTodo.value) {
        handler(this.inputAddTodo.value);
      }
    });
    this.inputAddTodo.addEventListener("keyup", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault;
        if (this.inputAddTodo.value) {
          handler(this.inputAddTodo.value);
        }
      }
    });
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

  completeTodoHandler(handler, player) {
    this.todoList.addEventListener("click", (event) => {
      event.preventDefault;
      const target = event.target;
      if (target.classList[0] === "btnCompleteTodo") {
        handler(target.parentNode.id);
        this.todoList.removeChild(target.parentNode);
        this.renderPlayer(player);
      }
    });
  }

  draw() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx, t);
  }
}
