const multer=require("multer");
const cloudinary=require("cloudinary").v2;
const {Readable}=require("stream");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const storage=multer.memoryStorage();
const upload=multer({storage:storage});

const uploadImage=(req,res,next)=>{
    try{
        const response= cloudinary.uploader.upload_stream({
            folder:"Profile_Images"
        },(err,result)=>{
            if(err){
                res.status(500)
                res.send("Second Error");
            }else{
                req.cloudinaryUrl=result.url;
                next()
            }
        })

        Readable.from(req.file.buffer).pipe(response);
        
    }catch(err){
        res.status(404);
        res.json({
            "message":err
        });
        return;
    }
}


module.exports={upload,uploadImage};