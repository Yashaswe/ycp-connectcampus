const express = require("express");
const router = express.Router();

const { createEmergency, getAllEmergencies, getEmergenciesByDept  } = require("../../controllers/emergency/emergency.controller");

router.route("/create-emergency").post(createEmergency);
router.route("/get-all").get(getAllEmergencies);
router.route("/get-by-dept").get(getEmergenciesByDept);

module.exports = router;
