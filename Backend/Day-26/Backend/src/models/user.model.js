const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        lowercase:[true ,"username should be lowercase"],
        unique:[true,"username should be unique"]
    },
    password:{
        type:String,
        required:[true, "password required"],
        select:false
    },
    email:{
        type:String,
        required:[true,"email required"],
        lowercase:true,
        unique:[true,"email required"]
    }
})
const userModel = mongoose.model("user" ,userSchema)

module.exports = userModel;