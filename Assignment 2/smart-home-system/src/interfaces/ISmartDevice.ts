// smart device contract
export interface ISmartDevice {
  id: number;
  type: string;

  // readable status string
  getStatus(): string;

  // basic device commands
  turnOn(): void;
  turnOff(): void;
}