const express = require("express");
const fs = require('fs')

const mongoose = require('mongoose');
const { connectMongoDb } = require('./connection')
const userRouter = require('./routes/user')
const {logReqRes} = require("./middlewares")



const app = express(); // app is like handler function now
const PORT = 8000;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/youtubApp1')
.then(
    ()=> console.log("Mongodb Connected")
);

//middlaware - plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"))

app.use("/user",userRouter)
app.listen(PORT,() => console.log("Server Started!"))

