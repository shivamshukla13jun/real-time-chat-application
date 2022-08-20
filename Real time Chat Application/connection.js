const mongoose=require('mongoose');

const connection =mongoose.connect('mongodb://localhost:27017/Ecommerce'
).then(()=>console.log("Db COnnected Successful"))
.catch((err)=>{
    console.log(err);
})
module.exports=connection;