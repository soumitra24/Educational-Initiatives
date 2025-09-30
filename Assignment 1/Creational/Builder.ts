//Lets use builder pattern to create some characters in our game
//In this code we define a HeroBuilder that constructs a complex Character object step-by-step
// Product: Character
// Builder: ICharacterBuilder interface
// Concrete Builder: HeroBuilder

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptUser = (question: string): Promise<string> => {
  return new Promise(resolve => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

const ensureText = (value: string, label: string): string => {
  if (!value || !value.trim()) {
    throw new Error(`${label} cannot be empty`);
  }
  return value.trim();
};

// The complex object we want to build
class Character {
  public race: string | null = null;
  public characterClass: string | null = null;
  public equipment: string[] = [];

  public display(): void {
    console.log("\n*** CHARACTER SHEET ***");
    console.log(`Race: ${this.race || 'Not set'}`);
    console.log(`Class: ${this.characterClass || 'Not set'}`);
    const equipmentList = this.equipment.length > 0 ? this.equipment.join(", ") : 'None';
    console.log(`Equipment: ${equipmentList}`);
    console.log("***********************\n");
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
  
  public reset(): void {
    this.character = new Character();
  }

  public setRace(race: string): this {
    this.character.race = ensureText(race, "Race");
    return this;
  }

  public setClass(characterClass: string): this {
    this.character.characterClass = ensureText(characterClass, "Class");
    return this;
  }

  public addEquipment(item: string): this {
    this.character.equipment.push(ensureText(item, "Equipment"));
    return this;
  }
  
  public getResult(): Character {
    const result = this.character;
    // We don't reset here so the user can see the final product
    // The reset option is now manual
    return result;
  }
  
  // A helper to see the current state without finalizing the build
  public displayCurrentBuild(): void {
    this.character.display();
  }
}

// Main interactive application loop
const runInteractiveBuilder = async () => {
  const heroBuilder = new HeroBuilder();
  let appIsRunning = true;

  console.log("--- Welcome to the Interactive Character Builder ---");

  while (appIsRunning) {
    heroBuilder.displayCurrentBuild();
    const choice = await promptUser(
      "Choose an action:\n" +
      "1. Set Race\n" +
      "2. Set Class\n" +
      "3. Add Equipment\n" +
      "4. Finish and Display Character\n" +
      "5. Reset Character\n" +
      "6. Exit\n" +
      "> "
    );

    try {
      switch (choice.trim()) {
        case '1':
          const raceChoice = await promptUser("Choose a Race (Human, Elf, Dwarf): ");
          heroBuilder.setRace(raceChoice);
          break;
        case '2':
          const classChoice = await promptUser("Choose a Class (Paladin, Rogue, Mage): ");
          heroBuilder.setClass(classChoice);
          break;
        case '3':
          const equipment = await promptUser("Enter an equipment item: ");
          heroBuilder.addEquipment(equipment);
          break;
        case '4':
          const finalCharacter = heroBuilder.getResult();
          console.log("Your character is complete!");
          finalCharacter.display();
          break;
        case '5':
          heroBuilder.reset();
          console.log("Character has been reset.");
          break;
        case '6':
          appIsRunning = false;
          console.log("Exiting builder...");
          break;
        default:
          console.log("Invalid choice, please try again.");
      }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`\nError: ${message}\n`);
    }
  }

  rl.close();
};

runInteractiveBuilder();