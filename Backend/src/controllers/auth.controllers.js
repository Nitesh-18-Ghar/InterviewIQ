const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")

// Route Path - POST /api/auth/register

async function registerUser(req, res) {
    const { username, email, password } = req.body      //destructuring object from request body

    if (!username || !email || !password) {
        return res.status(400).json({message: "Fill All The Credentials For Register!"})
    }

    // Check user is already exist or not
    const isUserExist = await userModel.findOne({
        $or: [ {username}, {email} ]        // "or" for koi ek se check kar skte ho existence
    })

    if (isUserExist) {
        return res.status(400).json({message: "User Already Exist With This Email Or Username!"})
    }

    const hash = await bcrypt.hash(password, 10)     //hashing the password with salt rounds = 10

    const user = await userModel.create({                                                                                                                       
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}            // Pura din mein e hi baar login karna padega fir seedha agle din
    )

    res.cookie("token", token)      //stored at cookies

    res.status(201).json({              // 201 - when creating new resource
        message: "User Registered Successfully!",
        user: {                              // Backend mein user v ek resource hi hai
            id: user._id,
            username:  user.username,
            email: user.email
        }
    })           
}

async function loginUser(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne( {email} )

    if(!user){
        return res.status(400).json({message: "Invalid Email Or Password!"})
    }

    const isPassValid = await bcrypt.compare(password, user.password)

    if(!isPassValid) {
        return res.status(400).json( {message: "Invalid Email Or Password!"})
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)  
    res.status(200).json({
        message: "User LoggedIn Successfully!",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUser(req, res) {
    const token = req.cookies.token         //login ke samay cookies ka token ko abhi ek token variable mein store kr liya hai
    
    if (token) {
        await tokenBlackListModel.create({ token })
    }

    res.clearCookie("token")
    res.status(200).json({ message: "User Logged Out Successfully!" })
}


//to get current logged in user details which will accessed by privately
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User Details Fetched Successfully!",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = { registerUser, loginUser, logoutUser, getMeController }