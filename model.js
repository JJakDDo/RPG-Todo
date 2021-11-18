export class Model{
    constructor(){
        const todos = JSON.parse(localStorage.getItem("todos"));
        this.items = [];
        this.count = 1;
        if(todos){
            todos.forEach((elem) => {
                this.items.push(elem);
                this.count = elem.id + 1;
            });
        }
    }

    addItem(item, callback){
        this.items.push({
            todo: item,
            id: this.count++
        });
        if(callback){
            callback();
        }
        this.storeItem();
    }

    deleteItem(id){
        this.items = this.items.filter((elem) => elem.id != id);
        this.storeItem();
    }

    getItem(){
        return this.items;
    }

    storeItem(){
        localStorage.setItem("todos", JSON.stringify(this.items));
    }
}