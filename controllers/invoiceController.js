const { Invoice } = require("../models");

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the invoice." });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching invoices." });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ error: "Invoice not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the invoice." });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const [updated] = await Invoice.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedInvoice = await Invoice.findByPk(req.params.id);
      res.status(200).json(updatedInvoice);
    } else {
      res.status(404).json({ error: "Invoice not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the invoice." });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Invoice not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the invoice." });
  }
};
