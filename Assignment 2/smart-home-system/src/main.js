"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var SmartHomeHub_js_1 = require("./core/SmartHomeHub.js");
var Scheduler_js_1 = require("./core/Scheduler.js");
var TriggerManager_js_1 = require("./core/TriggerManager.js");
var Thermostat_js_1 = require("./devices/Thermostat.js");
var Logger_js_1 = require("./utils/Logger.js");
// Helper to get user input from the command line
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var promptUser = function (question) {
    return new Promise(function (resolve) { return rl.question(question, resolve); });
};
// Main application function
function runInteractiveSystem() {
    return __awaiter(this, void 0, void 0, function () {
        var hub, scheduler, triggerManager, light, thermostat, appIsRunning, input, parts, command, args, device, type, id;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Logger_js_1.Logger.info("--- Initializing Interactive Smart Home System ---");
                    hub = new SmartHomeHub_js_1.SmartHomeHub();
                    scheduler = new Scheduler_js_1.Scheduler(hub);
                    triggerManager = new TriggerManager_js_1.TriggerManager(hub);
                    // 2. Set up the Observer Pattern
                    hub.registerObserver(triggerManager);
                    // 3. Add initial devices (using the Factory inside the hub)
                    hub.addDevice("light", 1);
                    hub.addDevice("thermostat", 2);
                    hub.addDevice("door", 3);
                    light = hub.getDeviceById(1);
                    thermostat = hub.getDeviceById(2);
                    if (light && thermostat) {
                        triggerManager.addTrigger(function () {
                            var status = thermostat.getStatus();
                            var statusParts = status.split(' ');
                            var temperatureString = statusParts[statusParts.length - 2];
                            var isLightOn = light.getStatus().includes("On");
                            return parseFloat(temperatureString) > 75 && isLightOn;
                        }, function () {
                            light.turnOff();
                            hub.notifyObservers(); // Notify system that the light state changed
                        }, "Turn off light 1 if thermostat goes above 75");
                    }
                    Logger_js_1.Logger.info("--- System Ready ---");
                    Logger_js_1.Logger.info("Type 'help' for a list of commands, or 'exit' to quit.");
                    appIsRunning = true;
                    _b.label = 1;
                case 1:
                    if (!appIsRunning) return [3 /*break*/, 3];
                    // In a real app, this would be on a more robust timer
                    scheduler.checkSchedules();
                    return [4 /*yield*/, promptUser('> ')];
                case 2:
                    input = _b.sent();
                    parts = input.trim().split(' ');
                    command = (_a = parts[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                    args = parts.slice(1);
                    try {
                        device = void 0;
                        switch (command) {
                            case 'status':
                                hub.generateStatusReport();
                                break;
                            case 'turnon':
                                device = hub.getDeviceById(parseInt(args[0]));
                                device === null || device === void 0 ? void 0 : device.turnOn();
                                hub.notifyObservers(); // Notify system of state change
                                break;
                            case 'turnoff':
                                device = hub.getDeviceById(parseInt(args[0]));
                                device === null || device === void 0 ? void 0 : device.turnOff();
                                hub.notifyObservers();
                                break;
                            case 'settemp':
                                device = hub.getDeviceById(parseInt(args[0]));
                                if (device && device instanceof Thermostat_js_1.Thermostat) {
                                    device.setTemperature(parseInt(args[1]));
                                    hub.notifyObservers(); // CRUCIAL: This triggers the automation
                                }
                                else {
                                    Logger_js_1.Logger.warn("Device is not a thermostat or not found");
                                }
                                break;
                            case 'add':
                                type = args[0];
                                id = parseInt(args[1]);
                                // Validation
                                if (!type || isNaN(id)) {
                                    Logger_js_1.Logger.warn("Usage: add <type> <id>. Example: add light 4");
                                    break;
                                }
                                if (hub.getDeviceById(id)) {
                                    Logger_js_1.Logger.warn("Device with ID ".concat(id, " already exists."));
                                    break;
                                }
                                hub.addDevice(type, id);
                                break;
                            case 'help':
                                Logger_js_1.Logger.info("Available commands:");
                                Logger_js_1.Logger.info("  status - View the status of all devices");
                                Logger_js_1.Logger.info("  add <type> <id> - Add a new device (types: light, door)");
                                Logger_js_1.Logger.info("  turnOn <id> - Turn a device on");
                                Logger_js_1.Logger.info("  turnOff <id> - Turn a device off");
                                Logger_js_1.Logger.info("  setTemp <id> <temp> - Set a thermostat's temperature");
                                Logger_js_1.Logger.info("  exit - Close the application");
                                break;
                            case 'exit':
                                appIsRunning = false;
                                break;
                            default:
                                Logger_js_1.Logger.warn("Unknown command. Type 'help' for a list of commands.");
                        }
                    }
                    catch (error) {
                        Logger_js_1.Logger.error("Command failed: ".concat(error instanceof Error ? error.message : String(error)));
                    }
                    return [3 /*break*/, 1];
                case 3:
                    Logger_js_1.Logger.info("Shutting down Smart Home System.");
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
runInteractiveSystem();
