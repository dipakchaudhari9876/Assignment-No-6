const express = require('express')
require('./db/conn')
const dotenv = require('dotenv');
const todoRoute = require('./routes/blog')
dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(todoRoute)



app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(PORT,()=>{
    console.log(`Document is running on port${PORT}`)
})