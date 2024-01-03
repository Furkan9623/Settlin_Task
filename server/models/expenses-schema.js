const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    date: { type: String, required: [true, "date is required"] },
    amount: { type: String, required: [true, "amount is required.."] },
    category: { type: String, required: [true, "category is required."] },
  },
  { timestamps: true }
);

const Expenses = mongoose.model("Expenses", expensesSchema);
module.exports = Expenses;
