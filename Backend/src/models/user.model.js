const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({        //Schema = Shape of the document means kaisa kaisa Data rahega 
    username : {
        type : String,
        unique : [true, "Username Already Taken!"],       // username unique honi chahiye agar same hua to warning(error) aayega ("" wala)
        required : [true, "Username is Required!"],
    },

    email : {
        type : String,
        unique : [true, "Account Already Exist With This Email!"],
        required : [true, "Email is Required!"],
    },

    password : {
        type : String,
        required : [true, "Password is Required!"],
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel