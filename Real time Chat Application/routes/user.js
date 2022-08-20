const User = require('../models/User');

const router=require('express').Router();
router.put("/:id",async(req,res)=>{

        const updatedUser= await User.findById(req.params.id,(err,doc)=>{
            if(!err){
                res.status(200).json("find");
            }else{
                res.status(401).json("not found")
            }
        }
            );
     
})

module.exports=router