const express = require("express");
const {
  addExpenses,
  getExpensesEntry,
  deleteEntry,
  singleEntry,
} = require("../controllers/expenses-conrtoller");
const expensesRouter = express.Router();
// add expenses
expensesRouter.post("/add", addExpenses);
// get all entry
expensesRouter.get("/all-entry", getExpensesEntry);
// delete entry
expensesRouter.delete("/delete-entry/:id", deleteEntry);
// single entry
expensesRouter.get("/single-entry/:id", singleEntry);

module.exports = expensesRouter;
