// This code uses the Composite pattern to treat an individual Item (Leaf)
// and a container Pouch (Composite) uniformly. This allows us to
// calculate the total weight of a nested inventory recursively.

// The component interface declares common operations for all objects
interface InventoryItem {
  name: string;
  getWeight(): number;
  display(): void;
}

// The Leaf is a basic item that cannot contain other items
class Item implements InventoryItem {
  constructor(public name: string, private weight: number) {}

  public getWeight(): number {
    return this.weight;
  }
  
  public display(): void {
      console.log(`- ${this.name} (${this.weight} kg)`);
  }
}

// The Composite is a container that can hold Leafs or other Composites
class Pouch implements InventoryItem {
  private children: InventoryItem[] = [];

  constructor(public name: string, private baseWeight: number) {}
  
  public add(item: InventoryItem): void {
    this.children.push(item);
  }

  // The core of the pattern: calculate weight by asking children
  public getWeight(): number {
    let totalWeight = this.baseWeight;
    for (const child of this.children) {
      totalWeight += child.getWeight(); // Delegate to each child
    }
    return totalWeight;
  }
  
  public display(): void {
      console.log(`> ${this.name} (${this.getWeight()} kg)`);
      for (const child of this.children) {
          // Indent children for a tree view
          process.stdout.write("  ");
          child.display();
      }
  }
}


// --- Client Code: How to use it ---
// Create some individual items (Leafs)
const sword = new Item("Iron Sword", 5);
const potion = new Item("Health Potion", 1);
const scroll = new Item("Fireball Scroll", 0.5);

// Create a small pouch (Composite) and add items to it
const smallPouch = new Pouch("Leather Pouch", 1);
smallPouch.add(potion);
smallPouch.add(scroll);

// Create the main backpack (another Composite)
const mainBackpack = new Pouch("Adventurer's Backpack", 3);
// Add a simple item directly to the backpack
mainBackpack.add(sword);
// Add the entire smallPouch (a Composite) inside the backpack
mainBackpack.add(smallPouch);

console.log("--- Displaying Backpack Contents ---");
mainBackpack.display();

console.log(`\n--- Calculating Total Weight ---`);
// The client code doesn't need to know about the nesting
console.log(`Total backpack weight: ${mainBackpack.getWeight()} kg`);