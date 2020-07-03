const express = require("express");
const router = express.Router();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const GoogleCharts = require("google-charts");


let data=[];




/*GENERAL ROUTES*/
//Route to direct user to home page
router.get("/",(req,res)=>{
    let countryarr =[];
    
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    let year = yesterday.getFullYear(); // 년도
  let month = yesterday.getMonth() + 1;  // 월
  let date = yesterday.getDate();  // 날짜
  
  
  yesterday =year + '-' + month + '-' + date;
  
      $.ajax({
          method: "GET",
          url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reported_date eq '"+yesterday+"' and confirmed_cases gt 0&order=reporting_country_territory"
          
      })
          .done(function (msg) {
            let obj = JSON.parse(msg);
            let worldDeath=0;
            let worldConfirm=0;
            let worldNewConfirm=0;
           
           
            for(let i =0;i<obj.length;i++){
                let temp ={
                    countryName : obj[i].reporting_country_territory
                 
                };
                if(obj[i].confirmed_cases>0){
                    countryarr.push(temp);
                }
                worldDeath+=obj[i].total_deaths;
                worldConfirm+=parseInt(obj[i].confirmed_cases);
                worldNewConfirm+=obj[i].new_confirmed_cases;
           
            }
        
            console.log(countryarr)

            res.render("home",{
                title: "Covid-19 Current World Situation",
                countryarr: countryarr,
                worldDeath:worldDeath,
                worldConfirm:worldConfirm,
                worldNewConfirm:worldNewConfirm
                
        
            });
          });

});
router.get("/world",(req,res)=>{
    let countryarr =[];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    let year = yesterday.getFullYear(); // 년도
  let month = yesterday.getMonth() + 1;  // 월
  let date = yesterday.getDate();  // 날짜
  
  
  yesterday =year + '-' + month + '-' + date;
  
      $.ajax({
          method: "GET",
          url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reported_date eq '"+yesterday+"'&order=confirmed_cases DESC"
  
      })
          .done(function (msg) {
            let obj = JSON.parse(msg);
           
            for(let i =0;i<obj.length;i++){
                let temp ={
                    rank: 0,
                    countryName : obj[i].reporting_country_territory,
                    confirmed_cases : parseInt(obj[i].confirmed_cases),
                    new_confirmed_cases : obj[i].new_confirmed_cases,
                    total_deaths : obj[i].total_deaths,
                    recovered_cases: 0
                };
                if(temp.confirmed_cases>0){
                    countryarr.push(temp);
                }
           
            }
            countryarr.sort(function(a, b){ return b.confirmed_cases-a.confirmed_cases; });
            for(let i =0;i<countryarr.length;i++){
                countryarr[i].rank=i+1;

            }
            console.log(countryarr)
         

                res.render("world",{
                     title: "Covid-19 Current World Situation",
                     countryarr: countryarr
                
        
            
        });
          });
      
   

});
router.get("/howtowin",(req,res)=>{
    res.render("howtowin",{
        title: "Covid-19 Current World Situation",
        
   


});
});

router.get("/countrySpec/:name",(req,res)=>{
   console.log(req.params.name);

   let countryarr =[];
   let yesterday = new Date();
   yesterday.setDate(yesterday.getDate()-1);
   let year = yesterday.getFullYear(); // 년도
 let month = yesterday.getMonth() + 1;  // 월
 let date = yesterday.getDate();  // 날짜

 
 yesterday =year + '-' + month + '-' + date;
 
    $.ajax({
        method: "GET",
        url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reported_date,reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reporting_country_territory eq '"+req.params.name+"'"

    })
        .done(function (msg) {
          let obj = JSON.parse(msg);
         
         let temp={
                  countryName : req.params.name,
                  confirmed_cases : parseInt(obj[0].confirmed_cases),
                  new_confirmed_cases : obj[0].new_confirmed_cases,
                  total_deaths : obj[0].total_deaths,
                
           
         
          }
          countryarr.push(temp);
          console.log(countryarr);
  
          $.ajax({
            method: "GET",
            url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reported_date,reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reporting_country_territory eq '"+req.params.name+"'"
    
        })
            .done(function (msg) {
                let cumuldata =[];
                let newdata =[];
                let deathdata =[];
              let obj = JSON.parse(msg);
              let day =0;
              
              for(let i =obj.length-1;i>0;i--){
                 
              
                let tempcon =new Array( 
                    day,
                    parseInt(obj[i].confirmed_cases)
                );
                cumuldata.push(tempcon);
                let tempcon2 =new Array( 
                    day,
                    obj[i].new_confirmed_cases
                );
                newdata.push(tempcon2);
                let tempcon3 =new Array( 
                    day,
                   obj[i].total_deaths
                );
                deathdata.push(tempcon3);
              
              
                day++;
            }
       console.log(cumuldata);
       console.log(newdata);
       console.log(deathdata);
              res.render("countrySpec",{
                   title: "Covid-19 Current World Situation",
                   countryarr: temp,
                   cumuldata:cumuldata,
                   newdata:newdata,
                   deathdata:deathdata
              });
            });
        });

})
router.post("/countrySpec:name",(req,res)=>{
  
 console.log("me");
 console.log(req.params.menu);
    let countryarr =[];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    let year = yesterday.getFullYear(); // 년도
  let month = yesterday.getMonth() + 1;  // 월
  let date = yesterday.getDate();  // 날짜
 
  
  yesterday =year + '-' + month + '-' + date;
  
     $.ajax({
         method: "GET",
         url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reported_date,reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reporting_country_territory eq '"+req.params.countrymenu+"'"
 
     })
         .done(function (msg) {
           let obj = JSON.parse(msg);
          
          let temp={
                   countryName : req.body.countrymenu,
                   confirmed_cases : parseInt(obj[0].confirmed_cases),
                   new_confirmed_cases : obj[0].new_confirmed_cases,
                   total_deaths : obj[0].total_deaths,
                 
            
          
           }
           countryarr.push(temp);
           console.log(countryarr);
   
           $.ajax({
             method: "GET",
             url: "https://api.namara.io/v0/data_sets/284444a6-86b5-495e-9657-99bdad85ea7a/data/en-3?api_key=17dad579cde818c61dfd734b3d351a90f1232bd3897337d299c5969f6c283c63&select=reported_date,reporting_country_territory,confirmed_cases,new_confirmed_cases,total_deaths&where=reporting_country_territory eq '"+req.params.name+"'"
     
         })
             .done(function (msg) {
                 let cumuldata =[];
                 let newdata =[];
                 let deathdata =[];
               let obj = JSON.parse(msg);
               let day =0;
               
               for(let i =obj.length-1;i>0;i--){
                  
               
                 let tempcon =new Array( 
                     day,
                     parseInt(obj[i].confirmed_cases)
                 );
                 cumuldata.push(tempcon);
                 let tempcon2 =new Array( 
                     day,
                     obj[i].new_confirmed_cases
                 );
                 newdata.push(tempcon2);
                 let tempcon3 =new Array( 
                     day,
                    obj[i].total_deaths
                 );
                 deathdata.push(tempcon3);
               
               
                 day++;
             }
        console.log(cumuldata);
        console.log(newdata);
        console.log(deathdata);
               res.render("countrySpec",{
                    title: "Covid-19 Current World Situation",
                    countryarr: temp,
                    cumuldata:cumuldata,
                    newdata:newdata,
                    deathdata:deathdata
               });
             });
         });
 
 })
module.exports =router;