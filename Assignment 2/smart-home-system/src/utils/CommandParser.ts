// command parser
import { Logger } from "./Logger.js";

// parsed command shape
export interface ICommand {
  action: string;
  args: (string | number)[];
}

export class CommandParser {
  // parse command input
  public static parse(input: string): ICommand | null {
    try {
      // capture command and args
      const match = input.match(/(\w+)\((.*?)\)/);
      if (!match) {
        throw new Error("Invalid command format");
      }
      
      const action = match[1];
      // split and trim args
      const args = match[2] ? match[2].split(',').map(arg => {
        const trimmed = arg.trim();
        // cast numeric args
        return !isNaN(Number(trimmed)) ? Number(trimmed) : trimmed;
      }) : [];

      return { action, args };
    } catch (error) {
      Logger.error(`Failed to parse command '${input}': ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }
}