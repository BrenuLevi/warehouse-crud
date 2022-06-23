const { Router } = require("express");

const router = Router();

const CreateProductController = require("./controllers/CreateProductController");
const ListProductController = require("./controllers/ListProductController");
const EditProductController = require("./controllers/EditProductController");
const DeleteProductController = require("./controllers/DeleteProductController");

router.post("/create", CreateProductController.create);
router.get("/list", ListProductController.show)
router.put("/edit/:id", EditProductController.edit);
router.delete("/delete/:id", DeleteProductController.delete);

module.exports = router;