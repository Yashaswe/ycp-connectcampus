const Prisma=require("../../utils/prisma");
const verifyJWT=require("../../utils/verifyJWT");

const createProduct=async(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const token=req.body.token;
    const category=req.body.category;


    const userId=verifyJWT(token)
    if(userId){
        //find the user
        const currUser=await Prisma.user.findFirst({
            where:{
                id:userId
            }
        })

        if(currUser){
            const productCreated=await Prisma.product.create({
                data:{
                    title:title,
                    description:description,
                    price:price,
                    author:{
                        connect:{
                            id:currUser.id
                        }
                    },
                    category:category
                }
            })
            res.status(200);
            res.json({
                "message":"successfully created the post"
            })
        }else{
            res.status(401)
            res.json({
                "message":"Not Authorized"
            })
        }

    }else{
        res.status(401);
        res.json({
            "message":"Not Authorized!"
        })
    }
    
}


const  getAllProducts=async(req,res)=>{
    console.log("Printing.....")
    const products=await Prisma.product.findMany();
    res.status(200);
    res.json({
        "message":products
    })
}

const getProductsByCategory=async(req,res)=>{
    const category=req.query.category;
    if(category){
        const products=await Prisma.product.findMany({
            where:{
                category:category
            }
        })
        res.status(200)
        res.json({
            "products":products
        })
    }else{
        res.status(401);
        res.json({
            "message":"Category is required"
        })
    }
}

//update the products

//delete the products

module.exports = { createProduct,getAllProducts }
