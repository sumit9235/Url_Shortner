const mongoose = require('mongoose');
require('dotenv').config()
const connection=mongoose.connect(process.env.MONGO_URI) //Connecting mongoDB database
module.exports={
   connection 
}