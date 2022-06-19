const { Router } = require("express");

const router = Router();

const CreateProductController = require("./controllers/CreateProductController");
const FindProductController = require("./controllers/FindProductController");
const EditProductController = require("./controllers/EditProductController");

router.post("/create", CreateProductController.create);
router.get("/list", FindProductController.show)
router.get("/list/:filter", FindProductController.filtered);
router.put("/edit/:id", EditProductController.edit);
// router.delete("/delete/:id", DeleteProductController.delete);

module.exports = router;