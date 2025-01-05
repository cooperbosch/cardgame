import WebSocket from 'ws';
import {Card, Pile} from '../src/deck';

class Packet{
  isDraw = false;
}

class MyError extends Error {
  constructor(message: string, public code: number) {
    super(message); // Pass the message to the base Error class
    this.name = "CustomError"; // Set the name of the error
  }
}

let numPlayers = 0;
let maxPlayers = 4;
let playerIds = [0,1,2,3];
let drawPile = new Pile();
drawPile.deal();


// wss: web socket server
const wss = new WebSocket.Server({ port: 8080 });
console.log(`Hosting on port ${8080}`);

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

wss.on('connection', (ws: WebSocket) => {
  if (numPlayers >= maxPlayers){
    console.log('Full game.')
    ws.send("Full game, sorry! What's the shape of Italy?");
    ws.close();
  }
  let playerId = numPlayers++;
  console.log(playerId);
  numPlayers++;
  console.log(`New client connected. Total number: ${numPlayers}`);

  ws.on('message', (message: string) => {
    const obj = JSON.parse(message);
    if (obj !instanceof Packet){
      console.log('Bad request');
    }
    if (obj.isDraw){
      let card = drawCard();
      ws.send(JSON.stringify(card));
    }
  });

  ws.on('close', () => {
    numPlayers--;
    console.log('Client disconnected');
  });
});
