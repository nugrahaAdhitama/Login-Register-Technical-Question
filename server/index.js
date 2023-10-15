const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");

mongoose.connect(
  "mongodb+srv://nugrahaadhitama22:rahasia@cluster0.erbr00v.mongodb.net/test?retryWrites=true&w=majority"
);

const app = express();
app.use(express.json());

// app.use(
//   cors({
//     origin: "https://login-register-technical-question-sooty.vercel.app",
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://login-register-technical-question-sooty.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Check if email is already registered
  UserModel.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash and salt password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error: " + err });
      }

      // Store hashed password in database
      UserModel.create({ ...req.body, password: hashedPassword })
        .then((users) => {
          res.status(201).json({
            message: "Welcome to our application.",
          });
        })
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "You haven't registered yet!" });
    }

    // Compare submitted password with stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json("Error: " + err);
      }

      if (isMatch) {
        res.json({
          message: "Welcome back.",
          user: {
            name: user.name,
          },
        });
      } else {
        res.status(400).json({ message: "Email or password is incorrect!" });
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Server is running...");
});
