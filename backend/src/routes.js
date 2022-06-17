const { Router } = require("express");

const router = Router();

const AddProductController = require("./controllers/AddProductController");
const FindProductController = require("./controllers/FindProductController");

router.post("/add", AddProductController.store);
router.get("/read", FindProductController.search);
// router.put("/edit/:id", EditProductController.change);
// router.delete("/delete/:id", DeleteProductController.delete);

module.exports = router;