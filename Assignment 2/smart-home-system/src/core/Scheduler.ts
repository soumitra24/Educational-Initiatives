// schedule manager
import { SmartHomeHub } from "./SmartHomeHub.js";
import { Logger } from "../utils/Logger.js";
import { CommandParser } from "../utils/CommandParser.js";

interface IScheduledTask {
  deviceId: number;
  time: string; // format HH:MM
  command: string;
  hasExecuted: boolean;
}

export class Scheduler {
  private tasks: IScheduledTask[] = [];
  // requires hub reference
  constructor(private hub: SmartHomeHub) {}

  public addSchedule(deviceId: number, time: string, command: string): void {
    this.tasks.push({ deviceId, time, command, hasExecuted: false });
    Logger.info(`Scheduled '${command}' for device ${deviceId} at ${time}`);
  }

  // simplified timer pass
  public checkSchedules(): void {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    for (const task of this.tasks) {
      if (task.time === currentTime && !task.hasExecuted) {
        Logger.info(`Executing scheduled task: ${task.command} for device ${task.deviceId}`);
        const parsedCommand = CommandParser.parse(task.command);
        const device = this.hub.getDeviceById(task.deviceId);
        
      if (parsedCommand && device) {
        // basic execution logic
        if (parsedCommand.action === 'turnOn') device.turnOn();
        if (parsedCommand.action === 'turnOff') device.turnOff();
        }
  task.hasExecuted = true; // prevents repeat within minute
      }
    }
  }
}