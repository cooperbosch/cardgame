// Manages browser display and recieves client inputs

import {dealHand, drawCard} from "./client";

let serverURL;

let socket;
// variables for the DOM elements:
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;
let drawButton;
let eotButton;
let dealButton;

let hand = [];

function setup() {
// get all the DOM elements that need listeners:
    console.log('Ran setup');
    incomingSpan = document.getElementById('incoming');
    // outgoingText = document.getElementById('outgoing');
    connectionSpan = document.getElementById('connection');
    connectButton = document.getElementById('connectButton');
    drawButton = document.getElementById('draw');
    eotButton = document.getElementById('eot');
    dealButton = document.getElementById('deal');
    // set the listeners:
    // outgoingText.addEventListener('change', sendMessage);
    connectButton.addEventListener('click', changeConnection);
    drawButton.addEventListener('click', drawCard);
    eotButton.addEventListener('click', endTurn);
    dealButton.addEventlListener('click', dealHand);
    serverURL = document.getElementById('serverURL').value;
    openSocket(serverURL);
}

function openSocket(url) {
    // open the socket:
    socket = new WebSocket(url);
    socket.addEventListener('open', openConnection);
    socket.addEventListener('close', closeConnection);
    socket.addEventListener('message', readIncomingMessage);
}


function changeConnection(event) {
    // open the connection if it's closed, or close it if open:
    if (socket.readyState === WebSocket.CLOSED) {
        openSocket(serverURL);
    } else {
        socket.close();
    }
}

function openConnection() {
    // display the change of state:
    connectionSpan.innerHTML = "true";
    connectButton.value = "Disconnect";
}

function closeConnection() {
    // display the change of state:
    connectionSpan.innerHTML = "false";
    connectButton.value = "Connect";
}

function readIncomingMessage(event) {
    // display the incoming message:
    console.log(event.data);
    incomingSpan.innerHTML = event.data;
    let resp = JSON.parse(event.data);
    let msg = resp.value;
    incomingSpan.innerHTML = msg;
}

function sendMessage() {
    //if the socket's open, send a message:
    if (socket.readyState === WebSocket.OPEN) {
        // socket.send(outgoingText.value);
    }
}

function drawCard() {
    if (socket.readyState === WebSocket.OPEN) {
        let req = {type: "draw"};
        socket.send(JSON.stringify(req));
    }
}

function endTurn() {
    if (socket.readyState === WebSocket.OPEN) {
        let req = {type: "eot"};
        socket.send(JSON.stringify(req));
    }
}


// add a listener for the page to load:
window.addEventListener('load', setup);