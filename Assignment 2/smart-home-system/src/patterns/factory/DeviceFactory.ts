// device factory
import { ISmartDevice } from "../../interfaces/ISmartDevice.js";
import { Light } from "../../devices/Light.js";
import { Thermostat } from "../../devices/Thermostat.js";
import { DoorLock } from "../../devices/DoorLock.js";

export class DeviceFactory {
  // build device by type
  public static createDevice(type: string, id: number): ISmartDevice {
    switch (type.toLowerCase()) {
      case "light":
        return new Light(id);
      case "thermostat":
        return new Thermostat(id);
      case "door":
        return new DoorLock(id);
      default:
  // throw on unknown type
        throw new Error(`Invalid device type specified: ${type}`);
    }
  }
}