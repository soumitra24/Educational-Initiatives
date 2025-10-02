"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
// A concrete implementation of a smart device: a Light.
var Light = /** @class */ (function () {
    function Light(id) {
        this.id = id;
        this.type = "light";
        this.isOn = false;
    }
    Light.prototype.turnOn = function () {
        this.isOn = true;
        // Logger.info(`Light ${this.id} turned On`);
    };
    Light.prototype.turnOff = function () {
        this.isOn = false;
        // Logger.info(`Light ${this.id} turned Off`);
    };
    Light.prototype.getStatus = function () {
        return "Light ".concat(this.id, " is ").concat(this.isOn ? "On" : "Off");
    };
    return Light;
}());
exports.Light = Light;
