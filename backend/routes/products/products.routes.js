const express=require("express");
const router=express.Router();

const {createProduct}=require("../../controllers/products/products.controller")
const verifyJWT = require("../../middleware/verifyJWT")

router.route("/create-product").post(verifyJWT, createProduct)


module.exports=router;