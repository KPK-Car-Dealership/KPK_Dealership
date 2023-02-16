require("dotenv").config(".env");
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const jwt = require("jsonwebtoken");
const { auth } = require("express-openid-connect");

const { Car } = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  res.send("Get route");
});
app.post("/", async (req, res, next) => {
  res.send("post route");
});
app.delete("/", async (req, res, next) => {
  res.send("delete route");
});
app.put("/", async (req, res, next) => {
  res.send("put route");
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

app.listen(PORT, () => {
  console.log(`Cupcakes are ready at http://localhost:${PORT}`);
});
