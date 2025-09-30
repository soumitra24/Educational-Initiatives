//This code shows how a damage request is passed along a chain of handlers (armor, resistance, shields), each modifying the final damage amount.
//Handler: DamageHandler abstract class
//Concrete Handlers: ArmorHandler, ElementalResistanceHandler, MagicShieldHandler
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
// Damage object passed through the chain
var Damage = /** @class */ (function () {
    function Damage(amount, type) {
        this.amount = amount;
        this.type = type;
    }
    return Damage;
}());
// The abstract handler interface defines the chain
var DamageHandler = /** @class */ (function () {
    function DamageHandler() {
        this.nextHandler = null;
    }
    //set next link
    DamageHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    // Handle the request or pass it on
    DamageHandler.prototype.handle = function (damage) {
        if (this.nextHandler) {
            return this.nextHandler.handle(damage);
        }
        return damage;
    };
    return DamageHandler;
}());
// Concrete Handlers
// Reduces damage by a flat armor value
var ArmorHandler = /** @class */ (function (_super) {
    __extends(ArmorHandler, _super);
    function ArmorHandler(armorValue) {
        var _this = _super.call(this) || this;
        _this.armorValue = armorValue;
        return _this;
    }
    ArmorHandler.prototype.handle = function (damage) {
        if (damage.type === 'Physical') {
            damage.amount -= this.armorValue;
        }
        // Pass to the next handler
        return _super.prototype.handle.call(this, damage);
    };
    return ArmorHandler;
}(DamageHandler));
// Reduces fire damage by a percentage
var ElementalResistanceHandler = /** @class */ (function (_super) {
    __extends(ElementalResistanceHandler, _super);
    function ElementalResistanceHandler(resistancePercent) {
        var _this = _super.call(this) || this;
        _this.resistancePercent = resistancePercent;
        return _this;
    }
    ElementalResistanceHandler.prototype.handle = function (damage) {
        if (damage.type === 'Fire') {
            damage.amount *= (1 - this.resistancePercent / 100);
        }
        // Pass to the next handler
        return _super.prototype.handle.call(this, damage);
    };
    return ElementalResistanceHandler;
}(DamageHandler));
// Absorbs a certain amount of any damage
var MagicShieldHandler = /** @class */ (function (_super) {
    __extends(MagicShieldHandler, _super);
    function MagicShieldHandler(shieldHealth) {
        var _this = _super.call(this) || this;
        _this.shieldHealth = shieldHealth;
        return _this;
    }
    MagicShieldHandler.prototype.handle = function (damage) {
        var absorbed = Math.min(this.shieldHealth, damage.amount);
        damage.amount -= absorbed;
        this.shieldHealth -= absorbed;
        // Pass to the next handler
        return _super.prototype.handle.call(this, damage);
    };
    return MagicShieldHandler;
}(DamageHandler));
// Client code
// Chain: Armor -> Elemental Resistance -> Magic Shield
var playerChain = new ArmorHandler(20);
playerChain
    .setNext(new ElementalResistanceHandler(30)) //30% fire resistance
    .setNext(new MagicShieldHandler(45));
// Scenario 1: Physical Attack
console.log("A hound attacks with a 100 damage Physical blow...");
var physicalDamage = new Damage(100, 'Physical');
physicalDamage = playerChain.handle(physicalDamage);
console.log("Final physical damage taken: ".concat(Math.round(physicalDamage.amount)));
// Scenario 2: Fire Attack
console.log("\nA Dragon attacks with a 200 damage Fire breath...");
var fireDamage = new Damage(200, 'Fire');
// We need a new chain instance because the shield's health was depleted
var newPlayerChain = new ArmorHandler(20);
newPlayerChain
    .setNext(new ElementalResistanceHandler(30))
    .setNext(new MagicShieldHandler(45));
fireDamage = newPlayerChain.handle(fireDamage);
console.log("Final fire damage taken: ".concat(Math.round(fireDamage.amount)));
