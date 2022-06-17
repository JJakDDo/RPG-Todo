import { LoginView } from "./views/loginView.js";
import { LoginModel } from "./models/loginModel.js";
import { Player } from "./player.js";
import { Model } from "./model.js";
import { View } from "./view.js";

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
    this.LoginModel.login(userInfo, () => {
      this.player = new Player();
      this.model = new Model(this.player);
      this.view = new View(this.player);
      this.view.addTodoHandler(this.addTodo.bind(this));
      this.view.deleteTodoHandler(this.deleteTodo.bind(this));
      this.view.completeTodoHandler(
        this.completeTodo.bind(this),
        this.model.player
      );
      this.view.render(this.model.getItem());
      this.view.renderPlayer(this.model.player);
      this.view.draw();
    });
  }

  addTodo(todo) {
    this.model.addItem(todo, () => {
      this.view.render(this.model.getItem());
    });
  }

  deleteTodo(id) {
    this.model.deleteItem(id);
  }

  completeTodo(id) {
    this.model.completeItem(id);
  }
}
