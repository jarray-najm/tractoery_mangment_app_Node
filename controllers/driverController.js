const { Driver } = require("../models");

exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the driver." });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching drivers." });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ error: "Driver not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the driver." });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const [updated] = await Driver.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDriver = await Driver.findByPk(req.params.id);
      res.status(200).json(updatedDriver);
    } else {
      res.status(404).json({ error: "Driver not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const deleted = await Driver.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Driver not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the driver." });
  }
};
