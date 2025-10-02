// central hub implementing observer subject
import { ISmartDevice } from "../interfaces/ISmartDevice.js";
import { ISubject } from "../interfaces/ISubject.js";
import { IObserver } from "../interfaces/IObserver.js";
import { DeviceFactory } from "../patterns/factory/DeviceFactory.js";
import { Logger } from "../utils/Logger.js";

export class SmartHomeHub implements ISubject {
  // map lookup by device id
  private devices = new Map<number, ISmartDevice>();
  private observers: IObserver[] = [];

  // add device via factory
  public addDevice(type: string, id: number): void {
    try {
      const device = DeviceFactory.createDevice(type, id);
      this.devices.set(id, device);
      Logger.info(`Added device: ${type} with ID ${id}`);
      this.notifyObservers();
    } catch (error) {
      Logger.error(error instanceof Error ? error.message : String(error));
    }
  }

  public getDeviceById(id: number): ISmartDevice | undefined {
    return this.devices.get(id);
  }

  // isubject methods
  registerObserver(o: IObserver): void {
    this.observers.push(o);
  }
  removeObserver(o: IObserver): void {
    this.observers = this.observers.filter(obs => obs !== o);
  }
  notifyObservers(): void {
  // inform observers of state change
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  // overall device status report
  public generateStatusReport(): void {
    Logger.info("--- Smart Home Status Report ---");
    if (this.devices.size === 0) {
      Logger.info("No devices are currently in the system");
      return;
    }
    this.devices.forEach(device => {
      Logger.info(device.getStatus());
    });
  }
}