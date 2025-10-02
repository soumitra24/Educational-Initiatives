import { ISmartDevice } from "../interfaces/ISmartDevice.js";

// smart door lock device
export class DoorLock implements ISmartDevice {
  public readonly type = "door";
  private isLocked = true; // locked by default

  constructor(public readonly id: number) {}

  // lock and unlock command mapping
  lock(): void {
    this.isLocked = true;
  }
  unlock(): void {
    this.isLocked = false;
  }

  // map generic commands to door behavior
  turnOn(): void {
    this.lock();
  }
  turnOff(): void {
    this.unlock();
  }

  getStatus(): string {
    return `Door ${this.id} is ${this.isLocked ? "Locked" : "Unlocked"}`;
  }
}