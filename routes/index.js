const router = require("express").Router();
router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Randalf's home page");
});

router.use("/employee", require("./employee"));
router.use("/user", require("./user"));

module.exports = router;
