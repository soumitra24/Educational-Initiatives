const BASE_DAMAGE = 40;
const BASE_ACCURACY = 60;
const ENCHANTED_SIGHT_BONUS = 25;
const POISON_TIP_BONUS = 20;

// I used the Decorator pattern to add magical enchantments to a base Crossbow object dynamically
// Each enchantment "wraps" the weapon, altering its abilities

const ensureWeapon = (weapon: IWeapon) => {
  if (!weapon) {
    throw new Error("Weapon instance is required");
  }
  return weapon;
};

const ensureBonus = (value: number) => {
  if (!Number.isFinite(value)) {
    throw new Error("Bonus must be a finite number");
  }
  return value;
};

// The component interface defines the common methods
interface IWeapon {
  getDamage(): number;
  getAccuracy(): number;
  getDescription(): string;
}

// The concrete component is the base object we decorate
class BasicCrossbow implements IWeapon {
  public getDamage(): number {
    return BASE_DAMAGE;
  }
  public getAccuracy(): number {
    return BASE_ACCURACY;
  }
  public getDescription(): string {
    return "Basic Crossbow";
  }
}

// The base decorator holds a reference to a wrapped weapon
abstract class WeaponEnchantmentDecorator implements IWeapon {
  protected wrappedWeapon: IWeapon;

  constructor(weapon: IWeapon) {
    this.wrappedWeapon = ensureWeapon(weapon);
  }

  public getDamage(): number {
    return this.wrappedWeapon.getDamage();
  }
  public getAccuracy(): number {
    return this.wrappedWeapon.getAccuracy();
  }
  public getDescription(): string {
    return this.wrappedWeapon.getDescription();
  }
}

// Concrete Decorators
// An enchanted sight adds accuracy
class EnchantedSightDecorator extends WeaponEnchantmentDecorator {
  private readonly bonus: number;

  constructor(weapon: IWeapon, bonus: number = ENCHANTED_SIGHT_BONUS) {
    super(weapon);
    this.bonus = ensureBonus(bonus);
  }

  public getAccuracy(): number {
    return this.wrappedWeapon.getAccuracy() + this.bonus;
  }
  public getDescription(): string {
    return this.wrappedWeapon.getDescription() + ", with an Enchanted Sight";
  }
}

// Poisoned tips add extra damage
class PoisonTipDecorator extends WeaponEnchantmentDecorator {
  private readonly bonus: number;

  constructor(weapon: IWeapon, bonus: number = POISON_TIP_BONUS) {
    super(weapon);
    this.bonus = ensureBonus(bonus);
  }

  public getDamage(): number {
    // Adds poison damage on top of the base damage
    return this.wrappedWeapon.getDamage() + this.bonus;
  }
  public getDescription(): string {
    return this.wrappedWeapon.getDescription() + ", with Poison Tips";
  }
}

// Client Code
const runDecoratorDemo = () => {
  try {
    let crossbow: IWeapon = new BasicCrossbow();
    console.log("Equip Basic Crossbow");
    console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);
    crossbow = new EnchantedSightDecorator(crossbow);
    console.log("\nAdding an Enchanted Sight");
    console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);
    crossbow = new PoisonTipDecorator(crossbow);
    console.log("\nApplying Poison to the Tips");
    console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Decorator demo failed: ${message}`);
  }
};

runDecoratorDemo();