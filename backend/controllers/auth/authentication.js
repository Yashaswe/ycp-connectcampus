const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const cloudinary=require("cloudinary").v2;

const images=[
    "https://cdn0.iconfinder.com/data/icons/hr-business-and-finance/100/face_human_blank_user_avatar_mannequin_dummy-512.png",
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png",
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png",
    "https://cdn.pixabay.com/photo/2012/04/01/18/02/golf-23794_1280.png",
]

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const Prisma=require("../../utils/prisma")

const createUser=async(req,res)=>{
    console.log(req.body)
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password
    const randomNumer=Math.floor((Math.random()*10)%4)
    const coverImage=images[randomNumer]

   
  
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