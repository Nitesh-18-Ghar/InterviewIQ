require("dotenv").config()                 // .env file se environment variables ko load karta hai
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()


app.listen(3000, () => {
    console.log("Server Is Running On Port 3000")
})