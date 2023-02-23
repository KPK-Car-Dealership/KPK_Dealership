const { sequelize } = require("./db");
require("dotenv").config(".env");
const cors = require("cors");
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, ADMIN_KEY } = process.env;
const { auth } = require("express-openid-connect");

const { Car, User } = require("./db");
const { Admin } = require("./db/Admin");

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
  try {
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else {
      const [, token] = auth.split(" ");
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const confirmAdmin = async (req, res, next) => {
  try {
    if (!req.user || typeof req.oidc.user == undefined) next();
    else {
      const admin = req.header("Admin");
      if (!admin) next();
      else {
        const verifyAdmin = admin === ADMIN_KEY;
        if (verifyAdmin) {
          let adminAccount = await Admin.findOrCreate({
            where: {
              username: req.user.username,
              name: req.user.name,
              password: req.user.password,
              email: req.user.email,
            },
          });
          req.admin = adminAccount;
          next();
        } else next();
      }
    }
  } catch (error) {
    next(error);
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

app.post("/", setUser, confirmAdmin, async (req, res, next) => {
  try {
    if (req.admin) {
      res.send("post route");
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});
app.delete("/", setUser, confirmAdmin, async (req, res, next) => {
  try {
    if (req.admin) {
      res.send("delete route");
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});
app.put("/", setUser, confirmAdmin, async (req, res, next) => {
  try {
    if (req.admin) {
      res.send("put route");
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = { app, sequelize };
