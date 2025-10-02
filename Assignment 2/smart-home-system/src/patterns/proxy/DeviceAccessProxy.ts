// device proxy
import { ISmartDevice } from "../../interfaces/ISmartDevice.js";
import { Logger } from "../../utils/Logger.js";

export class DeviceAccessProxy implements ISmartDevice {
  // hold real device
  constructor(private realDevice: ISmartDevice) {}

  // expose base properties
  get id(): number {
    return this.realDevice.id;
  }
  get type(): string {
    return this.realDevice.type;
  }

  // log status access
  getStatus(): string {
    Logger.info(`(Proxy) Accessing status for device ${this.id}`);
    return this.realDevice.getStatus();
  }

  // log turnOn proxy
  turnOn(): void {
    Logger.info(`(Proxy) Intercepted 'turnOn' for device ${this.id}`);
    // hook for extra validation
    this.realDevice.turnOn();
  }

  // log turnOff proxy
  turnOff(): void {
    Logger.info(`(Proxy) Intercepted 'turnOff' for device ${this.id}`);
    this.realDevice.turnOff();
  }
}