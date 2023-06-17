

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const fs = require("fs")
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const cookieparser = require("cookie-parser")
userRouter.use(cookieparser())
const { Console } = require("console")


 

//Register==================================================================>

userRouter.post("/register",async(req,res)=>{

    const {name,email,password} = req.body
    const userpresent = await UserModel.findOne({email})
    if(userpresent){
        res.json("Already exist,Please login")
    }else{
    try {
        bcrypt.hash(password, 8, async(err, hash)=>{
          
         const user = new UserModel({name,email,password:hash,age,role})
        await user.save()
        res.json("Hurry, User has been created !!")
        })
        
    }catch (error) {
        console.log(Error)
        res.json("error in register")
    }
}
})
///////





//Login====================================================================>

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    
try {
    const user =await UserModel.findOne({email})
 
    if(user){
        const hashed_pass = user.password
        bcrypt.compare(password,hashed_pass,(err,result)=>{
            if(result){
           
                const token = jwt.sign({"userID":user._id},'masai',{expiresIn:"1h"})
                const refreshtoken = jwt.sign({"userID":user._id,role:user.role},'kasai',{expiresIn:"7d"})
                res.cookie("token",token,{httpOnly:true,maxAge:1000000}).cookie("refreshtoken",refreshtoken,{httpOnly:true,maxAge:1000000})
             res.json({"msg":"Login Successfully","token":token,"refreshtoken":refreshtoken})
            
            }else{
                res.json({"msg":"Login Failed"})
            }
        })
    }else{
        res.json({"msg":"Result Not Correct"})
        console.log(err)
    }
} catch (error) {
   
    console.log(error)
    res.send({"msg":"Login failed Error in try"})
}   
 })



  

//Logout==========================================================================================>
   
// userRouter.get("/logout",async(req,res)=>{
//     const token = req.cookies.token
//     console.log(token)
//     // let token  = await redis.get("token")
//     // const refreshtoken = req.cookies.refreshtoken    
//     try {
//         // const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
//         // blacklisteddata.push(token)
//         // fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisteddata))
//         //  res.clearCookie("token").clearCookie("refreshtoken")
//         await client.LPUSH("blacktoken", token);
//         const data = await client.LRANGE("blacktoken",0,-1)
        
//         //  redis.lpush()
                        
//         res.send({"msg":"Logout Successfully"})
//     } catch (error) {
//         res.json("error in logout")
//         console.log("error in logout")
//     }       
// })





module.exports ={
    userRouter
}










/////////////////////////////////////////////////////////////////////////////




