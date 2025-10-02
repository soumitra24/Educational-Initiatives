// automation observer
import { IObserver } from "../interfaces/IObserver.js";
import { ISubject } from "../interfaces/ISubject.js";
import { SmartHomeHub } from "./SmartHomeHub.js";
import { Logger } from "../utils/Logger.js";

// trigger shape
interface ITrigger {
  condition: () => boolean;
  action: () => void;
  description: string;
}

export class TriggerManager implements IObserver {
  private triggers: ITrigger[] = [];
  constructor(private hub: SmartHomeHub) {}

  // update hook from subject
  public update(subject: ISubject): void {
    // ensure update source is hub
    if (subject instanceof SmartHomeHub) {
      Logger.info("TriggerManager received an update from the Hub, checking conditions...");
      this.checkTriggers();
    }
  }

  public addTrigger(condition: () => boolean, action: () => void, description: string): void {
    this.triggers.push({ condition, action, description });
    Logger.info(`Added trigger: ${description}`);
  }
  
  // evaluate triggers
  private checkTriggers(): void {
    for (const trigger of this.triggers) {
      if (trigger.condition()) {
        Logger.info(`Condition met for trigger: '${trigger.description}', executing action`);
        trigger.action();
      }
    }
  }
}