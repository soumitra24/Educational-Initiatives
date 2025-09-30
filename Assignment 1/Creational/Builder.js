//Lets use builder pattern to create some characters in our game
//In this code we define a HeroBuilder that constructs a complex Character object step-by-step
// Product: Character
// Builder: ICharacterBuilder interface
// Concrete Builder: HeroBuilder
// The complex object we want to build
var Character = /** @class */ (function () {
    function Character() {
        this.race = null;
        this.characterClass = null;
        this.equipment = [];
    }
    Character.prototype.display = function () {
        console.log("***Character Sheet***");
        console.log("Race: ".concat(this.race));
        console.log("Class: ".concat(this.characterClass));
        console.log("Equipment: ".concat(this.equipment.join(", ")));
    };
    return Character;
}());
// The concrete builder implements the steps
var HeroBuilder = /** @class */ (function () {
    function HeroBuilder() {
        this.character = new Character();
    }
    // A reset method to allow using the same builder for multiple characters
    HeroBuilder.prototype.reset = function () {
        this.character = new Character();
    };
    HeroBuilder.prototype.setRace = function (race) {
        this.character.race = race;
        return this;
    };
    HeroBuilder.prototype.setClass = function (characterClass) {
        this.character.characterClass = characterClass;
        return this;
    };
    HeroBuilder.prototype.addEquipment = function (item) {
        this.character.equipment.push(item);
        return this;
    };
    // The final method to retrieve the built object
    HeroBuilder.prototype.getResult = function () {
        var result = this.character;
        this.reset(); // Reset for the next build
        return result;
    };
    return HeroBuilder;
}());
// Client Code
var heroBuilder = new HeroBuilder();
console.log("Creating a Paladin...");
var paladin = heroBuilder
    .setRace("Human")
    .setClass("Paladin")
    .addEquipment("Plate Armor")
    .addEquipment("Greatsword")
    .addEquipment("Shield")
    .getResult();
paladin.display();
console.log("\nCreating a Rogue...");
// this builder instance can be reused
var rogue = heroBuilder
    .setRace("Elf")
    .setClass("Rogue")
    .addEquipment("Leather Tunic")
    .addEquipment("Dual Daggers")
    .getResult();
rogue.display();
