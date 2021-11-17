export class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.view.addTodoHandler(this.addTodo.bind(this));
        this.view.deleteTodoHandler(this.deleteTodo.bind(this));
    }

    addTodo(todo){
        this.model.addItem(todo, () => {
            this.view.render(this.model.getItem());
        });
    }

    deleteTodo(id){
        this.model.deleteItem(id);
    }
}