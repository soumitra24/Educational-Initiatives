"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartHomeHub = void 0;
var DeviceFactory_js_1 = require("../patterns/factory/DeviceFactory.js");
var Logger_js_1 = require("../utils/Logger.js");
var SmartHomeHub = /** @class */ (function () {
    function SmartHomeHub() {
        // Uses a Map for efficient device lookup by ID
        this.devices = new Map();
        this.observers = [];
    }
    // Adds a new device using the factory
    SmartHomeHub.prototype.addDevice = function (type, id) {
        try {
            var device = DeviceFactory_js_1.DeviceFactory.createDevice(type, id);
            this.devices.set(id, device);
            Logger_js_1.Logger.info("Added device: ".concat(type, " with ID ").concat(id));
            this.notifyObservers();
        }
        catch (error) {
            Logger_js_1.Logger.error(error instanceof Error ? error.message : String(error));
        }
    };
    SmartHomeHub.prototype.getDeviceById = function (id) {
        return this.devices.get(id);
    };
    // Implements ISubject interface
    SmartHomeHub.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    SmartHomeHub.prototype.removeObserver = function (o) {
        this.observers = this.observers.filter(function (obs) { return obs !== o; });
    };
    SmartHomeHub.prototype.notifyObservers = function () {
        // Notifies all observers about a potential state change
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    // Generates a status report for all devices
    SmartHomeHub.prototype.generateStatusReport = function () {
        Logger_js_1.Logger.info("--- Smart Home Status Report ---");
        if (this.devices.size === 0) {
            Logger_js_1.Logger.info("No devices are currently in the system");
            return;
        }
        this.devices.forEach(function (device) {
            Logger_js_1.Logger.info(device.getStatus());
        });
    };
    return SmartHomeHub;
}());
exports.SmartHomeHub = SmartHomeHub;
