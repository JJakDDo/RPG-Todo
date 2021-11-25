export class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.view.addTodoHandler(this.addTodo.bind(this));
        this.view.deleteTodoHandler(this.deleteTodo.bind(this));
        this.view.completeTodoHandler(this.completeTodo.bind(this), this.model.player);
        
        this.view.render(this.model.getItem());
        this.view.renderPlayer(this.model.player);
        this.view.drawPlayer();
    }

    addTodo(todo){
        this.model.addItem(todo, () => {
            this.view.render(this.model.getItem());
        });
    }

    deleteTodo(id){
        this.model.deleteItem(id);
    }

    completeTodo(id){
        this.model.completeItem(id);
    }
}