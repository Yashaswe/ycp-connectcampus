const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const cloudinary=require("cloudinary").v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const Prisma=require("../../utils/prisma")

const createUser=async(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password
    const coverImage=req.cloudinaryUrl


    const hashedPassword= await bcrypt.hash(password,10)
    const foundEmail=await Prisma.user.findFirst({
        where:{
            email:email
        }
    })

    if(foundEmail){
        res.status(403)
        res.json({
            "message":"Email Already Exists!"
        })

    }else{
        const user=await Prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
                profileImage:coverImage
            }
        })

        //Generating an access-token
        const accessToken=jwt.sign({
            _id:user.id,
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            'expiresIn':'30d'
        });
        res.status(200)
        res.json({
            "token":accessToken,
            "message": "Successfully Created an Account"
        })
    }

    
    
}

const loginUser=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const foundUser=await Prisma.user.findFirst({
        where:{
            email:email
        }
    })

    if(!foundUser){
        res.status(403);
        res.json({
            "message":"User does not exist!"
        })
    }else{
        const comparePassword=await bcrypt.compare(password,foundUser.password);
        if(comparePassword){
            const accessToken=jwt.sign({
                _id:foundUser.id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                'expiresIn':'30d'
            });

            res.status(200);
            res.json({
                "accessToken":accessToken,
                "message":"Successfully Logged In"
            })
        }else{
            res.status(403);
            res.json({
                "message":"Password Does not match!"
            })
        }
    }
}


module.exports={loginUser,createUser}