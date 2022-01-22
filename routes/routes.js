const express = require("express");
const User = require("../Schema/user");

const Biology = require("../Schema/biologyS");
const Physics = require("../Schema/physicsS");
const Chemistry = require("../Schema/chemistryS");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/middleware");
const { Router } = require("express");

const Route = express.Router();

require("../db/conn");
require("../Schema/user");

Route.get("/home", authenticate, (req, res) => {
  res.status(200).json(req.userFound);
});

Route.post("/logout", async (req, res) => {
  const Cleared = await res.clearCookie("Leaders");
  if (Cleared) {
    res.status(200).json("cleared sesion");
  }
});
Route.post("/register", async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  let token;

  if (!email || !password || !name || !phoneNumber) {
    res.status(400).json({ message: "Enter All Fields" });
  } else {
    const UserExits = await User.findOne({ email: email });
    if (UserExits) {
      res.status(400).json({ message: "User already Exits" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });
      const addedUser = await user.save();
      if (addedUser) {
        res.status(200).json({ message: "User added" });
      } else {
        res.status(400).json({ message: "Error in Registering User" });
      }
    }
  }
});
Route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Enter Both Fields." });
  }
  const userExits = await User.findOne({ email: email });

  if (!userExits) {
    res.status(400).json({ message: "Invalid Email or Password" });
  } else {
    if (userExits.password === password) {
      token = await userExits.generateAuthToken();
      res.cookie("Leaders", token, {
        expires: new Date(Date.now() + 258920000),
        httpOnly: true,
      });

      res.status(200).json({ message: "user found" });
    } else {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  }
});

Route.get("/alltests/biology", async (req, res) => {
  const allBiologyTests = await Biology.find({});
  if (allBiologyTests) {
    res.status(200).json(allBiologyTests);
  } else {
    res.status(400).json({ message: "No Test Published Yet" });
  }
});
Route.get("/alltests/physics", async (req, res) => {
  const allPhysicsTests = await Physics.find({});
  if (allPhysicsTests) {
    res.status(200).json(allPhysicsTests);
  } else {
    res.status(400).json({ message: "No Test Published Yet" });
  }
});
Route.get("/alltests/chemistry", async (req, res) => {
  const allChemistryTests = await Chemistry.find({});
  if (allChemistryTests) {
    res.status(200).json(allChemistryTests);
  } else {
    res.status(400).json({ message: "No Test Published Yet" });
  }
});
Route.get("/get/test/subjectcode/:testId", async (req, res) => {
  const testId = req.params.testId;
  const subject = testId.charAt(0);
  console.log(subject);
  if (subject === "b") {
    const biologyTest = await Biology.findOne({ TestId: testId });
    if (biologyTest) {
      res.status(200).json(biologyTest);
    }
  } else if (subject === "p") {
    const physicsTest = await Physics.findOne({ TestId: testId });
    if (physicsTest) {
      res.status(200).json(physicsTest);
    }
  } else if (subject === "c") {
    const ChemistryTest = await Chemistry.findOne({ TestId: testId });
    if (ChemistryTest) {
      res.status(200).json(ChemistryTest);
    }
  }
});
module.exports = Route;
