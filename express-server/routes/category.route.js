const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getCategories);

module.exports = router;