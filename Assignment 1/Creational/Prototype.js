// Using prototype pattern lets make an army of undead minions of the necromancer
// I used a pre-made UndeadSoldier prototype to quickly clone new minions, avoiding the expensive cost for each one
// Prototype: ICloneable interface & UndeadSoldier class
// Client: NecromancerSpawner
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// The concrete prototype
var UndeadSoldier = /** @class */ (function () {
    function UndeadSoldier(health, attackPower) {
        // Simulate an expensive magical binding
        console.log("Binding spirit to corpse... ");
        this.health = health;
        this.attackPower = attackPower;
        this.position = { x: 0, y: 0 };
    }
    // The cloning method creates a new object by copying the current one
    UndeadSoldier.prototype.clone = function () {
        var clone = new UndeadSoldier(this.health, this.attackPower);
        clone.position = __assign({}, this.position);
        return clone;
    };
    return UndeadSoldier;
}());
// Manages and raises minions from registered prototypes
var NecromancerSpawner = /** @class */ (function () {
    function NecromancerSpawner() {
        this.prototypes = new Map();
    }
    NecromancerSpawner.prototype.registerPrototype = function (name, minion) {
        this.prototypes.set(name, minion);
    };
    NecromancerSpawner.prototype.raiseUndead = function (name) {
        var prototype = this.prototypes.get(name);
        return prototype ? prototype.clone() : null;
    };
    return NecromancerSpawner;
}());
// Client Code
var necromancer = new NecromancerSpawner();
console.log("Preparing the first undead prototype...");
var skeletonPrototype = new UndeadSoldier(75, 15);
necromancer.registerPrototype("skeleton_warrior", skeletonPrototype);
console.log("\nRaising an army for battle...");
// The necromancer uses the fast clone() method for the rest
var soldier1 = necromancer.raiseUndead("skeleton_warrior");
var soldier2 = necromancer.raiseUndead("skeleton_warrior");
var soldier3 = necromancer.raiseUndead("skeleton_warrior");
// Command one of the minions to move, showing they are independent
if (soldier1) {
    soldier1.position.x = 50;
}
console.log("Undead Soldier 1:", soldier1);
console.log("Undead Soldier 2:", soldier2);
console.log("Undead Soldier 3:", soldier3);
