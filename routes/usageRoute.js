const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");

router.post("/", usageController.createUsage);
router.get("/", usageController.getAllUsages);
router.get("/:id", usageController.getUsageById);
router.put("/:id", usageController.updateUsage);
router.delete("/:id", usageController.deleteUsage);

module.exports = router;
