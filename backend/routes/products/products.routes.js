const express=require("express");
const router=express.Router();

const {createProduct, getAllProducts}=require("../../controllers/products/products.controller")


router.route("/create-product").post(createProduct)
router.route("/all-products").get(getAllProducts)


module.exports=router;