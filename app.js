import { Model } from "./model.js";
import { Controller } from "./controller.js";
import { View } from "./view.js";


window.onload = () => {
    const model = new Model();
    const view = new View();
    const controller = new Controller(model, view);
};