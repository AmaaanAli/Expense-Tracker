const express = require("express");
const Expense = require("../models/Expense");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("Token Error:", err.message);
    res.status(400).json({ error: "Invalid token" });
  }
};

// CRUD Operations
router.post("/", authenticate, async (req, res) => {
  const { category, amount, description } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user,
      category,
      amount,
      description,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
