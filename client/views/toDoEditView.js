export class ToDoEditView {
  constructor() {
    //this.initModal();
    this.overlay = document.getElementById("modal_overlay");
    this.body = document.body;
  }

  initModal() {
    this.main = document.getElementById("main");
    this.main.innerHTML += `    
      <div id="modal_overlay" class="hide">
        <div id="modal_container">
          <p>할 일</p>
          <p>상세내용</p>
          <p>마감일</p>
          <button>수정</button>
        </div>
      </div>`;
  }

  openModal(todo) {
    console.log(todo);
    this.overlay.classList.add("flex");
    this.overlay.classList.remove("hide");
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
}
