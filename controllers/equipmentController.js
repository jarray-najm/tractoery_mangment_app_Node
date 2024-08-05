const { Equipment } = require("../models");

exports.createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the equipment." });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    res.status(200).json(equipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching equipment." });
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ error: "Equipment not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the equipment." });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const [updated] = await Equipment.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedEquipment = await Equipment.findByPk(req.params.id);
      res.status(200).json(updatedEquipment);
    } else {
      res.status(404).json({ error: "Equipment not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the equipment." });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const deleted = await Equipment.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Equipment not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the equipment." });
  }
};
