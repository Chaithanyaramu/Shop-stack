const express = require("express")
const router = express.Router();
const {getProducts,addProduct,updateProduct,deleteProduct} 
= require("../controller/products.controller");
router.get("/",getProducts);
router.post("/",addProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

module.exports = router;