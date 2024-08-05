const { Report } = require("../models");

exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the report." });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: ["Usage", "Expense"], // Include associated models
    });
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching reports." });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: ["Usage", "Expense"], // Include associated models
    });
    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: "Report not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the report." });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const [updated] = await Report.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedReport = await Report.findByPk(req.params.id, {
        include: ["Usage", "Expense"], // Include associated models
      });
      res.status(200).json(updatedReport);
    } else {
      res.status(404).json({ error: "Report not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the report." });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deleted = await Report.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Report not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the report." });
  }
};
