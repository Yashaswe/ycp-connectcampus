const express=require("express");
const router=express.Router();

const {createUser,loginUser,getUserProfile}=require("../../controllers/auth/authentication")


router.route("/login").post(loginUser)


router.route("/signup").post(createUser)

router.route("/user").post(getUserProfile)


module.exports=router;