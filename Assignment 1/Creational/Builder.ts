//Lets use builder pattern to create some characters in our game
//In this code we define a HeroBuilder that constructs a complex Character object step-by-step
// Product: Character
// Builder: ICharacterBuilder interface
// Concrete Builder: HeroBuilder


// The complex object we want to build
class Character {
  public race: string | null = null;
  public characterClass: string | null = null;
  public equipment: string[] = [];

  public display(): void {
    console.log("***Character Sheet***");
    console.log(`Race: ${this.race}`);
    console.log(`Class: ${this.characterClass}`);
    console.log(`Equipment: ${this.equipment.join(", ")}`);
  }
}

// The builder interface defines the construction steps
interface ICharacterBuilder {
  setRace(race: string): this;
  setClass(characterClass: string): this;
  addEquipment(item: string): this;
  getResult(): Character;
}

// The concrete builder implements the steps
class HeroBuilder implements ICharacterBuilder {
  private character: Character;

  constructor() {
    this.character = new Character();
  }

  // A reset method to allow using the same builder for multiple characters
  public reset(): void {
    this.character = new Character();
  }

  public setRace(race: string): this {
    this.character.race = race;
    return this;
  }

  public setClass(characterClass: string): this {
    this.character.characterClass = characterClass;
    return this;
  }

  public addEquipment(item: string): this {
    this.character.equipment.push(item);
    return this;
  }

  // The final method to retrieve the built object
  public getResult(): Character {
    const result = this.character;
    this.reset(); // Reset for the next build
    return result;
  }
}

// Client Code
const heroBuilder = new HeroBuilder();

console.log("Creating a Paladin...")
const paladin = heroBuilder
  .setRace("Human")
  .setClass("Paladin")
  .addEquipment("Plate Armor")
  .addEquipment("Greatsword")
  .addEquipment("Shield")
  .getResult();

paladin.display();

console.log("\nCreating a Rogue...");
// this builder instance can be reused
const rogue = heroBuilder
  .setRace("Elf")
  .setClass("Rogue")
  .addEquipment("Leather Tunic")
  .addEquipment("Dual Daggers")
  .getResult();
  
rogue.display();