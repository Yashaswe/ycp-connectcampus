const express=require("express");
const router=express.Router();

const {createUser,loginUser}=require("../../controllers/auth/authentication")


router.route("/login").post(loginUser)


router.route("/signup").post(createUser)


module.exports=router;