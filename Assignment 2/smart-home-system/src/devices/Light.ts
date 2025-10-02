import { ISmartDevice } from "../interfaces/ISmartDevice.js";

// smart light device
export class Light implements ISmartDevice {
  public readonly type = "light";
  private isOn = false;

  constructor(public readonly id: number) {}

  turnOn(): void {
    this.isOn = true;
  }

  turnOff(): void {
    this.isOn = false;
  }

  getStatus(): string {
    return `Light ${this.id} is ${this.isOn ? "On" : "Off"}`;
  }
}