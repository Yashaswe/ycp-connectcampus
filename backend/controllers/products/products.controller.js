const Prisma=require("../../utils/prisma")

const createProduct=async(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const token=req.body.token;
    
}

module.exports = { createProduct }