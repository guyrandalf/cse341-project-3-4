const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/Employee");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getSingle);
router.post("/", isAuthenticated, validation.storeEmployee, employeeController.createEmployee);
router.put("/:id", isAuthenticated, validation.storeEmployee, employeeController.updateEmployee);
router.delete("/:id", isAuthenticated, employeeController.deleteEmployee);

module.exports = router;
