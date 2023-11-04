const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers["authorization"]
    if(!authHeader) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    try{
        const decoded=jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        )
        console.log(decoded)
        next()
    }catch(err){
        return null;
    }
    
}

module.exports=verifyJWT