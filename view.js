export class View{
    constructor(player){
        this.btnAddTodo = document.getElementById("btnAddTodo");
        this.inputAddTodo = document.getElementById("inputAddTodo");
        this.todoList = document.getElementById("todoList");

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
    }

    render(todos){
        this.clearList();
        todos.forEach((item) => {
            this.todoList.innerHTML += this.getTodoTemplate(item);
        })        
        this.inputAddTodo.value = "";
    }

    renderPlayer(player){
        const lvl = document.getElementById("lvl");
        const exp = document.getElementById("exp");
        const requiredExp = document.getElementById("requiredExp");

        lvl.innerText = player.lvl;
        exp.innerText = player.exp;
        requiredExp.innerText = player.requiredExp;
    }

    clearList(){
        this.todoList.innerHTML = "";
    }

    getTodoTemplate(item){
        
        return `
        <li id=${item.id}>
            <span class="todoText">${item.todo}</span>
            <button class="btnDeleteTodo"> x </button>
            <button class="btnCompleteTodo"> v </button>
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
        this.inputAddTodo.addEventListener("keyup", (event)=>{
            if(event.keyCode == 13){
                event.preventDefault;
                if(this.inputAddTodo.value){
                    handler(this.inputAddTodo.value);
                }
            }
        });
    }

    deleteTodoHandler(handler){       
        this.todoList.addEventListener("click", (event)=>{
            event.preventDefault;
            const target = event.target;
            if(target.classList[0] === 'btnDeleteTodo'){
                handler(target.parentNode.id);
                this.todoList.removeChild(target.parentNode);
            }
        });
    }

    completeTodoHandler(handler, player){       
        this.todoList.addEventListener("click", (event)=>{
            event.preventDefault;
            const target = event.target;
            if(target.classList[0] === 'btnCompleteTodo'){
                handler(target.parentNode.id);
                this.todoList.removeChild(target.parentNode);
                this.renderPlayer(player);
            }
        });
    }    

    drawPlayer(player){        
        this.player = player;
        //requestAnimationFrame(this.animate.bind(this));
        this.player.draw(this.ctx, 1);
    }

    /*animate(t){
        requestAnimationFrame(this.animate.bind(this));
        this.player.draw(this.ctx, t);
    }*/
}