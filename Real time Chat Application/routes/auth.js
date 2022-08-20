const router=require('express').Router();
const User=require('../models/User')
const jwt=require('jsonwebtoken');
router.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    const newUser=new User({username,email,password})
    try {
        const SavedUser=  await newUser.save()
        console.log(SavedUser)
        res.status(201).json(SavedUser)
    } catch (error) {
        console.log("This is the error :"+error);
        res.status(500).json(error)

    }
})
 
router.post('/login',async(req,res)=>{
    try{    
        const {username,password}=req.body
        const user=await User.findOne({username})
        if(!user){
            res.status(401).send("wrong Cardenials");
            
        } else{
            const accessToken=jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin,
        },process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
            const{password,...others}=user._doc;
            res.status(200).json({others,accessToken})
        }
    }catch(err){
        console.log("This is the error :"+error);
        res.status(500).json(error);
    }
})

module.exports=router