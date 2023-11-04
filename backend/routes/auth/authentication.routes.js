const express=require("express");
const router=express.Router();

const {createUser,loginUser}=require("../../controllers/auth/authentication")
const {upload,uploadImage}=require("../../middleware/imageUploader");


router.route("/login").post(loginUser)


router.route("/signup").post(upload.single('image'),uploadImage,createUser)


module.exports=router;