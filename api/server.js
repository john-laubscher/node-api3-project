const helmet = require("helmet");
const express = require("express");
const userRouter = require("./users/users-router.js");

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use(helmet());
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get("/api", (req, res) => {
  res.send(`<h2> this is the server.api</h2>`);
});

module.exports = server;
