const app=require("./src/app")
const ConnectDB=require("./src/config/db")
require("dotenv").config()
ConnectDB()

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})