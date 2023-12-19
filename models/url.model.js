const mongoose = require('mongoose');
// Creating Schema of url
const urlSchema = new mongoose.Schema({
    LongUrl:{
        type:String,
        required:true,
    },
    shortURL:{
        type:String,
        required:true
    },
    userID:{
        type:String
    }
},{
    versionKey:false
})

const UrlModel = mongoose.model("url",urlSchema);

module.exports={
    UrlModel
}