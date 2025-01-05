"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const deck_1 = require("../src/deck");
class Packet {
    constructor() {
        this.isDraw = false;
    }
}
class MyError extends Error {
    constructor(message, code) {
        super(message); // Pass the message to the base Error class
        this.code = code;
        this.name = "CustomError"; // Set the name of the error
    }
}
let numPlayers = 0;
let maxPlayers = 4;
let drawPile = new deck_1.Pile();
drawPile.deal();
// wss: web socket server
const wss = new ws_1.default.Server({ port: 8080 });
console.log(`Hosting on port ${8080}`);
function drawCard() {
    const card = drawPile.pop();
    if (card) {
        return card;
    }
    else {
        console.log('Deck is empty! Reshuffling');
        drawPile.deal();
        return drawCard();
    }
}
wss.on('connection', (ws) => {
    if (numPlayers >= maxPlayers) {
        console.log('Full game.');
        ws.send("Full game, sorry! What's the shape of Italy?");
        ws.close();
    }
    numPlayers++;
    console.log(`New client connected. Total number: ${numPlayers}`);
    ws.on('message', (message) => {
        const obj = JSON.parse(message);
        if (obj instanceof Packet) {
            console.log('Bad request');
        }
        if (obj.isDraw) {
            let card = drawCard();
            ws.send(JSON.stringify(card));
        }
    });
    ws.on('close', () => {
        numPlayers--;
        console.log('Client disconnected');
    });
});
