const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio= require("cheerio");
const request= require("request");

let data=[];




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
    let tempdate= new Date()-1;
    let date = tempdate.

    $.ajax({
        method: "GET",
        url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&where=reported_date eq '"+day+"' and reporting_country_territory eq 'Malawi'"
    })
        .done(function (msg) {
            let temp = msg;
           console.log(temp);
        });
    

    console.log(data[0]);
    res.render("world",{
        title: "Covid-19 Current World Situation",
        country: data
        

    });

});

router.get("/countrySpec/:id",(req,res)=>{
    $.ajax({
    method: "GET",
    url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&where=reporting_country_territory eq 'Malawi'"
})
    .done(function (msg) {
        let temp = msg;
       console.log(temp);
    });

   
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
            
        });


})
module.exports =router;