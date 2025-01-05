"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pile = exports.Card = void 0;
class Card {
    constructor(value) {
        this.value = 0;
        this.value = value;
    }
}
exports.Card = Card;
const Deck = Array.from({ length: 10 }, (_, index) => new Card(index));
class Pile {
    constructor() {
        this.items = [];
    }
    deal() {
        this.items = [...Deck];
        this.shuffle();
    }
    shuffle() {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]]; // Swap elements
        }
    }
    // Add an element to the stack
    push(element) {
        this.items.push(element);
    }
    // Remove and return the top element
    pop() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return undefined;
        }
        return this.items.pop();
    }
    // Peek at the top element without removing it
    peek() {
        return this.items[this.items.length - 1];
    }
    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }
    // Get the size of the stack
    size() {
        return this.items.length;
    }
    // Clear the stack
    clear() {
        this.items = [];
    }
}
exports.Pile = Pile;
