const express=require("express");
const dotenv=require("dotenv");
const cookieParser = require("cookie-parser");



dotenv.config();
const app=express();

const verifyJWT= require("./middleware/verifyJWT")

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

app.use(cookieParser());

const authRouter=require("./routes/auth/authentication.routes");
const productRouter=require("./routes/products/products.routes")

const port=process.env.PORT||8080;


//add the routes
app.use("/authentication",authRouter);
app.use("/products",productRouter)

app.use(verifyJWT)
app.get("/products",(req,res)=>{
    res.status(200);
    res.json({
        "message":"This requires authentication"
    })
})


app.listen(port,()=>{
    console.log(`Server running at Port ${port}`);
})



