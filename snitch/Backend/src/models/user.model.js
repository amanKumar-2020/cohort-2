import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password:{
        type : String,
        required : true     
    },
    contact:{
        type : String,
        required : true
    },
    role:{
        type : String,
        enum:["buyer","seller"],
        default : "buyer"
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User",userSchema);

export default User;