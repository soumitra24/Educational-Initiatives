//This code shows how a damage request is passed along a chain of handlers (armor, resistance, shields), each modifying the final damage amount.
//Handler: DamageHandler abstract class
//Concrete Handlers: ArmorHandler, ElementalResistanceHandler, MagicShieldHandler



// Damage object passed through the chain
class Damage {
  constructor(public amount: number, public type: 'Physical' | 'Fire' | 'Ice') {}
}

// The abstract handler interface defines the chain
abstract class DamageHandler {
  protected nextHandler: DamageHandler | null = null;

  //set next link
  public setNext(handler: DamageHandler): DamageHandler {
    this.nextHandler = handler;
    return handler;
  }

  // Handle the request or pass it on
  public handle(damage: Damage): Damage {
    if (this.nextHandler) {
      return this.nextHandler.handle(damage);
    }
    return damage;
  }
}

// Concrete Handlers
// Reduces damage by a flat armor value
class ArmorHandler extends DamageHandler {
  constructor(private armorValue: number) {
    super();
  }

  public handle(damage: Damage): Damage {
    if (damage.type === 'Physical') {
      damage.amount -= this.armorValue;
    }
    // Pass to the next handler
    return super.handle(damage);
  }
}

// Reduces fire damage by a percentage
class ElementalResistanceHandler extends DamageHandler {
  constructor(private resistancePercent: number) {
    super();
  }

  public handle(damage: Damage): Damage {
    if (damage.type === 'Fire') {
      damage.amount *= (1 - this.resistancePercent / 100);
    }
    // Pass to the next handler
    return super.handle(damage);
  }
}

// Absorbs a certain amount of any damage
class MagicShieldHandler extends DamageHandler {
  constructor(private shieldHealth: number) {
    super();
  }

  public handle(damage: Damage): Damage {
    const absorbed = Math.min(this.shieldHealth, damage.amount);
    damage.amount -= absorbed;
    this.shieldHealth -= absorbed;
    // Pass to the next handler
    return super.handle(damage);
  }
}

// Client code
// Chain: Armor -> Elemental Resistance -> Magic Shield
const playerChain = new ArmorHandler(20);
playerChain
  .setNext(new ElementalResistanceHandler(30)) //30% fire resistance
  .setNext(new MagicShieldHandler(45));

// Scenario 1: Physical Attack
console.log("A hound attacks with a 100 damage Physical blow...");
let physicalDamage = new Damage(100, 'Physical');
physicalDamage = playerChain.handle(physicalDamage);
console.log(`Final physical damage taken: ${Math.round(physicalDamage.amount)}`);

// Scenario 2: Fire Attack
console.log("\nA Dragon attacks with a 200 damage Fire breath...");
let fireDamage = new Damage(200, 'Fire');
// We need a new chain instance because the shield's health was depleted
const newPlayerChain = new ArmorHandler(20);
newPlayerChain
    .setNext(new ElementalResistanceHandler(30))
    .setNext(new MagicShieldHandler(45));

fireDamage = newPlayerChain.handle(fireDamage);
console.log(`Final fire damage taken: ${Math.round(fireDamage.amount)}`);