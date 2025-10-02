"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// A simple static logger class to standardize console output.
// It adds timestamps and log levels to every message.
var Logger = /** @class */ (function () {
    function Logger() {
    }
    // Gets the current timestamp in a readable format.
    Logger.getTimestamp = function () {
        return new Date().toISOString();
    };
    /**
     * Logs informational messages. Use for general application flow events.
     * @param message The message to log.
     */
    Logger.info = function (message) {
        console.log("[".concat(this.getTimestamp(), "] [INFO] ").concat(message));
    };
    /**
     * Logs warning messages. Use for non-critical issues that should be noted.
     * @param message The message to log.
     */
    Logger.warn = function (message) {
        console.warn("[".concat(this.getTimestamp(), "] [WARN] ").concat(message));
    };
    /**
     * Logs error messages. Use for exceptions and failures.
     * @param message The message to log.
     */
    Logger.error = function (message) {
        console.error("[".concat(this.getTimestamp(), "] [ERROR] ").concat(message));
    };
    return Logger;
}());
exports.Logger = Logger;
