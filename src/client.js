"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
// client.ts
const websocket = new ws_1.default("ws://localhost:8080");
websocket.on('open', () => {
    console.log("WebSocket connected");
});
websocket.onmessage = (event) => {
    const message = event.data;
    console.log("Received message:", message);
    // Update the HTML with the received message
    const messageElement = document.getElementById("message");
    //   if (messageElement) {
    //     messageElement.textContent = message;
    //   }
};
websocket.onerror = (event) => {
    console.error("WebSocket error:", event);
};
// Send a message when the button is clicked
const sendButton = document.getElementById("sendButton");
if (sendButton) {
    sendButton.addEventListener("click", () => {
        const message = "Hello from client!";
        websocket.send(message);
    });
}
