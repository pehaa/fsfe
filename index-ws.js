const e = require("express");
const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
	console.log("Express server started at port 3000");
});

/** Websocket  **/

const WebsocketServer = require("ws").Server;

const wss = new WebsocketServer({ server: server });
wss.on("connection", (ws) => {
	const numClients = wss.clients.size;
	console.log(`New client connected. Total clients: ${numClients}`);
	wss.broadcast(`Curreent visitors: ${numClients}`);
	// opened, closed or error
	if (ws.readyState === ws.OPEN) {
		ws.send("Welcome new client to my server!");
	}

	ws.on("close", (message) => {
		wss.broadcast(`Client disconnected. Total clients: ${numClients}`);
		console.log("Client disconnected");
	});
});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		client.send(data);
	});
};
