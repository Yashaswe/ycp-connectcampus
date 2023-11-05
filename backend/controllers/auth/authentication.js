const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Prisma=require("../../utils/prisma")
const { StreamChat } = require("stream-chat");

const STREAM_API_KEY = "evun5c3j27ny";
const STREM_PRIVATE_KEY = "774znarndx4ws2tsd7qb6zx8eazddnzg7qh5m7x68sf7r9bg7z42zz3h9uje59qr";
const streamChat = StreamChat.getInstance(STREAM_API_KEY, STREM_PRIVATE_KEY);

const TOKEN_USER_ID_MAP = new Map();

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

    const exisitingUsers = await streamChat.queryUsers({ id: user.id });
    if (exisitingUsers.users.length > 0) {
      return res.status(400).send("User id already taken for streamChat");
    }

    streamChat.upsertUser({ id: user.id, name: user.name });
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

          const token = streamChat.createToken(foundUser.id);
          TOKEN_USER_ID_MAP.set(token, foundUser.id);
        }else{
            res.status(403);
            res.json({
                "message":"Password Does not match!"
            })
        }
    }
}


module.exports={loginUser,createUser}
