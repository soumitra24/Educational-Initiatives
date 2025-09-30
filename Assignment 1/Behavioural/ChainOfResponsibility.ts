//This code shows how a damage request is passed along a chain of handlers (armor, resistance, shields), each modifying the final damage amount.
//Handler: DamageHandler abstract class
//Concrete Handlers: ArmorHandler, ElementalResistanceHandler, MagicShieldHandler
const ARMOR_VALUE = 20;
const FIRE_RESISTANCE_PERCENT = 30;
const SHIELD_HEALTH = 45;

type DamageType = 'Physical' | 'Fire' | 'Ice';

const ensureAmount = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Damage amount must be a non-negative number");
  }
  return value;
};

const ensureType = (value: DamageType) => value;

// Damage object passed through the chain
class Damage {
  constructor(public amount: number, public type: DamageType) {
    this.amount = ensureAmount(amount);
    this.type = ensureType(type);
  }

  public clone(): Damage {
    return new Damage(this.amount, this.type);
  }
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
const createPlayerChain = () => {
  const chain = new ArmorHandler(ARMOR_VALUE);
  chain
    .setNext(new ElementalResistanceHandler(FIRE_RESISTANCE_PERCENT))
    .setNext(new MagicShieldHandler(SHIELD_HEALTH));
  return chain;
};

const runScenario = (description: string, amount: number, type: DamageType) => {
  try {
    const chain = createPlayerChain();
    const incoming = new Damage(amount, type);
    const result = chain.handle(incoming.clone());
    const rounded = Math.round(result.amount);
    console.log(`Final ${result.type.toLowerCase()} damage taken: ${rounded}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Scenario failed: ${message}`);
  }
};

console.log("A hound attacks with a 100 damage Physical blow...");
runScenario("Physical damage processed", 100, 'Physical');

console.log("\nA Dragon attacks with a 200 damage Fire breath...");
runScenario("Fire damage processed", 200, 'Fire');