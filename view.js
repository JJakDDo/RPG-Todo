export class View{
    constructor(){
        this.btnAddTodo = document.getElementById("btnAddTodo");
        this.inputAddTodo = document.getElementById("inputAddTodo");
        this.todoList = document.getElementById("todoList");
    }

    render(todos){
        console.log(this.inputAddTodo.value);
        this.clearList();
        todos.forEach((item) => {
            this.todoList.innerHTML += this.getTemplate(item);
        })        
        this.inputAddTodo.value = "";

    }

    clearList(){
        this.todoList.innerHTML = "";
    }

    getTemplate(item){
        
        return `
        <li id=${item.id}>
            <span class="todoText">${item.todo}</span>
            <button class="btnDeleteTodo"> x </button>
        </li>
        `;
    }

    addTodoHandler(handler){       
        this.btnAddTodo.addEventListener("click", (event)=>{
            event.preventDefault;
            if(this.inputAddTodo.value){
                handler(this.inputAddTodo.value);
            }
        });
    }

    deleteTodoHandler(handler){       
        this.todoList.addEventListener("click", (event)=>{
            event.preventDefault;
            const target = event.target;
            if(target.matches('li')){
                handler(target.id);
                this.todoList.removeChild(target);
            }
        });
    }
}