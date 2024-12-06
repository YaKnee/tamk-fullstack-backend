import WebSocket,{ WebSocketServer } from "ws";

// Store and update client connections in a set
const connectedClients = new Set();

export const initializeWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    // Specify what we do whenever there is a new client
    wss.on("connection", (ws) => {
        console.log("WebSocket connection established.");
        connectedClients.add(ws);
        ws.send("Welcome to the WebSocket Server!");

        // Handle incoming messages
        ws.on("message", (message) => {
            console.log(` Message received: ${message}`);
            connectedClients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        // Handle disconnects
        ws.on("close", () => {
            console.log("WebSocket client connection closed.");
            connectedClients.delete(ws);
        });

        // Handle errors
        ws.on("error", (err) => {
            console.error("WebSocket Error: ", err);
        });
    })
};