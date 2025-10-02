"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFactory = void 0;
var Light_js_1 = require("../../devices/Light.js");
var Thermostat_js_1 = require("../../devices/Thermostat.js");
var DoorLock_js_1 = require("../../devices/DoorLock.js");
var DeviceFactory = /** @class */ (function () {
    function DeviceFactory() {
    }
    // Creates a device based on its type
    DeviceFactory.createDevice = function (type, id) {
        switch (type.toLowerCase()) {
            case "light":
                return new Light_js_1.Light(id);
            case "thermostat":
                return new Thermostat_js_1.Thermostat(id);
            case "door":
                return new DoorLock_js_1.DoorLock(id);
            default:
                // Throws error for unknown device types
                throw new Error("Invalid device type specified: ".concat(type));
        }
    };
    return DeviceFactory;
}());
exports.DeviceFactory = DeviceFactory;
