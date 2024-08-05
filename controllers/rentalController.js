const { Rental } = require("../models");

exports.createRental = async (req, res) => {
  try {
    const rental = await Rental.create(req.body);
    res.status(201).json(rental);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the rental." });
  }
};

exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      // include: ["Client", "Tractor", "Equipment", "Invoice"], // Include associated models
    });
    res.status(200).json(rentals);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching rentals." });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id, {
      include: ["Client", "Tractor", "Equipment", "Invoice"], // Include associated models
    });
    if (rental) {
      res.status(200).json(rental);
    } else {
      res.status(404).json({ error: "Rental not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the rental." });
  }
};

exports.updateRental = async (req, res) => {
  try {
    const [updated] = await Rental.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRental = await Rental.findByPk(req.params.id, {
        include: ["Client", "Tractor", "Equipment", "Invoice"], // Include associated models
      });
      res.status(200).json(updatedRental);
    } else {
      res.status(404).json({ error: "Rental not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the rental." });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const deleted = await Rental.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Rental not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the rental." });
  }
};
