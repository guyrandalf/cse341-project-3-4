const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/Employee");
const validation = require("../middleware/validate");

router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getSingle);
router.post("/", validation.storeEmployee, employeeController.createEmployee);
router.put("/:id", validation.storeEmployee, employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
