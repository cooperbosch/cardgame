// Manages game logic on server side

import {Card, Pile, } from '../src/deck';

let drawPile = new Pile();
drawPile.deal();

type RequestType = "draw" | "deal" | "eot";

interface Request {
    type : RequestType
}

function drawCard() : Card {
    const card = drawPile.pop();
    if (card){
        return card;
    } else {
        console.log('Deck is empty! Reshuffling');
        drawPile.deal();
        return drawCard();
    }
}

function dealCards() {
    let cards = [];
    for (let i = 0; i < 5; i++){
        cards.push(drawCard());
    }
}

export function handleRequest(req: Request, playerId : number) {
    switch (req.type){
        case "draw":
            const card = drawCard();
            return {send: true, data : card};
        case "eot":
            console.log(`Player ${playerId} ended their turn.`);
            return {send: false};
        default:
            return {send: false};
    }
}