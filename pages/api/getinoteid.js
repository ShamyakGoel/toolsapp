// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/dbconnect"
// import bcrypt from "crypto-js"
const handler =  async (req, res)=>{
        if(req.method == "POST"){
            const {email} = req.body
            let user = await User.findOne({email})
            return res.status(200).json({success:true, user})
        }
        
        else{
            return res.status(405).json({error: "This method is not allowed"})
        }
    

}


export default connectDb(handler)