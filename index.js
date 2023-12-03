const express = require("express");
const fs = require('fs')

const mongoose = require('mongoose');



const app = express(); // app is like handler function now
const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtubApp1')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo error",err));


//Schema
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String
    },
     gender: {
        type: String
     }
},{ timestamps : true})

const User = mongoose.model('user',userSchema)


//middlaware - plugin
app.use(express.urlencoded({extended: false}));

app.get("/api/users",async(req,res)=>{
    const allDBUsers = await User.find({});

    return res.json(allDBUsers);
});
app.get("/users",async (req,res)=>{
    const allDBUsers = await User.find({});
    const html = `
    <ul>
    ${allDBUsers.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html)
});

app
.route("/api/users/:id")
.get(async(req,res)=>{
    // const id = Number(req.params.id);
    const allDBUsers = await User.findById(req.params.id);
    // const user =allDBUsers.find((user)=>user.id === id);
    return res.json(user);
   
})
.put((req,res)=>{
    // edit with id
    return res.json({status: "pending"});
})
.patch(async(req,res)=>{
    const result = await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"})
    return res.json({data: result, status: "Success1"});
})
.delete(async(req,res)=>{
    const result = await User.findByIdAndDelete(req.params.id,{lastName: "Changed"})
    return res.json({data: result, status: "Success2"});
});


app.post("/api/users",async (req,res)=>{
    const body = req.body;
    console.log("data====>",body)
    // users.push({...data,id: users.length+1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     return res.json({status: "success", id: users.length});
    // })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,

    });
    console.log("result===> result")
    return res.status(201).json({status: "sucess"});
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About page")
});

app.listen(PORT,() => console.log("Server Started!"))

