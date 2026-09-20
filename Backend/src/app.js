const express = require("express")        // express module ko node_module se import karta hai
const cookieParser = require("cookie-parser")  // cookie-parser module ko import kiya hai
const cors = require("cors")

const app = express()                     // create express application object, express function ko call krke
app.use(express.json())                   // incoming request ko json format me parse krne ke liye middleware use kiya
app.use(cookieParser())                   // cookie-parser middleware ko use kiya

app.use(cors({
    origin: "http://localhost:5173",     //React app ka URL
    credentials: true                // for cookies(tokens) ke saath deal krenge na 
}))

//Import all the routes here
const authRouter = require("./routes/auth.routes")     // Imported the authRouter
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)            // Assemble the authRouter on the /api/auth path
app.use("/api/interview", interviewRouter)

module.exports = app