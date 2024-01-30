const express = require("express");
const router = express.Router();

const userController = require("../controllers/User");
const validation = require("../middleware/validate");

router.get("/", userController.getAll);
router.get("/:id", userController.getSingle);
router.post("/", validation.storeUser, userController.createUser);
router.put("/:id", validation.storeUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
