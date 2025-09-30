# Assignment 1 – High Fantasy MMORPG Design Patterns

## Game context
We are building subsystems for a high fantasy MMORPG where raiding parties, necromancers, and sharpshooters all need tailored support. Each pattern-based demo focuses on a slice of gameplay that our engine must handle reliably, from forging heroes to managing enchanted gear.

## Pattern summaries

### Creational patterns
- **Builder (`Creational/Builder.ts`)** – Provides an interactive command-line loop for assembling a hero. Players can set the race, class, and gear for a character step by step, reset mid-build, and view the evolving character sheet. Input validation guards against empty selections so the final build is always ready for questing.
- **Prototype (`Creational/Prototype.ts`)** – Models a necromancer who forges a single skeletal warrior, registers it as a prototype, and then clones it to raise an undead army instantly. Copying preserves stats and position while avoiding the cost of rebinding spirits with every summon.

### Behavioral patterns
- **Chain of Responsibility (`Behavioural/ChainOfResponsibility.ts`)** – Routes incoming damage through armor, elemental resistance, and magic shields. Each handler mutates the attack according to its specialty, yielding the final amount the player suffers.
- **Memento (`Behavioural/Memento.ts`)** – Captures and restores an adventurer’s session, including health, level, and overworld position. The caretaker manages save slots so the originator can roll back safely after a dangerous dungeon dive.

### Structural patterns
- **Composite (`Structural/Composite.ts`)** – Treats items and pouches uniformly to model nested backpacks. Each composite aggregates its children’s weight, making inventory math and pretty-printing of contents straightforward.
- **Decorator (`Structural/Decorator.ts`)** – Allows weapons to gain layered enchantments. A basic crossbow can receive enchanted sights for accuracy and poisoned tips for extra damage without modifying the base class.

## Running the demos
Each TypeScript file can be executed on its own. From the project root, run (Node 18+ suggested):

```powershell
npx ts-node "Assignment 1/Creational/Builder.ts"
npx ts-node "Assignment 1/Creational/Prototype.ts"
npx ts-node "Assignment 1/Behavioural/ChainOfResponsibility.ts"
npx ts-node "Assignment 1/Behavioural/Memento.ts"
npx ts-node "Assignment 1/Structural/Composite.ts"
npx ts-node "Assignment 1/Structural/Decorator.ts"
```

The builder demo launches an interactive menu; the others print scenario logs immediately. Feel free to tweak constants in each script to explore different combat encounters or loot tables.
