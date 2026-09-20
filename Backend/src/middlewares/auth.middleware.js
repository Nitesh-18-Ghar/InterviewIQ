const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token      // 1. Token Extraction

    if(!token){
        return res.status(401).json({ message: "Unauthorized Access!" })
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({ token })      // Check if the token is blacklisted or not

    if (isTokenBlackListed) {
        return res.status(401).json({ message: "Token is Invalid, Please Login Again!" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)          // 2. Verify The Token
        req.user = decoded

        next()      // If token is valid, call the next middleware
    }
    catch(err){
        return res.status(401).json({ message: "Invalid Token!" })
    }
    
}

module.exports = { authUser }