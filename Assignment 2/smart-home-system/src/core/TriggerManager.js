"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerManager = void 0;
var SmartHomeHub_js_1 = require("./SmartHomeHub.js");
var Logger_js_1 = require("../utils/Logger.js");
var TriggerManager = /** @class */ (function () {
    function TriggerManager(hub) {
        this.hub = hub;
        this.triggers = [];
    }
    // The update method called by the Subject (Hub)
    TriggerManager.prototype.update = function (subject) {
        // Only act if the subject is our hub
        if (subject instanceof SmartHomeHub_js_1.SmartHomeHub) {
            Logger_js_1.Logger.info("TriggerManager received an update from the Hub, checking conditions...");
            this.checkTriggers();
        }
    };
    TriggerManager.prototype.addTrigger = function (condition, action, description) {
        this.triggers.push({ condition: condition, action: action, description: description });
        Logger_js_1.Logger.info("Added trigger: ".concat(description));
    };
    // Checks all triggers and executes actions if conditions are met
    TriggerManager.prototype.checkTriggers = function () {
        for (var _i = 0, _a = this.triggers; _i < _a.length; _i++) {
            var trigger = _a[_i];
            if (trigger.condition()) {
                Logger_js_1.Logger.info("Condition met for trigger: '".concat(trigger.description, "', executing action"));
                trigger.action();
            }
        }
    };
    return TriggerManager;
}());
exports.TriggerManager = TriggerManager;
