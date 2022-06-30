import { LoginView } from "./views/loginView.js";
import { LoginModel } from "./models/loginModel.js";
import { Player } from "./player.js";
import { Model } from "./model.js";
import { View } from "./view.js";
import { ToDoView } from "./views/toDoView.js";
import { ToDoModel } from "./models/toDoModel.js";
import { ToDoEditView } from "./views/toDoEditView.js";
import { ToDoEditModel } from "./models/toDoEditModel.js";

export class Controller {
  constructor() {
    this.loginView = new LoginView();
    this.LoginModel = new LoginModel();
    this.loginView.render();
    this.loginView.loginHandler(this.login.bind(this));
  }

  login(userInfo) {
    this.LoginModel.login(userInfo, (user) => {
      this.player = new Player(user);
      this.model = new Model(this.player);
      this.view = new View(this.player);
      this.view.renderPlayer(user);
      this.view.draw();

      this.todoView = new ToDoView();
      this.todoModel = new ToDoModel();
      this.todoEditView = new ToDoEditView();
      this.todoEditModel = new ToDoEditModel();

      this.todoModel.getItem((todos) => this.todoView.render(todos));
      this.todoView.addTodoHandler(this.addTodo.bind(this));
      this.todoView.deleteTodoHandler(this.deleteTodo.bind(this));
      this.todoView.completeTodoHandler(this.completeTodo.bind(this));
      this.todoView.editToDoHanlder(this.openToDoEditModal.bind(this));
      this.todoEditView.setCloseModalEventHandler();
    });
  }

  /*
    투두 목록에 투두 추가하기
  */
  addTodo(todo) {
    this.todoModel.addItem(todo, (added) =>
      this.todoView.renderAddedTodo(added)
    );
  }

  /*
    투두 목록에서 특정 투두 삭제하기
    id mongoDB Object ID
  */
  deleteTodo(id) {
    this.todoModel.deleteItem(id);
  }

  /*
    특정 투두 완료 상태로 변경하기
    id mongoDB Object ID
  */
  completeTodo(id) {
    this.todoModel.completeItem(id, (user) => {
      this.view.renderPlayer(user);
    });
  }

  openToDoEditModal(id) {
    this.todoEditModel.getTodo(id, (todo) => {
      this.todoEditView.openModal(todo);
    });
  }
}
