const express=require("express");
const app=express();
const http = require("http");
const dotenv=require("dotenv");
const cors=require("cors")

dotenv.config();
const port=process.env.PORT||8080;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended:false
}));

//add the routes
const authRouter=require("./routes/auth/authentication.routes");
const productRouter=require("./routes/products/products.routes")
const emergencyRouter = require("./routes/emergency/emergency.routes");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});
app.use("/authentication",authRouter);
app.use("/products",productRouter)
app.use("/emergencies", emergencyRouter);

server.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});
