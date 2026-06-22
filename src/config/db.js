const mongoose=require("mongoose")
function ConnectDB(){
mongoose.connect(
    process.env.MONGO_URI
).then(()=>{
    console.log("server is  connect DB")
})
.catch(err=>{
    console.log("Error connecting DB")
    process.exit(1)
})
}
module.exports=ConnectDB
