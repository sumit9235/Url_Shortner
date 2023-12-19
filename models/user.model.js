const mongoose = require('mongoose')
// Creating schema for users
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}