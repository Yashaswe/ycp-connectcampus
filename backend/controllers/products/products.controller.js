const Prisma=require("../../utils/prisma");
const verifyJWT=require("../../utils/verifyJWT");

const createProduct=async(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const token=req.body.token;
    const category=req.body.category;
    const location=req.body.location

   
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
                    location:location,
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
    
    const userId=verifyJWT(req.body.token)
    
    const products=await Prisma.product.findMany(
        {
            where:{
                NOT:{
                    userId:userId
                }
            },
            include:{
               author:true 
            }
        }
    );

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

const getAcceptedProducts=async(req,res)=>{
    const products = await Prisma.product.findMany({
        where:{
            isAccepted:true
        }
    })

    res.status(200)
    res.json({
        "message":products
    })
}

//update the products

const updateProducts=async(req,res)=>{
    const productId=req.body.id;
    const token=req.body.token;
    const userId=verifyJWT(token)
    
    const currUser=await Prisma.user.findFirst({
        where:{
            id:userId
        }
    })

    const product=await Prisma.product.findFirst({
        where:{
            id:productId
        }
    })


    const user=await Prisma.user.findFirst({
        where:{
            id:product.userId
        }
    })

   

   
    if(productId){
        const updatedProduct=await Prisma.product.update({
            where:{
                id:productId
            },
            data:{
                isAccepted:true
            }
        })

        const order=await Prisma.order.create({
            data:{
                productId:product.id,
                buyerId:currUser.id
            }
        })

        res.status(200)
        res.json({
            "buyer":currUser.email,
            "seller":user.email,
            "message":"Successfully updated the product!"
        })
    }else{
        res.status(401);
        res.json({
            "message":"No Products"
        })
    }
}

//delete the products

module.exports = { createProduct,getAllProducts ,updateProducts,getAcceptedProducts}
