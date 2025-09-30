const DEFAULT_POSITION = { x: 0, y: 0 } as const;
const DEFAULT_MOVEMENT = 50;

// Using prototype pattern lets make an army of undead minions of the necromancer
// I used a pre-made UndeadSoldier prototype to quickly clone new minions, avoiding the expensive cost for each one
// Prototype: ICloneable interface & UndeadSoldier class
// Client: NecromancerSpawner


// A simple type for position
type Position = { x: number, y: number };

const ensureCoordinate = (value: number, label: string) => {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number`);
  }
  return value;
};

const clonePosition = (position: Position): Position => ({ x: ensureCoordinate(position.x, "x"), y: ensureCoordinate(position.y, "y") });

// The prototype interface
interface ICloneable {
  clone(): ICloneable;
}

// The concrete prototype
class UndeadSoldier implements ICloneable {
  public health: number;
  public attackPower: number;
  public position: Position;

  constructor(health: number, attackPower: number) {
    // Simulate an expensive magical binding
    console.log("Binding spirit to corpse... ");
    this.health = health;
    this.attackPower = attackPower;
    this.position = { ...DEFAULT_POSITION };
    console.log("Undead soldier forged", { health: this.health, attackPower: this.attackPower });
  }

  // The cloning method creates a new object by copying the current one
  public clone(): UndeadSoldier {
    const clone = new UndeadSoldier(this.health, this.attackPower);
    clone.position = clonePosition(this.position);
    console.log("Undead soldier cloned", { position: clone.position });
    return clone;
  }
}

// Manages and raises minions from registered prototypes
class NecromancerSpawner {
  private prototypes = new Map<string, ICloneable>();

  public registerPrototype(name: string, minion: ICloneable): void {
    this.prototypes.set(name, minion);
    console.log("Prototype registered", { name });
  }

  public raiseUndead(name: string): ICloneable | null {
    const prototype = this.prototypes.get(name);
    if (!prototype) {
      console.warn(`Prototype missing: ${name}`);
      return null;
    }
    return prototype.clone();
  }
}

// Client Code
const runPrototypeDemo = () => {
  try {
    const necromancer = new NecromancerSpawner();
    console.log("Preparing the first undead prototype...");
    const skeletonPrototype = new UndeadSoldier(75, 15);
    necromancer.registerPrototype("skeleton_warrior", skeletonPrototype);
    console.log("\nRaising an army for battle...");
    const soldier1 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;
    const soldier2 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;
    const soldier3 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;
    if (soldier1) {
      soldier1.position.x = ensureCoordinate(DEFAULT_MOVEMENT, "position");
    }
    console.log("Army raised", { soldiers: [soldier1, soldier2, soldier3].filter(Boolean).length });
    console.log("Undead Soldier 1:", soldier1);
    console.log("Undead Soldier 2:", soldier2);
    console.log("Undead Soldier 3:", soldier3);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Prototype demo failed: ${message}`);
  }
};

runPrototypeDemo();