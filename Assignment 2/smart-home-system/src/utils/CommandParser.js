"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandParser = void 0;
// Parses raw string commands from the user
var Logger_js_1 = require("./Logger.js");
var CommandParser = /** @class */ (function () {
    function CommandParser() {
    }
    // Parses a full command string into an ICommand object
    CommandParser.parse = function (input) {
        try {
            // Matches a command and its arguments inside parentheses
            var match = input.match(/(\w+)\((.*?)\)/);
            if (!match) {
                throw new Error("Invalid command format");
            }
            var action = match[1];
            // Splits arguments by comma and trims whitespace
            var args = match[2] ? match[2].split(',').map(function (arg) {
                var trimmed = arg.trim();
                // Converts numeric arguments to numbers
                return !isNaN(Number(trimmed)) ? Number(trimmed) : trimmed;
            }) : [];
            return { action: action, args: args };
        }
        catch (error) {
            Logger_js_1.Logger.error("Failed to parse command '".concat(input, "': ").concat(error instanceof Error ? error.message : String(error)));
            return null;
        }
    };
    return CommandParser;
}());
exports.CommandParser = CommandParser;
