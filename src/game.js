"use strict";
// Manages game logic on server side
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
const deck_1 = require("../src/deck");
let drawPile = new deck_1.Pile();
drawPile.deal();
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
function dealCards() {
    let cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(drawCard());
    }
}
function handleRequest(req, playerId) {
    switch (req.type) {
        case "draw":
            const card = drawCard();
            return { send: true, data: card };
        case "eot":
            console.log(`Player ${playerId} ended their turn.`);
            return { send: false };
        default:
            return { send: false };
    }
}
