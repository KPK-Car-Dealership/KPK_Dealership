const { sequelize } = require("./db");
require("dotenv").config(".env");
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, ADMIN_KEY } = process.env;
const { auth } = require("express-openid-connect");
const bcrypt = require("bcrypt");

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

// Confirms user is logged in and verifies admin status by checking admin key matches
const confirmAdmin = async (req, res, next) => {
  try {
    // Checks if user logged in through Auth or sent a valid token
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
          // Adds admin object to req object. req.admin is checked in the route to verify this process has been completed
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

app.post("/user/register", async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const [user] = await User.findAll({ where: { email } });
    const SALT_COUNT = 10;
    console.log(password);

    if (!user?.email) {

      const hashedPw = await bcrypt.hash(password, SALT_COUNT);

      const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPw,
      });
      const token = jwt.sign({ newUser }, JWT_SECRET, { expiresIn: "1w" });
      res.send({ newUser, token });
    } else {
      throw new Error("User already exists");
    }
  } catch (error) {
    res.statusCode = 404;
    error.status = 404;
    next(error);
  }
});

app.post("/user/login", async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await User.findAll({ where: { email } });
  if (!user?.email) {
    return res.sendStatus(401);
  } else {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1w" });
    if (user.password) {
      const isAMatch = await bcrypt.compare(password, user.password);
      if (isAMatch) {
        return res.send({ user, token });
      } else {
        return res.status(401).send("Password is incorrect");
      }
    } else {
      return res.send({ user, token });
    }
  }
});

app.get("/user/token", setUser, async (req, res, next) => {
  try {
    if (req.oidc.user || req.user) {
      const user = await User.findOne({
        where: { username: req.oidc.user.nickname },
        raw: true,
      });

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1w" });
      res.send({ user, token });
    } else {
      // Sends 401 code if user is not accessing route after signing in with Auth0
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/cars", setUser, async (req, res, next) => {
  try {
    let user;
    // If user is logged in through Auth0 find their user data in the database
    if (req.oidc.user) {
      user = await User.findOne({
        where: { username: req?.oidc?.user?.nickname },
      });
    }

    // Returns the list of cars if user sends a token(for testing, req.user) or logins in through Auth0 (user)
    if (req.user || user) {
      const cars = await Car.findAll();
      res.send(cars);
    } else {
      //   // Sends 401 status code if user not logged in or sends a token
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/cars/:id", setUser, async (req, res, next) => {
  try {
    let user;
    // If user is logged in through Auth0 find their user data in the database
    if (req.oidc.user) {
      user = await User.findOne({
        where: { username: req?.oidc?.user?.nickname },
      });
    }

    // Returns the car if user sends a token(for testing, req.user) or logins in through Auth0 (user)
    if (req.user || user) {
      // Finds car in database and returns car if found
      const { id } = req.params;
      const car = await Car.findByPk(id);
      if (car == null) {
        res.status(404).send(`Car not found`);
      } else {
        res.send(car);
      }
    } else {
      // Sends 401 status code if user not logged in or does not send a token
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Returns token to be used for testing after user logs in through Auth0

app.post("/cars", setUser, confirmAdmin, async (req, res, next) => {
  try {
    // req.admin set by setUser and confirmAdmin middleware
    if (req.admin) {
      // Checks req.body object matches Car schema
      for (let attributes in Car.tableAttributes) {
        if (
          !attributes.match("id") &&
          !attributes.match("createdAt") &&
          !attributes.match("updatedAt")
        ) {
          if (!req.body[attributes].trim()) {
            return res.status(404).send(`${attributes} not defined`);
          }
        }
      }

      const car = await Car.create(req.body);
      const allCars = await Car.findAll();

      res.send(allCars);
    } else {
      // Sends 401 status code if user not logged in or does not send a token
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
app.delete("/cars/:id", setUser, confirmAdmin, async (req, res, next) => {
  try {
    // req.admin set by setUser and confirmAdmin middleware
    if (req.admin) {
      // Finds car in database and deletes car if found
      const { id } = req.params;
      const car = await Car.findByPk(id);
      if (car == null) {
        res.status(404).send(`Car not found`);
      } else {
        await car.destroy();
        const allCars = await Car.findAll();

        res.send(allCars);
      }
    } else {
      // Sends 401 status code if the user not logged in or does not send a token
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
app.put("/cars/:id", setUser, confirmAdmin, async (req, res, next) => {
  try {
    if (req.admin) {
      // Finds car in database and updates car if found
      const { id } = req.params;
      const car = await Car.findByPk(id);
      if (car == null) {
        res.status(404).send(`Car not found`);
      } else {
        // Checks req.body to update car fields where there are defined fields
        for (let attributes in Car.tableAttributes) {
          if (
            !attributes.match("id") &&
            !attributes.match("createdAt") &&
            !attributes.match("updatedAt")
          ) {
            if (req.body[attributes].trim()) {
              car.update({ [attributes]: req.body[attributes] });
            }
          }
        }

        res.send(car);
      }
    } else {
      // Sends 401 status code if user not logged in or does not send a token
      res.sendStatus(401);
    }
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