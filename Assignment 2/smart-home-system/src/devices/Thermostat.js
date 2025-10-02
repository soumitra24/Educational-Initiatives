"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thermostat = void 0;
// A more complex device that has a temperature property.
var Thermostat = /** @class */ (function () {
    function Thermostat(id) {
        this.id = id;
        this.type = "thermostat";
        this.temperature = 70; // Default temperature
    }
    // A Thermostat doesn't really turn "off", it just becomes idle.
    // This is a reasonable interpretation of the interface contract.
    Thermostat.prototype.turnOn = function () {
        // Logger.info(`Thermostat ${this.id} is now active.`);
    };
    Thermostat.prototype.turnOff = function () {
        // Logger.info(`Thermostat ${this.id} is now idle.`);
    };
    // This method is specific to the Thermostat class.
    Thermostat.prototype.setTemperature = function (temp) {
        this.temperature = temp;
        // Logger.info(`Thermostat ${this.id} temperature set to ${temp}`);
    };
    Thermostat.prototype.getStatus = function () {
        return "Thermostat ".concat(this.id, " is set to ").concat(this.temperature, " degrees");
    };
    return Thermostat;
}());
exports.Thermostat = Thermostat;
