const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs')

const app = express(); // app is like handler function now
const PORT = 8000;

//middlaware - plugin
app.use(express.urlencoded({extended: false}));

app.get("/api/users",(req,res)=>{
    return res.json(users);
});
app.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html)
});

app
.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user =users.find((user)=>user.id === id);
    return res.json(user);
   
})
.put((req,res)=>{
    // edit with id
    return res.json({status: "pending"});
})
.patch((req,res)=>{
    return res.json({status: "pending"});
})
.delete((req,res)=>{
    return res.json({status: "pending"});
});


app.post("/api/users",(req,res)=>{
    const data = req.body;
    console.log("data====>",data)
    users.push({...data,id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status: "success", id: users.length});
    })

    // return res.json({status: "pending"});
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About page")
});

app.listen(PORT,() => console.log("Server Started!"))

