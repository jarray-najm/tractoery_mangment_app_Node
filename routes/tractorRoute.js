const express = require("express");
const router = express.Router();
const tractorController = require("../controllers/tractorController");

router.post("/", tractorController.createTractor);
router.get("/", tractorController.getAllTractors);
router.get("/:id", tractorController.getTractorById);
router.put("/:id", tractorController.updateTractor);
router.delete("/:id", tractorController.deleteTractor);

module.exports = router;
