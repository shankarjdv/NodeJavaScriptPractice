const User = require("../models/user")


async function handleGetAllUsers(req,res){
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}
async function handleGetUserById (req,res){
    // const id = Number(req.params.id);
    const allDBUsers = await User.findById(req.params.id);
    // const user =allDBUsers.find((user)=>user.id === id);
    return res.json(user);
   
}
async function handleUpdateUserById(req,res){
    const result = await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"})
    return res.json({data: result, status: "Success1"});
}

async function handleDeleteUserById(req,res){
    const result = await User.findByIdAndDelete(req.params.id,{lastName: "Changed"})
    return res.json({data: result, status: "Success2"});
}

async function handleCreateNewUser(req,res){
    const body = req.body;
    console.log("data====>",body)
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,

    });
    console.log("result===> result")
    return res.status(201).json({status: "sucess"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}