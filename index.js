const http = require("http");
const fs = require("fs");
const url = require("url");

const express = require("express");
const app = express(); // app is like handler function

app.get("/",(req,res)=>{
    return res.send("Hello from Home page")
});

app.get("/about",(req,res)=>{
    return res.send("Hello from About page")
});



function myHandler(req,res){
    if(req.url === "/favicon.ico") return res.end();
    const myurl = url.parse(req.url,true);
    const log = `${Date.now()}: ${req.url} new Request received\n`
    console.log("myurl==>",myurl)
    // non blocking operation
    fs.appendFile("log.txt",log,(err,data)=>{

        switch(myurl.pathname) { 
            case "/":
                res.end("Home Page");
                break;
            case "/contactMe":
                res.end("contact Me");
                break;
            case "/about":
                res.end("I am Shankar Jadhav");
                break;
            default :
                res.end("Hello From Server Again");

        }
    })
}


const myServer = http.createServer(app);

myServer.listen(8000,()=> console.log("server started!"));