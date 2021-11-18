export class Player{
    constructor(){        
        const player = JSON.parse(localStorage.getItem("player"));
        if(player){
            this.lvl = +player.lvl;
            this.exp = +player.exp;
            this.requiredExp = +player.requiredExp;
        } else {
            this.lvl = 1;
            this.exp = 0;
            this.requiredExp = 500;
        }
    }

    addExp(exp){
        this.exp += exp;
        if(this.exp >= this.requiredExp){
            this.lvl++;
            this.exp -= this.requiredExp;
            this.requiredExp += 200;
        }
        this.savePlayer();
    }

    savePlayer(){
        localStorage.setItem("player", JSON.stringify({
            lvl: this.lvl,
            exp: this.exp,
            requiredExp: this.requiredExp
        }));
    }
}