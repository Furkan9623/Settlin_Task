const { createError } = require("../middleware/ErrorHandling");
const Expenses = require("../models/expenses-schema");

// add controller
const addExpenses = async (req, res, next) => {
  const { title, date, amount, category } = req.body;
  if (!title || !date || !amount || !category)
    return next(createError("All field are required", 400, "add controller"));
  try {
    const newEntry = new Expenses({ ...req.body });
    await newEntry.save();
    return res.status(200).json({
      success: true,
      message: "success full entry",
    });
  } catch (error) {
    return next(createError(error.message, 500, "add controller"));
  }
};

// get entry
const getExpensesEntry = async (req, res, next) => {
  try {
    const allEntry = await Expenses.find({});
    if (!allEntry)
      return next(createError("Not Entry found", 500, "get controller"));
    return res.status(200).json({
      success: true,
      message: "all entry",
      allEntry,
    });
  } catch (error) {
    return next(createError(error.message, 500, "get controller"));
  }
};
// delet eentry
const deleteEntry = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!id)
    return next(
      createError("please provide valid id", 400, "delete controller")
    );
  try {
    const delete_entry = await Expenses.findByIdAndDelete({ _id: id });
    if (!delete_entry)
      return next(
        createError("Some thing went wrong", 500, "delete controller")
      );
    return res.status(200).json({
      success: true,
      message: "entry removed",
    });
  } catch (error) {
    return next(createError(error.message, 500, "delete controller"));
  }
};

const singleEntry = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      createError("Please provide id", 400, "single entry controller")
    );
  try {
    const single_entry = await Expenses.findOne({ _id: id });
    if (!single_entry)
      return next(
        createError("something went wrong", 500, "single entry controller")
      );
    return res.status(200).json({
      success: true,
      message: "fetch single entry",
      single_entry,
    });
  } catch (error) {
    return next(createError(error.message, 500, "single entry"));
  }
};
module.exports = { addExpenses, getExpensesEntry, deleteEntry, singleEntry };
