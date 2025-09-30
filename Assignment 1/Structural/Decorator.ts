// I used the Decorator pattern to add magical enchantments to a base Crossbow object dynamically
// Each enchantment "wraps" the weapon, altering its abilities

// The component interface defines the common methods
interface IWeapon {
  getDamage(): number;
  getAccuracy(): number;
  getDescription(): string;
}

// The concrete component is the base object we decorate
class BasicCrossbow implements IWeapon {
  public getDamage(): number {
    return 40;
  }
  public getAccuracy(): number {
    return 60;
  }
  public getDescription(): string {
    return "Basic Crossbow";
  }
}

// The base decorator holds a reference to a wrapped weapon
abstract class WeaponEnchantmentDecorator implements IWeapon {
  protected wrappedWeapon: IWeapon;

  constructor(weapon: IWeapon) {
    this.wrappedWeapon = weapon;
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
  public getAccuracy(): number {
    return this.wrappedWeapon.getAccuracy() + 25;
  }
  public getDescription(): string {
    return this.wrappedWeapon.getDescription() + ", with an Enchanted Sight";
  }
}

// Poisoned tips add extra damage
class PoisonTipDecorator extends WeaponEnchantmentDecorator {
  public getDamage(): number {
    // Adds poison damage on top of the base damage
    return this.wrappedWeapon.getDamage() + 20;
  }
  public getDescription(): string {
    return this.wrappedWeapon.getDescription() + ", with Poison Tips";
  }
}

// Client Code
// Start with a basic crossbow
let crossbow: IWeapon = new BasicCrossbow();
console.log("Equip Basic Crossbow");
console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);

// Now, enchant it with a magical sight
crossbow = new EnchantedSightDecorator(crossbow);
console.log("\nAdding an Enchanted Sight");
console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);

// Now, add poison to the already enchanted crossbow
crossbow = new PoisonTipDecorator(crossbow);
console.log("\nApplying Poison to the Tips");
console.log(`${crossbow.getDescription()} | Damage: ${crossbow.getDamage()}, Accuracy: ${crossbow.getAccuracy()}`);