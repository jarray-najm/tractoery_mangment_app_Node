const { Usage, Invoice, Equipment } = require("../models"); // Adjust the path according to your setup

exports.createUsage = async (req, res) => {
  const { rental_id, payment_status } = req.body;
  const {
    tractor_id,
    equipment_id,
    driver_id,
    location,
    start_time,
    end_time,
    hours_used,
    task_description,
  } = req.body;

  try {
    // Extract and validate the necessary data
    const usageData = {
      tractor_id,
      equipment_id,
      driver_id,
      rental_id,
      location,
      start_time,
      end_time,
      hours_used,
      task_description,
    };

    // Step 1: Create the usage record
    const usage = await Usage.create(usageData);

    // Step 2: Fetch the equipment record to get Price_hours
    const equipment = await Equipment.findByPk(equipment_id);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    // Calculate total_price using Price_hours from Equipment
    const total_price = equipment.Price_hours * hours_used;

    // Step 3: Create the invoice record
    const invoice = await Invoice.create({
      rental_id,
      usage_id: usage.id, // Assuming usage_id is available in the Invoice model
      total_price,
      payment_status,
    });

    // Step 4: Update the usage record with the invoice_id
    usage.invoice_id = invoice.id;
    await usage.save();

    // Respond with the created records
    res.status(201).json({ usage, invoice });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      error: "An error occurred while creating the usage record and invoice.",
    });
  }
};

exports.getAllUsages = async (req, res) => {
  try {
    const usages = await Usage.findAll({
      include: ["Tractor", "Equipment", "Driver", "Rental"], // Include associated models
    });
    res.status(200).json(usages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching usage records." });
  }
};

exports.getUsageById = async (req, res) => {
  try {
    const usage = await Usage.findByPk(req.params.id, {
      include: ["Tractor", "Equipment", "Driver", "Rental"], // Include associated models
    });
    if (usage) {
      res.status(200).json(usage);
    } else {
      res.status(404).json({ error: "Usage record not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the usage record." });
  }
};

exports.updateUsage = async (req, res) => {
  try {
    const [updated] = await Usage.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUsage = await Usage.findByPk(req.params.id, {
        include: ["Tractor", "Equipment", "Driver", "Rental", "Report"], // Include associated models
      });
      res.status(200).json(updatedUsage);
    } else {
      res.status(404).json({ error: "Usage record not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the usage record." });
  }
};

exports.deleteUsage = async (req, res) => {
  try {
    const deleted = await Usage.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Usage record not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the usage record." });
  }
};
