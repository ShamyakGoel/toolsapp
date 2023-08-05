// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User"
import connectDb from "../../../middleware/dbconnect"
// import bcrypt from "crypto-js"
import jwt from "jsonwebtoken"
const handler =  async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
        if(req.method == "POST"){
            const {id} = req.body
            console.log(req.body)
            let user = await User.findById(id)
            if(!user){
                return res.status(406).json({success:false,error: "User not exists"})
            }
            let encryptedpass = "****************"
            res.status(200).json({success:true, user, pass: encryptedpass})
        }
        
        else{
            return res.status(405).json({error: "This method is not allowed"})
        }
    

}
else{
    res.send()
}
}

export default connectDb(handler)