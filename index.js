const http = require("http");
const fs = require("fs");
const url = require("url");







const myServer = http.createServer((req,res)=>{
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
        // res.end("Hello From Server Again");
    })
    // res.end("Hello from server");
});

myServer.listen(8000,()=> console.log("server started!"));