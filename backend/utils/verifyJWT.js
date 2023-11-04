const jwt=require('jsonwebtoken')

const verifyJWT=(token)=>{
    try{
        const decoded=jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        )
        return decoded["_id"]
    }catch(err){
        return null;
    }
    
}

module.exports=verifyJWT