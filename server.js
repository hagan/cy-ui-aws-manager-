const express = require("express");
const next = require("next");

// Load environment vars
require("dotenv").config({ path: "./.env.local" });

// Maybe need to add tests to check for Environment variables required for project?

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const socketPath = process.env.NODE_SOCK;

app.prepare().then(() => {
  const server = express();

  // You can add your own express routes here
  server.get("/api/hello", (req, res) => {
    res.send("Hello from Express API");
  });

  // Handling Next.js page requests
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(socketPath, (err) => {
    if (err) throw err;
    console.log(` Ready on ${socketPath}`);
  });
});
