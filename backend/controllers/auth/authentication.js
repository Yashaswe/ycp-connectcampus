const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Prisma=require("../../utils/prisma")
const verifyJWT=require("../../utils/verifyJWT");

const createUser = async (req,res) => {
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password
  const year=req.body.year;

  const hashedPassword= await bcrypt.hash(password,10)
  const foundEmail=await Prisma.user.findFirst({
    where:{
      email:email
    }
  })

  if (foundEmail) {
    res.status(403)
    res.json({
      "message":"Email Already Exists!"
    })

  } else {
    const user=await Prisma.user.create({
      data:{
        name:name,
        email:email,
        password:hashedPassword,
        year:year
      }
    });

    //Generating an access-token
    const accessToken=jwt.sign(
      {
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
                "userName":foundUser.name,
                "email":foundUser.email,
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


const getUserProfile=async(req,res)=>{
  const token=req.body.token;
  const userId=verifyJWT(token)
  if(userId){
    const currUser=await Prisma.user.findFirst({
      where:{
        id:userId
      }
    })
    res.status(200)
    res.json({
      "user":Prisma.user
    })
  }else{
    res.status(401);
    res.json({
      "message":"Not Authorized"
    })
  }
}


module.exports={loginUser,createUser,getUserProfile}
