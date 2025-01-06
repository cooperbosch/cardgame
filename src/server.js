"use strict";
// Manages websockets on the server side
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const game_1 = require("./game");
class MyError extends Error {
    constructor(message, code) {
        super(message); // Pass the message to the base Error class
        this.code = code;
        this.name = "CustomError"; // Set the name of the error
    }
}
let numPlayers = 0;
let maxPlayers = 4;
let playerIds = Array.from({ length: maxPlayers }, (_, index) => index);
// wss: web socket server
const wss = new ws_1.default.Server({ port: 8080 });
console.log(`Hosting on port ${8080}`);
wss.on('connection', (ws) => {
    let playerId = playerIds.pop();
    if (playerId == undefined) {
        console.log('Full game.');
        ws.send("Full game, sorry! What's the shape of Italy?");
        ws.close();
    }
    else { // only continue if game is not full
        ws.send(playerId);
        numPlayers++;
        console.log(playerId);
        console.log(`New client connected. Total number: ${numPlayers}`);
        ws.on('message', (message) => {
            const obj = JSON.parse(message);
            const msg = (0, game_1.handleRequest)(obj, playerId);
            if (msg.data) {
                ws.send(JSON.stringify(msg.data));
            }
        });
        ws.on('close', () => {
            numPlayers--;
            playerIds.push(playerId);
            console.log('Client disconnected');
        });
    }
});
