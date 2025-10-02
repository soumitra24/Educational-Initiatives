import * as readline from 'readline';
import { SmartHomeHub } from './core/SmartHomeHub.js';
import { Scheduler } from './core/Scheduler.js';
import { TriggerManager } from './core/TriggerManager.js';
import { Thermostat } from './devices/Thermostat.js';
import { Logger } from './utils/Logger.js';
import { DoorLock } from './devices/DoorLock.js';
import { Light } from './devices/Light.js';
import { ISmartDevice } from './interfaces/ISmartDevice.js';


// CLI prompt helper
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const promptUser = (question: string): Promise<string> => {
  return new Promise(resolve => rl.question(question, resolve));
};


// Main control loop
async function runInteractiveSystem() {
  Logger.info("--- Initializing Interactive Smart Home System ---");

  // step 1 create core components
  const hub = new SmartHomeHub();
  const scheduler = new Scheduler(hub);
  const triggerManager = new TriggerManager(hub);

  // step 2 setup observer pattern
  hub.registerObserver(triggerManager);

  // step 3 add initial devices via factory
  hub.addDevice("light", 1);
  hub.addDevice("thermostat", 2);
  hub.addDevice("door", 3);

  // step 4 configure automation trigger
  const light = hub.getDeviceById(1) as Light;
  const thermostat = hub.getDeviceById(2) as Thermostat;
  if (light && thermostat) {
    triggerManager.addTrigger(
      () => {
        const status = thermostat.getStatus();
        const statusParts = status.split(' ');
        const temperatureString = statusParts[statusParts.length - 2];
        const isLightOn = light.getStatus().includes("On");
        
        return parseFloat(temperatureString) > 75 && isLightOn;
      },
      () => {
  light.turnOff();
  hub.notifyObservers(); // notify observers of light change
      },
      "Turn off light 1 if thermostat goes above 75"
    );
  }

  Logger.info("--- System Ready ---");
  Logger.info("Type 'help' for commands or 'exit' to quit");
  
  let appIsRunning = true;
  while (appIsRunning) {
    // quick timer stand-in
    scheduler.checkSchedules();

    const input = await promptUser('> ');
    const parts = input.trim().split(' ');
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    try {
      let device: ISmartDevice | undefined;
      switch (command) {
        case 'status':
          hub.generateStatusReport();
          break;
        case 'turnon':
          device = hub.getDeviceById(parseInt(args[0]));
          device?.turnOn();
          hub.notifyObservers(); // broadcast state change
          break;
        case 'turnoff':
          device = hub.getDeviceById(parseInt(args[0]));
          device?.turnOff();
          hub.notifyObservers();
          break;
        case 'settemp':
          device = hub.getDeviceById(parseInt(args[0])) as Thermostat;
          if (device && device instanceof Thermostat) {
            device.setTemperature(parseInt(args[1]));
            hub.notifyObservers(); // trigger automation cascade
          } else {
            Logger.warn("Device is not a thermostat or not found");
          }
          break;

        case 'add':
        const type = args[0];
        const id = parseInt(args[1]);
  // basic validation
        if (!type || isNaN(id)) {
            Logger.warn("Usage: add <type> <id>. Example: add light 4");
            break;
        }
        if (hub.getDeviceById(id)) {
            Logger.warn(`Device with ID ${id} already exists.`);
            break;
        }
        hub.addDevice(type, id);
        break;

        case 'help':
            Logger.info("Available commands:");
            Logger.info("  status - View the status of all devices");
            Logger.info("  add <type> <id> - Add a new device (types: light, door)");
            Logger.info("  turnOn <id> - Turn a device on");
            Logger.info("  turnOff <id> - Turn a device off");
            Logger.info("  setTemp <id> <temp> - Set a thermostat's temperature");
            Logger.info("  exit - Close the application");
            break;
        case 'exit':
          appIsRunning = false;
          break;
        default:
          Logger.warn("Unknown command. Type 'help' for a list of commands.");
      }
    } catch (error) {
        Logger.error(`Command failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  Logger.info("Shutting down Smart Home System.");
  rl.close();
}

runInteractiveSystem();