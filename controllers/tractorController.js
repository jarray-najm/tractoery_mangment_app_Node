const { Tractor } = require("../models");

exports.createTractor = async (req, res) => {
  try {
    const tractor = await Tractor.create(req.body);
    res.status(201).json(tractor);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the tractor." });
  }
};

exports.getAllTractors = async (req, res) => {
  try {
    const tractors = await Tractor.findAll({
      // include: ["Rental", "Expense", "Usage"], // Include associated models
    });
    res.status(200).json(tractors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching tractors." });
  }
};

exports.getTractorById = async (req, res) => {
  try {
    const tractor = await Tractor.findByPk(req.params.id, {
      include: ["Rental", "Expense", "Usage"], // Include associated models
    });
    if (tractor) {
      res.status(200).json(tractor);
    } else {
      res.status(404).json({ error: "Tractor not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tractor." });
  }
};

exports.updateTractor = async (req, res) => {
  try {
    const [updated] = await Tractor.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTractor = await Tractor.findByPk(req.params.id, {
        include: ["Rental", "Expense", "Usage"], // Include associated models
      });
      res.status(200).json(updatedTractor);
    } else {
      res.status(404).json({ error: "Tractor not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the tractor." });
  }
};

exports.deleteTractor = async (req, res) => {
  try {
    const deleted = await Tractor.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Tractor not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the tractor." });
  }
};
