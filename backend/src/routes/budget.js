const express = require("express");
const Budget = require("../models/budget");
const router = new express.Router();

// CREATE
// nouveau budget
router.post("/budgets", async (req, res, next) => {
  const budget = new Budget(req.body);
  await budget.save();
  res.status(200).json(budget);
});

// READ
// recuperer tout les budgets
router.get("/budgets", async (req, res, next) => {
  try {
    const budgets = await Budget.find({});
    res.send(budgets);
  } catch (e) {
    res.status(500).send(e);
  }
});

// UPDATE
// modifier un budget
router.patch("budgets/:id", async (req, res, next) => {
  const updateBudget = Object.keys(req.body);

  try {
    updateBudget.forEach((update) => (req.budget[update] = req.body[update]));
    await req.body.save();

    res.send(req.budget);
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE
// supprimer un budget
router.patch("budgets/:id", async (req, res, next) => {
  const budgetId = req.params.id;

  try {
    const budget = await Budget.findByIdAndDelete(budgetId);
    if (!budget) return res.status(404).send("Operation not found!");
    res.send(budget);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
