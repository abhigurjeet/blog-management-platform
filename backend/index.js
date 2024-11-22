const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(JSON.stringify({ sayHello: "Hello World" }));
});

app.listen("3001", () => {
  console.log("server is up and running");
});
