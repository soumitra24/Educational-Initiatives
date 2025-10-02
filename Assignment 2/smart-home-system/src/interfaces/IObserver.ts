import { ISubject } from "./ISubject.js";

// observer interface
export interface IObserver {
  // subject update hook
  update(subject: ISubject): void;
}