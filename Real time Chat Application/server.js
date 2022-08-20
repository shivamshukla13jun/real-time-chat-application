// Import files
const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const UserRoute=require('./routes/user')
const UserAuth=require('./routes/auth');
const { Server } = require('socket.io');
const io= new Server(server);
dotenv.config();
// Connection
mongoose.connect(process.env.MONGO_URI
).then(()=>console.log("Db COnnected Successful"))
.catch((err)=>{
    console.log(err);
})

// handlebars
// app.engine('handlebars',exphbs.engine({extname:'.handlebars',defaultLayout:'main'}));
// app.set('view engine','handlebars')


// Routes
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/user',UserRoute)
app.use('/api/auth',UserAuth)
// ServerListen


const port=process.env.PORT
server.listen( port || 5000,()=>{
    console.log(`Server is Running on ${port}`);
})

io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})
