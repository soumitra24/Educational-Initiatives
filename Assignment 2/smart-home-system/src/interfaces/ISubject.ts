import { IObserver } from "./IObserver.js";

// subject interface
// smart home hub uses this contract
export interface ISubject {
  registerObserver(o: IObserver): void;
  removeObserver(o: IObserver): void;
  notifyObservers(): void;
}