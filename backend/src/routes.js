const { Router } = require("express");

const router = Router();

const AddProductController = require("./controllers/AddProductController");
const FindProductController = require("./controllers/FindProductController");

router.post("/add", AddProductController.add);
router.get("/list", FindProductController.show)
router.get("/list/:filter", FindProductController.filtered);
// router.put("/edit/:id", EditProductController.change);
// router.delete("/delete/:id", DeleteProductController.delete);

module.exports = router;