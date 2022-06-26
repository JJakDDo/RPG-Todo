import { LoginView } from "./views/loginView.js";
import { LoginModel } from "./models/loginModel.js";
import { Player } from "./player.js";
import { Model } from "./model.js";
import { View } from "./view.js";
import { ToDoView } from "./views/toDoView.js";
import { ToDoModel } from "./models/toDoModel.js";

export class Controller {
  constructor() {
    // this.model = model;
    // this.view = view;
    // this.view.addTodoHandler(this.addTodo.bind(this));
    // this.view.deleteTodoHandler(this.deleteTodo.bind(this));
    // this.view.completeTodoHandler(
    //   this.completeTodo.bind(this),
    //   this.model.player
    // );
    this.loginView = new LoginView();
    this.LoginModel = new LoginModel();
    this.loginView.render();
    this.loginView.loginHandler(this.login.bind(this));
    // this.view.render(this.model.getItem());
    // this.view.renderPlayer(this.model.player);
    // this.view.draw();
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

      this.todoModel.getItem((todos) => this.todoView.render(todos));
      this.todoView.addTodoHandler(this.addTodo.bind(this));
      this.todoView.deleteTodoHandler(this.deleteTodo.bind(this));
      this.todoView.completeTodoHandler(this.completeTodo.bind(this));
    });
  }

  addTodo(todo) {
    this.todoModel.addItem(todo, (added) =>
      this.todoView.renderAddedTodo(added)
    );
  }

  deleteTodo(id) {
    this.todoModel.deleteItem(id);
  }

  completeTodo(id) {
    this.todoModel.completeItem(id);
  }
}
