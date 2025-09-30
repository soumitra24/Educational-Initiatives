// This code demonstrates how to save and restore the state of a GameSession object without exposing its internal details.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Memento
var GameSnapshot = /** @class */ (function () {
    function GameSnapshot(health, level, position) {
        this.health = health;
        this.level = level;
        this.position = __assign({}, position); // clone to prevent accidental mutation
        console.log("(Memento created: Level ".concat(level, ", Health ").concat(health, ")"));
    }
    return GameSnapshot;
}());
//Originator
//This is the main game object whose state we want to save
var GameSession = /** @class */ (function () {
    function GameSession() {
        this.health = 100;
        this.level = 1;
        this.position = { x: 0, y: 0, z: 0 };
    }
    // Simulates playing the game and changing the state
    GameSession.prototype.play = function () {
        this.level += 1;
        this.health -= 10;
        this.position.x += 10;
        console.log("\nRunning, Jumping, Fighting, having fun...");
        this.printStatus();
    };
    // Creates a snapshot of its current state
    GameSession.prototype.createSnapshot = function () {
        console.log("(Originator: Saving state to Snapshot...)");
        return new GameSnapshot(this.health, this.level, this.position);
    };
    // Restores its state from a Snapshot object
    GameSession.prototype.restoreFromSnapshot = function (snapshot) {
        this.health = snapshot.health;
        this.level = snapshot.level;
        this.position = __assign({}, snapshot.position);
        console.log("\n(Originator: State restored from Snapshot.)");
    };
    GameSession.prototype.printStatus = function () {
        console.log("Current State: Level=".concat(this.level, ", Health=").concat(this.health, ", Position=(").concat(this.position.x, ", ").concat(this.position.y, ", ").concat(this.position.z, ")"));
    };
    return GameSession;
}());
// Caretaker
// This object is responsible for storing the Snapshots
var SaveManager = /** @class */ (function () {
    function SaveManager() {
        this.slots = [];
    }
    SaveManager.prototype.saveGame = function (session) {
        console.log("(Caretaker: Receiving Snapshot and storing it...)");
        this.slots.push(session.createSnapshot());
    };
    SaveManager.prototype.loadGame = function (session) {
        var lastSnapshot = this.slots.pop();
        if (lastSnapshot) {
            console.log("(Caretaker: Giving Snapshot back to Originator...)");
            session.restoreFromSnapshot(lastSnapshot);
        }
        else {
            console.log("No save file to load!");
        }
    };
    return SaveManager;
}());
// --- Client Code ---
var gameSession = new GameSession();
var gameSaveManager = new SaveManager();
console.log("Starting Game");
gameSession.printStatus();
//play
gameSession.play();
//Save the game
console.log("\nSaving Progress...");
gameSaveManager.saveGame(gameSession);
//play some more
gameSession.play();
//tough boss? Let's load our previous save
console.log("\nLoading Previous Save");
gameSaveManager.loadGame(gameSession);
gameSession.printStatus();
