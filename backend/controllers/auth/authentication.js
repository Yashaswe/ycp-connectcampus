const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const Prisma=require("../../utils/prisma")

const createUser=async(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password

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
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedPassword
            }
        })
    
        res.status(200)
        res.json({
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
                'expiresIn':'15m'
            });

            const refreshToken=jwt.sign({
                _id:foundUser.id
            },process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:"30d"
            })

            const updatedUser=await Prisma.user.update({
                where:foundUser.id
            },
            {
                data:{
                    refreshToken:refreshToken
                }
            })
            
            res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000*30});
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