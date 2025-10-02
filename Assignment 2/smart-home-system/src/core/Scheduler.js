"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var Logger_js_1 = require("../utils/Logger.js");
var CommandParser_js_1 = require("../utils/CommandParser.js");
var Scheduler = /** @class */ (function () {
    // Needs a reference to the hub to execute commands
    function Scheduler(hub) {
        this.hub = hub;
        this.tasks = [];
    }
    Scheduler.prototype.addSchedule = function (deviceId, time, command) {
        this.tasks.push({ deviceId: deviceId, time: time, command: command, hasExecuted: false });
        Logger_js_1.Logger.info("Scheduled '".concat(command, "' for device ").concat(deviceId, " at ").concat(time));
    };
    // This would be run on a timer in a real application
    Scheduler.prototype.checkSchedules = function () {
        var now = new Date();
        var currentTime = "".concat(now.getHours().toString().padStart(2, '0'), ":").concat(now.getMinutes().toString().padStart(2, '0'));
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            if (task.time === currentTime && !task.hasExecuted) {
                Logger_js_1.Logger.info("Executing scheduled task: ".concat(task.command, " for device ").concat(task.deviceId));
                var parsedCommand = CommandParser_js_1.CommandParser.parse(task.command);
                var device = this.hub.getDeviceById(task.deviceId);
                if (parsedCommand && device) {
                    // Simplified execution logic
                    if (parsedCommand.action === 'turnOn')
                        device.turnOn();
                    if (parsedCommand.action === 'turnOff')
                        device.turnOff();
                }
                task.hasExecuted = true; // Prevents re-execution in the same minute
            }
        }
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
