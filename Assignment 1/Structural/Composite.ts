const INDENT = "  ";

// This code uses the Composite pattern to treat an individual Item (Leaf)
// and a container Pouch (Composite) uniformly. This allows us to
// calculate the total weight of a nested inventory recursively.

const ensureWeight = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Weight must be a non-negative number");
  }
  return value;
};

const ensureItem = (item: InventoryItem) => {
  if (!item) {
    throw new Error("Inventory item is required");
  }
  return item;
};

// The component interface declares common operations for all objects
interface InventoryItem {
  name: string;
  getWeight(): number;
  display(indent?: string): void;
}

// The Leaf is a basic item that cannot contain other items
class Item implements InventoryItem {
  constructor(public name: string, private weight: number) {
    this.weight = ensureWeight(weight);
  }

  public getWeight(): number {
    return this.weight;
  }
  
  public display(indent = ""): void {
      console.log(`${indent}- ${this.name} (${this.weight} kg)`);
  }
}

// The Composite is a container that can hold Leafs or other Composites
class Pouch implements InventoryItem {
  private children: InventoryItem[] = [];

  constructor(public name: string, private baseWeight: number) {
    this.baseWeight = ensureWeight(baseWeight);
  }
  
  public add(item: InventoryItem): void {
    this.children.push(ensureItem(item));
  }

  // The core of the pattern: calculate weight by asking children
  public getWeight(): number {
    let totalWeight = this.baseWeight;
    for (const child of this.children) {
      totalWeight += child.getWeight(); // Delegate to each child
    }
    return totalWeight;
  }
  
  public display(indent = ""): void {
      console.log(`${indent}> ${this.name} (${this.getWeight()} kg)`);
      for (const child of this.children) {
          child.display(indent + INDENT);
      }
  }
}


const runCompositeDemo = () => {
  try {
    const sword = new Item("Iron Sword", 5);
    const potion = new Item("Health Potion", 1);
    const scroll = new Item("Fireball Scroll", 0.5);
    const smallPouch = new Pouch("Leather Pouch", 1);
    smallPouch.add(potion);
    smallPouch.add(scroll);
    const mainBackpack = new Pouch("Adventurer's Backpack", 3);
    mainBackpack.add(sword);
    mainBackpack.add(smallPouch);
    console.log("--- Displaying Backpack Contents ---");
    mainBackpack.display();
    console.log(`\n--- Calculating Total Weight ---`);
    console.log(`Total backpack weight: ${mainBackpack.getWeight()} kg`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Composite demo failed: ${message}`);
  }
};

runCompositeDemo();