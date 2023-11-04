const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors")
const http=require("http")



dotenv.config();
const app=express();


app.use(cors({
    origin:["*"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

const authRouter=require("./routes/auth/authentication.routes");
const productRouter=require("./routes/products/products.routes")

const port=process.env.PORT||8080;


//add the routes
app.use("/authentication",authRouter);
app.use("/products",productRouter)



const server=http.createServer(app);
server.listen(port)

server.on("listening",()=>{
    console.log(`Listening on port:${port}`)
})



