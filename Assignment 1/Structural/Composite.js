// This code uses the Composite pattern to treat an individual Item (Leaf)
// and a container Pouch (Composite) uniformly. This allows us to
// calculate the total weight of a nested inventory recursively.
// The Leaf is a basic item that cannot contain other items
var Item = /** @class */ (function () {
    function Item(name, weight) {
        this.name = name;
        this.weight = weight;
    }
    Item.prototype.getWeight = function () {
        return this.weight;
    };
    Item.prototype.display = function () {
        console.log("- ".concat(this.name, " (").concat(this.weight, " kg)"));
    };
    return Item;
}());
// The Composite is a container that can hold Leafs or other Composites
var Pouch = /** @class */ (function () {
    function Pouch(name, baseWeight) {
        this.name = name;
        this.baseWeight = baseWeight;
        this.children = [];
    }
    Pouch.prototype.add = function (item) {
        this.children.push(item);
    };
    // The core of the pattern: calculate weight by asking children
    Pouch.prototype.getWeight = function () {
        var totalWeight = this.baseWeight;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            totalWeight += child.getWeight(); // Delegate to each child
        }
        return totalWeight;
    };
    Pouch.prototype.display = function () {
        console.log("> ".concat(this.name, " (").concat(this.getWeight(), " kg)"));
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            // Indent children for a tree view
            process.stdout.write("  ");
            child.display();
        }
    };
    return Pouch;
}());
// --- Client Code: How to use it ---
// Create some individual items (Leafs)
var sword = new Item("Iron Sword", 5);
var potion = new Item("Health Potion", 1);
var scroll = new Item("Fireball Scroll", 0.5);
// Create a small pouch (Composite) and add items to it
var smallPouch = new Pouch("Leather Pouch", 1);
smallPouch.add(potion);
smallPouch.add(scroll);
// Create the main backpack (another Composite)
var mainBackpack = new Pouch("Adventurer's Backpack", 3);
// Add a simple item directly to the backpack
mainBackpack.add(sword);
// Add the entire smallPouch (a Composite) inside the backpack
mainBackpack.add(smallPouch);
console.log("--- Displaying Backpack Contents ---");
mainBackpack.display();
console.log("\n--- Calculating Total Weight ---");
// The client code doesn't need to know about the nesting
console.log("Total backpack weight: ".concat(mainBackpack.getWeight(), " kg"));
