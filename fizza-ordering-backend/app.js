const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const route = require('./Route/index')
const dotenv = require('dotenv')

dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', route)

const port =  process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    
}).then(() => {
    console.log('Connected to DataBase');
}).catch(err => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("Hello")
}).listen(port, () => {
    console.log(`Server is running ${port}`)
} )