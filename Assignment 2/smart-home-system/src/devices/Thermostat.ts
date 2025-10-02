import { ISmartDevice } from "../interfaces/ISmartDevice.js";

// smart thermostat device
export class Thermostat implements ISmartDevice {
  public readonly type = "thermostat";
  private temperature = 70; // default temperature

  constructor(public readonly id: number) {}

  // thermostat idle when off
  turnOn(): void {
  }
  turnOff(): void {
  }

  // thermostat specific setter
  setTemperature(temp: number): void {
    this.temperature = temp;
  }

  getStatus(): string {
    return `Thermostat ${this.id} is set to ${this.temperature} degrees`;
  }
}