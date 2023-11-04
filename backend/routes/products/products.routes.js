const express=require("express");
const router=express.Router();

const {createProduct}=require("../../controllers/products/products.controller")


router.route("/create-product").post(createProduct)


module.exports=router;