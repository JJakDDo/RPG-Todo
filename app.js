import { Model } from "./model.js";
import { Controller } from "./controller.js";
import { View } from "./view.js";
import { Player } from "./player.js";

window.onload = () => {
    const player = new Player();
    const model = new Model();
    const view = new View();
    const controller = new Controller(model, view);   
};