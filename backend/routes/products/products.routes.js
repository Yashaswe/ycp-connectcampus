const express=require("express");
const router=express.Router();

const {createProduct, getAllProducts, getAcceptedProducts, updateProducts}=require("../../controllers/products/products.controller")


router.route("/create-product").post(createProduct)
router.route("/all-products").get(getAllProducts)
router.route("/accepted-products").get(getAcceptedProducts)
router.route("/update-product").post(updateProducts)


module.exports=router;