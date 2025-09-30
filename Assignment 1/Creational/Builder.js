"use strict";
//Lets use builder pattern to create some characters in our game
//In this code we define a HeroBuilder that constructs a complex Character object step-by-step
// Product: Character
// Builder: ICharacterBuilder interface
// Concrete Builder: HeroBuilder
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
// Helper to get user input from the command line
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var promptUser = function (question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
};
var ensureText = function (value, label) {
    if (!value || !value.trim()) {
        throw new Error("".concat(label, " cannot be empty"));
    }
    return value.trim();
};
// The complex object we want to build
var Character = /** @class */ (function () {
    function Character() {
        this.race = null;
        this.characterClass = null;
        this.equipment = [];
    }
    Character.prototype.display = function () {
        console.log("\n*** CHARACTER SHEET ***");
        console.log("Race: ".concat(this.race || 'Not set'));
        console.log("Class: ".concat(this.characterClass || 'Not set'));
        var equipmentList = this.equipment.length > 0 ? this.equipment.join(", ") : 'None';
        console.log("Equipment: ".concat(equipmentList));
        console.log("***********************\n");
    };
    return Character;
}());
// The concrete builder implements the steps
var HeroBuilder = /** @class */ (function () {
    function HeroBuilder() {
        this.character = new Character();
    }
    HeroBuilder.prototype.reset = function () {
        this.character = new Character();
    };
    HeroBuilder.prototype.setRace = function (race) {
        this.character.race = ensureText(race, "Race");
        return this;
    };
    HeroBuilder.prototype.setClass = function (characterClass) {
        this.character.characterClass = ensureText(characterClass, "Class");
        return this;
    };
    HeroBuilder.prototype.addEquipment = function (item) {
        this.character.equipment.push(ensureText(item, "Equipment"));
        return this;
    };
    HeroBuilder.prototype.getResult = function () {
        var result = this.character;
        // We don't reset here so the user can see the final product
        // The reset option is now manual
        return result;
    };
    // A helper to see the current state without finalizing the build
    HeroBuilder.prototype.displayCurrentBuild = function () {
        this.character.display();
    };
    return HeroBuilder;
}());
// Main interactive application loop
var runInteractiveBuilder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var heroBuilder, appIsRunning, choice, _a, raceChoice, classChoice, equipment, finalCharacter, error_1, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                heroBuilder = new HeroBuilder();
                appIsRunning = true;
                console.log("--- Welcome to the Interactive Character Builder ---");
                _b.label = 1;
            case 1:
                if (!appIsRunning) return [3 /*break*/, 17];
                heroBuilder.displayCurrentBuild();
                return [4 /*yield*/, promptUser("Choose an action:\n" +
                        "1. Set Race\n" +
                        "2. Set Class\n" +
                        "3. Add Equipment\n" +
                        "4. Finish and Display Character\n" +
                        "5. Reset Character\n" +
                        "6. Exit\n" +
                        "> ")];
            case 2:
                choice = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 15, , 16]);
                _a = choice.trim();
                switch (_a) {
                    case '1': return [3 /*break*/, 4];
                    case '2': return [3 /*break*/, 6];
                    case '3': return [3 /*break*/, 8];
                    case '4': return [3 /*break*/, 10];
                    case '5': return [3 /*break*/, 11];
                    case '6': return [3 /*break*/, 12];
                }
                return [3 /*break*/, 13];
            case 4: return [4 /*yield*/, promptUser("Choose a Race (Human, Elf, Dwarf): ")];
            case 5:
                raceChoice = _b.sent();
                heroBuilder.setRace(raceChoice);
                return [3 /*break*/, 14];
            case 6: return [4 /*yield*/, promptUser("Choose a Class (Paladin, Rogue, Mage): ")];
            case 7:
                classChoice = _b.sent();
                heroBuilder.setClass(classChoice);
                return [3 /*break*/, 14];
            case 8: return [4 /*yield*/, promptUser("Enter an equipment item: ")];
            case 9:
                equipment = _b.sent();
                heroBuilder.addEquipment(equipment);
                return [3 /*break*/, 14];
            case 10:
                finalCharacter = heroBuilder.getResult();
                console.log("Your character is complete!");
                finalCharacter.display();
                return [3 /*break*/, 14];
            case 11:
                heroBuilder.reset();
                console.log("Character has been reset.");
                return [3 /*break*/, 14];
            case 12:
                appIsRunning = false;
                console.log("Exiting builder...");
                return [3 /*break*/, 14];
            case 13:
                console.log("Invalid choice, please try again.");
                _b.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                error_1 = _b.sent();
                message = error_1 instanceof Error ? error_1.message : String(error_1);
                console.error("\nError: ".concat(message, "\n"));
                return [3 /*break*/, 16];
            case 16: return [3 /*break*/, 1];
            case 17:
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
runInteractiveBuilder();
