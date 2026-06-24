const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")

async function userRegisterController(req,res)
{
const{email,password,name}=req.body
const isExists=await userModel.findOne({ email:email})

if(isExists)
{
    return res.status(422).json(
        {
            message:"User already exists",
            status:"failed"
        }
    )
}

const user=await userModel.create(
    {
        email,name,password
    }
)


}
module.exports={userRegisterController}