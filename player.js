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

        this.img = new Image();
        this.img.src = 'src/Pink_Monster_Idle_4.png';
        this.img.onload = () => {
            this.loaded();
        }
        this.cur = 0;
        this.isLoaded = false;

        this.totalFrame = 4;
        this.curFrame = 0;

        this.imgWidth = 32;
        this.imgheight = 32;

        this.fps = 4;
        this.fpsTime = 1000 / this.fps;
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

    loaded(){
        this.isLoaded = true;
        console.log(this.img.src);
    }

    draw(ctx, t){
        /*this.curFrame += 1;
        if(this.curFrame == this.totalFrame){
            this.curFrame = 0;
        }
        if(this.isLoaded){
            this.animate(ctx);
        }*/
        console.log(ctx);
        ctx.drawImage(
            this.img,
            0,
            0,
            128,
            32,
        );
    }

    animate(ctx){
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            0,
            0,
            this.imgWidth,
            this.imgHeight
        );
        ctx.fillStyle = '#000000';
        ctx.fillRect(
            32,
            32,
            this.imgWidth,
            this.imgheight
        );
    }
}