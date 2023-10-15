const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

mongoose.connect(
  "mongodb+srv://nugrahaadhitama22:rahasia@cluster0.erbr00v.mongodb.net/test?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  res.json("Hello");
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
