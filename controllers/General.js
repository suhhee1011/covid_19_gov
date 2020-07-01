const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio= require("cheerio");
const request= require("request");

let data=[];


request('https://www.worldometers.info/coronavirus/#countries', function(err,response, body){
   
    let obj={};
    const $ = cheerio.load(body);
    
  
    


});
 


/*GENERAL ROUTES*/
//Route to direct user to home page
router.get("/",(req,res)=>{
    console.log("me");
   
    console.log(data[0]);
    res.render("home",{
        title: "Covid-19 Current World Situation",
        country: data[0]
        

    });

});
router.get("/world",(req,res)=>{

    console.log(data[0]);
    res.render("world",{
        title: "Covid-19 Current World Situation",
        country: data
        

    });

});

router.get("/countrySpec/:id",(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        
       let stockcheck = function(){
            if(product.quantity>0){
                return true;
            }
            else{
                return false;
            }
        

        }
        console.log("b");
        res.render("productDesc",{
            id: product._id,
            name:product.name,
            price:product.price,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            bestseller:product.bestseller,
            picture:product.picture,
            stockcheck:product.quantity>0
            
        })

    })
    .catch(err=>console.log(`Error -get-productdesc-findbyID: ${err}`))

})
module.exports =router;