import { Logger } from "../../utils/Logger.js";
export class DeviceAccessProxy {
    // A proxy holds a reference to the real object
    constructor(realDevice) {
        this.realDevice = realDevice;
    }
    // Pass through properties
    get id() {
        return this.realDevice.id;
    }
    get type() {
        return this.realDevice.type;
    }
    // Intercept the getStatus method to add logging
    getStatus() {
        Logger.info(`(Proxy) Accessing status for device ${this.id}`);
        return this.realDevice.getStatus();
    }
    // Intercept the turnOn method
    turnOn() {
        Logger.info(`(Proxy) Intercepted 'turnOn' for device ${this.id}`);
        // Additional logic could be added here (e.g., permission checks)
        this.realDevice.turnOn();
    }
    // Intercept the turnOff method
    turnOff() {
        Logger.info(`(Proxy) Intercepted 'turnOff' for device ${this.id}`);
        this.realDevice.turnOff();
    }
}
//# sourceMappingURL=DeviceAccessProxy.js.map