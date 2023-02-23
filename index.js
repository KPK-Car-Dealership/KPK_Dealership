const { sequelize } = require("./db");
require("dotenv").config(".env");
const cors = require("cors");
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { auth } = require("express-openid-connect");

const { Car, User } = require("./db");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_BASE_URL } =
  process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// middleware to find or create a user and save the user data in the db
app.use(async (req, res, next) => {
  if (!req?.oidc?.user) next();
  else {
    const [user] = await User.findOrCreate({
      where: {
        username: req.oidc.user.nickname,
        name: req.oidc.user.name,
        email: req.oidc.user.email,
      },
    });
    next();
  }
});

// auth middleware to use JWT and set the returned data as req.user
const setUser = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else {
    const [, token] = auth.split(" ");
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  }
};

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/cars", setUser, async (req, res, next) => {
  try {
    let user;
    if (req.oidc.user) {
      user = await User.findOne({
        where: { username: req?.oidc?.user?.nickname },
      });
    }

    if (req.user || user) {
      const cars = await Car.findAll();
      res.send(cars);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/me", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.oidc.user.nickname },
      raw: true,
    });
    if (user) {
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1w" });
      res.send({ user, token });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
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

module.exports = { app, sequelize };
