export class Card {
    value : number = 0;
    constructor(value: number){
      this.value = value;
    }
}

const Deck = Array.from({ length: 10}, (_, index) => new Card(index));

export class Pile {
    private items: Card[] = [];

    deal(): void {
        this.items = [... Deck];
        this.shuffle();
    }

    shuffle() {
        for (let i = this.items.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [this.items[i], this.items[j]] = [this.items[j], this.items[i]]; // Swap elements
        }
      }
  
    // Add an element to the stack
    push(element: Card): void {
      this.items.push(element);
    }
  
    // Remove and return the top element
    pop(): Card | undefined {
      if (this.isEmpty()) {
        console.log("Stack is empty");
        return undefined;
      }
      return this.items.pop();
    }
  
    // Peek at the top element without removing it
    peek(): Card | undefined {
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    // Get the size of the stack
    size(): number {
      return this.items.length;
    }
  
    // Clear the stack
    clear(): void {
      this.items = [];
    }
  }
  