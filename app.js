
const express = require("express");
const exphbs =require("express-handlebars");
//const bodyParser = require("body-parser");




//It loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

//load data
const generalController = require("./controllers/general");
//creation of app object
const app = express();

//bodyParser middleware
//app.use(bodyParser.urlencoded({extended:false}));

//express static middleware
app.use(express.static("public"));

//Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }
    next();
})

app.use("/",generalController);


const PORT = process.env.PORT||8080;

//Creates an Express Web Server that listens for incomin HTTP Requests
app.listen(PORT,()=>{
    console.log(`Your Web Server has been connected`);
    console.log(PORT);  

})







