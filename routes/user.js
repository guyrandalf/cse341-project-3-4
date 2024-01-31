const express = require("express");
const router = express.Router();

const userController = require("../controllers/User");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", userController.getAll);
router.get("/:id", userController.getSingle);
router.post("/", isAuthenticated, validation.storeUser, userController.createUser);
router.put("/:id", isAuthenticated, validation.storeUser, userController.updateUser);
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
