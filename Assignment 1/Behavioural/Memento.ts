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

// Memento
class GameSnapshot {
  public readonly health: number;
  public readonly level: number;
  public readonly position: Vector3;

  constructor(health: number, level: number, position: Vector3) {
    this.health = health;
    this.level = level;
    this.position = { ...position };
    console.log(`(Memento created: Level ${level}, Health ${health})`);
  }
}

//Originator
//This is the main game object whose state we want to save
export class GameSession {
  private health: number;
  private level: number;
  private position: Vector3;

  constructor() {
    this.health = 100;
    this.level = 1;
    this.position = { x: 0, y: 0, z: 0 };
  }

  // Simulates playing the game and changing the state
  play(): void {
    this.level += 1;
    this.health -= 10;
    this.position.x += 10;
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
    this.health = snapshot.health;
    this.level = snapshot.level;
    this.position = { ...snapshot.position };
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
    }
  }
}

// --- Client Code ---
const gameSession = new GameSession();
const gameSaveManager = new SaveManager();

console.log("Starting Game");
gameSession.printStatus();

//play
gameSession.play();

//Save the game
console.log("\nSaving Progress...");
gameSaveManager.saveGame(gameSession);

//play some more
gameSession.play();

//tough boss? Let's load our previous save
console.log("\nLoading Previous Save");
gameSaveManager.loadGame(gameSession);
gameSession.printStatus();
