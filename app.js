const express = require ('express');
const bodyparser = require ('body-parser');
const PORT = 8000;
const mongoose = require ('mongoose')
const userrouter = require ("./route/router.js")

const app = express();
app.use(express.json());
app.use(bodyparser.json());
require('dotenv').config();


mongoose.connect('mongodb+srv://sundhar:C9ONNhozoEKKKVem@cluster0.u4u3hnb.mongodb.net/mail')
.then((data)=>console.log("mongo db is connected"))
.catch((error)=>console.log("mongo db is not connected",error))



app.get('/',(req,res)=>{
    res.send("EMAIL SENDING")
})

app.use('/api',userrouter)

app.listen(PORT,()=>console.log("server is running on",PORT))