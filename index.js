// require your server and launch it
/////////code for adding to Heroku/////////
require("dotenv").config();
const express = require("express");

if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  server.use(cors());
}

server.use("*", (req, res) => {
  res.send("<h1>success<h1>");
});

const PORT = process.env.PORT || 7000;

const server = require("./api/server");

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});
