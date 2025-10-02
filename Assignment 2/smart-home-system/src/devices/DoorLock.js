"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorLock = void 0;
// A device focused on security.
var DoorLock = /** @class */ (function () {
    function DoorLock(id) {
        this.id = id;
        this.type = "door";
        this.isLocked = true; // Doors are locked by default
    }
    // For a door, "lock" and "unlock" are more descriptive commands.
    DoorLock.prototype.lock = function () {
        this.isLocked = true;
        // Logger.info(`Door ${this.id} has been locked.`);
    };
    DoorLock.prototype.unlock = function () {
        this.isLocked = false;
        // Logger.info(`Door ${this.id} has been unlocked.`);
    };
    // The ISmartDevice commands can be mapped or handled as not applicable.
    // This adheres to the Liskov Substitution Principle.
    DoorLock.prototype.turnOn = function () {
        // Logger.info("Command 'turnOn' interpreted as 'lock' for Door " + this.id);
        this.lock();
    };
    DoorLock.prototype.turnOff = function () {
        // Logger.info("Command 'turnOff' interpreted as 'unlock' for Door " + this.id);
        this.unlock();
    };
    DoorLock.prototype.getStatus = function () {
        return "Door ".concat(this.id, " is ").concat(this.isLocked ? "Locked" : "Unlocked");
    };
    return DoorLock;
}());
exports.DoorLock = DoorLock;
