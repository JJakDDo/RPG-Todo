import { Player } from "./player.js";

export class Model{
    constructor(player){
        const todos = JSON.parse(localStorage.getItem("todos"));
        this.items = [];
        this.count = 1;
        this.totalMonster = 2;
        if(todos){
            todos.forEach((elem) => {
                this.items.push(elem);
                this.count = elem.id + 1;
            });
        }
        this.player = player;
    }

    addItem(item, callback){
        this.items.push({
            todo: item,
            id: this.count,
            monster: Math.floor(Math.random() * this.totalMonster),
            exp: this.count % 10 == 0 ? 1000 : Math.round(Math.random() * 2 + 1) * 100
        });
        if(callback){
            callback();
        }
        this.count++;
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

    completeItem(id){
        this.player.addExp(this.items.filter((elem) => elem.id == id)[0].exp);
        this.deleteItem(id);        
    }
}