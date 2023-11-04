const express=require('express')

const router=express.Router();

const {initiate,getRecentConversation}=require("../../controllers/chat/chat")

router.route("/").get(getRecentConversation)
router.route("/initiate").post(initiate)


module.exports=router