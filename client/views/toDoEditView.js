export class ToDoEditView {
  constructor() {
    //this.initModal();
    this.overlay = document.getElementById("modal_overlay");
    this.body = document.body;
    this.btnUpdate = document.getElementById("todo_update_button");
  }

  initModal() {
    this.main = document.getElementById("main");
    this.main.innerHTML += `    
      <div id="modal_overlay" class="hide">
        <div id="modal_container">
          <div id="input_container">
          <p>할 일</p>
          <input></input>
          </div>
          <p>상세내용</p>
          <p>마감일</p>
          <button>수정</button>
        </div>
      </div>`;
  }

  openModal(todo) {
    console.log(todo);
    this.id = todo._id;
    this.inputTodo = document.getElementById("input_todo");
    this.inputTodo.value = todo.todo;
    this.overlay.classList.add("flex");
    this.overlay.classList.remove("hide");
  }

  closeModal() {
    this.overlay.classList.remove("flex");
    this.overlay.classList.add("hide");
  }

  setCloseModalEventHandler() {
    this.body.addEventListener("click", (event) => {
      event.preventDefault;
      const target = event.target;
      console.log(target.id);
      if (target.id === "modal_overlay") {
        this.overlay.classList.add("hide");
        this.overlay.classList.remove("flex");
      }
    });
  }

  setUpdateButtonHandler(handler) {
    this.btnUpdate.addEventListener("click", (event) => {
      event.preventDefault;
      handler(this.id, { todo: this.inputTodo.value });
    });
  }
}
