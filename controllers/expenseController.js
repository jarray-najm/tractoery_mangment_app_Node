const { Expense } = require("../models");

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the expense." });
    console.log(error);
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching expenses.$error",
        error,
      });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: "Expense not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the expense." });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const [updated] = await Expense.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedExpense = await Expense.findByPk(req.params.id);
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ error: "Expense not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the expense." });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Expense not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the expense." });
  }
};
