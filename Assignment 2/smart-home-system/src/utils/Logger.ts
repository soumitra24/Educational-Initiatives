// simple console logger
export class Logger {
  
  // current timestamp helper
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  // log info message
  public static info(message: string): void {
    console.log(`[${this.getTimestamp()}] [INFO] ${message}`);
  }
  
  // log warning message
  public static warn(message: string): void {
    console.warn(`[${this.getTimestamp()}] [WARN] ${message}`);
  }

  // log error message
  public static error(message: string): void {
    console.error(`[${this.getTimestamp()}] [ERROR] ${message}`);
  }
}