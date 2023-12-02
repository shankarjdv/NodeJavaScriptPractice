const express = require("express");
const users = require("./MOCK_DATA.json")

const app = express(); // app is like handler function now
const PORT = 8000;

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

app.get("/about",(req,res)=>{
    return res.send("Hello from About page")
});

app.listen(PORT,() => console.log("Server Started!"))

