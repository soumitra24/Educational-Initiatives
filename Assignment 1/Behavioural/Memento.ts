const DEFAULT_HEALTH = 100;
const DEFAULT_LEVEL = 1;
const POSITION_STEP = 10;
const HEALTH_STEP = -10;

// This code demonstrates how to save and restore the state of a GameSession object without exposing its internal details.

// Originator: GameSession
// Memento: GameSnapshot
// Caretaker: SaveManager

// player position
type Vector3 = {
  x: number;
  y: number;
  z: number;
};

const ensureVector = (position: Vector3): Vector3 => {
  if (!Number.isFinite(position.x) || !Number.isFinite(position.y) || !Number.isFinite(position.z)) {
    throw new Error("Position must contain finite numbers");
  }
  return position;
};

const clampHealth = (value: number) => (value < 0 ? 0 : value);
const clampLevel = (value: number) => (value < 1 ? 1 : value);

// Memento
class GameSnapshot {
  public readonly health: number;
  public readonly level: number;
  public readonly position: Vector3;

  constructor(health: number, level: number, position: Vector3) {
    this.health = clampHealth(health);
    this.level = clampLevel(level);
    this.position = { ...ensureVector(position) };
    console.log(`(Memento created: Level ${this.level}, Health ${this.health})`);
  }
}

//Originator
//This is the main game object whose state we want to save
export class GameSession {
  private health: number;
  private level: number;
  private position: Vector3;

  constructor() {
    this.health = DEFAULT_HEALTH;
    this.level = DEFAULT_LEVEL;
    this.position = { x: 0, y: 0, z: 0 };
  }

  // Simulates playing the game and changing the state
  play(): void {
    this.level = clampLevel(this.level + 1);
    this.health = clampHealth(this.health + HEALTH_STEP);
    this.position.x += POSITION_STEP;
    console.log(`\nRunning, Jumping, Fighting, having fun...`);
    this.printStatus();
  }

  // Creates a snapshot of its current state
  public createSnapshot(): GameSnapshot {
    console.log(`(Originator: Saving state to Snapshot...)`);
    return new GameSnapshot(this.health, this.level, this.position);
  }

  // Restores its state from a Snapshot object
  public restoreFromSnapshot(snapshot: GameSnapshot): void {
    this.health = clampHealth(snapshot.health);
    this.level = clampLevel(snapshot.level);
    this.position = { ...ensureVector(snapshot.position) };
    console.log(`\n(Originator: State restored from Snapshot.)`);
  }

  public printStatus(): void {
    console.log(
      `Current State: Level=${this.level}, Health=${this.health}, Position=(${this.position.x}, ${this.position.y}, ${this.position.z})`
    );
  }
}

// Caretaker
// This object is responsible for storing the Snapshots
class SaveManager {
  private slots: GameSnapshot[] = [];

  public saveGame(session: GameSession): void {
    console.log(`(Caretaker: Receiving Snapshot and storing it...)`);
    this.slots.push(session.createSnapshot());
  }

  public loadGame(session: GameSession): void {
    const lastSnapshot = this.slots.pop();
    if (lastSnapshot) {
      console.log(`(Caretaker: Giving Snapshot back to Originator...)`);
      session.restoreFromSnapshot(lastSnapshot);
    } else {
      console.log("No save file to load!");
      console.warn("Load requested with no snapshots");
    }
  }
}

// --- Client Code ---
const runMementoDemo = () => {
  try {
    const gameSession = new GameSession();
    const gameSaveManager = new SaveManager();
    console.log("Starting Game");
    gameSession.printStatus();
    gameSession.play();
    console.log("\nSaving Progress...");
    gameSaveManager.saveGame(gameSession);
    gameSession.play();
    console.log("\nLoading Previous Save");
    gameSaveManager.loadGame(gameSession);
    gameSession.printStatus();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Memento demo failed: ${message}`);
  }
};

runMementoDemo();
