const mongoose=require("mongoose")
async function ConnectDB(){
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("server is  connect DB")
} catch (err) {
    console.log("Error connecting DB", err.message)
    process.exit(1)
}
}
module.exports=ConnectDB
