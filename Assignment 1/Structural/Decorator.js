// I used the Decorator pattern to add magical enchantments to a base Crossbow object dynamically
// Each enchantment "wraps" the weapon, altering its abilities
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// The concrete component is the base object we decorate
var BasicCrossbow = /** @class */ (function () {
    function BasicCrossbow() {
    }
    BasicCrossbow.prototype.getDamage = function () {
        return 40;
    };
    BasicCrossbow.prototype.getAccuracy = function () {
        return 60;
    };
    BasicCrossbow.prototype.getDescription = function () {
        return "Basic Crossbow";
    };
    return BasicCrossbow;
}());
// The base decorator holds a reference to a wrapped weapon
var WeaponEnchantmentDecorator = /** @class */ (function () {
    function WeaponEnchantmentDecorator(weapon) {
        this.wrappedWeapon = weapon;
    }
    WeaponEnchantmentDecorator.prototype.getDamage = function () {
        return this.wrappedWeapon.getDamage();
    };
    WeaponEnchantmentDecorator.prototype.getAccuracy = function () {
        return this.wrappedWeapon.getAccuracy();
    };
    WeaponEnchantmentDecorator.prototype.getDescription = function () {
        return this.wrappedWeapon.getDescription();
    };
    return WeaponEnchantmentDecorator;
}());
// Concrete Decorators
// An enchanted sight adds accuracy
var EnchantedSightDecorator = /** @class */ (function (_super) {
    __extends(EnchantedSightDecorator, _super);
    function EnchantedSightDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnchantedSightDecorator.prototype.getAccuracy = function () {
        return this.wrappedWeapon.getAccuracy() + 25;
    };
    EnchantedSightDecorator.prototype.getDescription = function () {
        return this.wrappedWeapon.getDescription() + ", with an Enchanted Sight";
    };
    return EnchantedSightDecorator;
}(WeaponEnchantmentDecorator));
// Poisoned tips add extra damage
var PoisonTipDecorator = /** @class */ (function (_super) {
    __extends(PoisonTipDecorator, _super);
    function PoisonTipDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PoisonTipDecorator.prototype.getDamage = function () {
        // Adds poison damage on top of the base damage
        return this.wrappedWeapon.getDamage() + 20;
    };
    PoisonTipDecorator.prototype.getDescription = function () {
        return this.wrappedWeapon.getDescription() + ", with Poison Tips";
    };
    return PoisonTipDecorator;
}(WeaponEnchantmentDecorator));
// Client Code
// Start with a basic crossbow
var crossbow = new BasicCrossbow();
console.log("Equip Basic Crossbow");
console.log("".concat(crossbow.getDescription(), " | Damage: ").concat(crossbow.getDamage(), ", Accuracy: ").concat(crossbow.getAccuracy()));
// Now, enchant it with a magical sight
crossbow = new EnchantedSightDecorator(crossbow);
console.log("\nAdding an Enchanted Sight");
console.log("".concat(crossbow.getDescription(), " | Damage: ").concat(crossbow.getDamage(), ", Accuracy: ").concat(crossbow.getAccuracy()));
// Now, add poison to the already enchanted crossbow
crossbow = new PoisonTipDecorator(crossbow);
console.log("\nApplying Poison to the Tips");
console.log("".concat(crossbow.getDescription(), " | Damage: ").concat(crossbow.getDamage(), ", Accuracy: ").concat(crossbow.getAccuracy()));
