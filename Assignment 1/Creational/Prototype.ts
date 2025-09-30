// Using prototype pattern lets make an army of undead minions of the necromancer
// I used a pre-made UndeadSoldier prototype to quickly clone new minions, avoiding the expensive cost for each one
// Prototype: ICloneable interface & UndeadSoldier class
// Client: NecromancerSpawner


// A simple type for position
type Position = { x: number, y: number };

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
    this.position = { x: 0, y: 0 };
  }

  // The cloning method creates a new object by copying the current one
  public clone(): UndeadSoldier {
    const clone = new UndeadSoldier(this.health, this.attackPower);
    clone.position = { ...this.position };
    return clone;
  }
}

// Manages and raises minions from registered prototypes
class NecromancerSpawner {
  private prototypes = new Map<string, ICloneable>();

  public registerPrototype(name: string, minion: ICloneable): void {
    this.prototypes.set(name, minion);
  }

  public raiseUndead(name: string): ICloneable | null {
    const prototype = this.prototypes.get(name);
    return prototype ? prototype.clone() : null;
  }
}

// Client Code
const necromancer = new NecromancerSpawner();

console.log("Preparing the first undead prototype...");
const skeletonPrototype = new UndeadSoldier(75, 15);
necromancer.registerPrototype("skeleton_warrior", skeletonPrototype);

console.log("\nRaising an army for battle...");
// The necromancer uses the fast clone() method for the rest

const soldier1 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;
const soldier2 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;
const soldier3 = necromancer.raiseUndead("skeleton_warrior") as UndeadSoldier;

// Command one of the minions to move, showing they are independent
if (soldier1) {
    soldier1.position.x = 50;
}

console.log("Undead Soldier 1:", soldier1);
console.log("Undead Soldier 2:", soldier2);
console.log("Undead Soldier 3:", soldier3);