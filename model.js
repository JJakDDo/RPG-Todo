export class Model{
    constructor(){
        const todos = localStorage.getItem("todos");
        if(todos){

        } else {
            this.items = [];
            this.count = 1;
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
    }

    deleteItem(id){
        this.items = this.items.filter((elem) => elem.id != id);
    }

    getItem(){
        return this.items;
    }
}