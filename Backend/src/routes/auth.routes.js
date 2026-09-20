const { Router } = require("express")      // Directly access the Router method from express
const authController = require("../controllers/auth.controllers")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()        // Call the Router to create a router instance authRouter


// Route Path - POST /api/auth/register
authRouter.post("/register", authController.registerUser)


// Route Path - POST /api/auth/login
authRouter.post("/login", authController.loginUser)


// Route Path - GET /api/auth/logout
authRouter.get("/logout", authController.logoutUser)


//Kaun-kuan ssa user logged in hai currently uska details
// Route Path - GET /api/auth/get-me
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter