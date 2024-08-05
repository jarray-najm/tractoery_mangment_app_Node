const { Client } = require("../models");

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the client." });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching clients." });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ error: "Client not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the client." });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const [updated] = await Client.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedClient = await Client.findByPk(req.params.id);
      res.status(200).json(updatedClient);
    } else {
      res.status(404).json({ error: "Client not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the client." });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Client.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Client not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the client." });
  }
};
