const express = require('express')
const roleRouter = express.Router()
const jwt = require("jsonwebtoken")
const {authorise} = require("../middleware/authorise")



// Admin && User
roleRouter.get("/buyProduct",authorise(["admin","user"]),(req,res)=>{
    res.send("You can buy Products")
})


//Admin
roleRouter.get("/editProduct",authorise(["admin"]),(req,res)=>{
    res.send("You can Edit Products")
})
  
//Users
roleRouter.get("/reviewProduct",authorise(["user"]),(req,res)=>{
    res.send("You can buy and add  ")
})


module.exports ={
    roleRouter
}