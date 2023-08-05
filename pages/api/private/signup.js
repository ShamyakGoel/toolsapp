// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User"
import connectDb from "../../../middleware/dbconnect"
import bcrypt  from "bcryptjs";
import SignupReq from "../../../models/SignupReq";
const handler =  async (req, res)=>{
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
        return res.status(200).json({});
    }
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
            let user = await User.findOne({email:req.body.email})
            if(user){
                return res.status(406).json({success:false,error: "User already exists"})
            }
            const {email} = req.body
            try{
            user = new User({email,password:bcrypt.hashSync(req.body.pass, 10), mailAddress: '', isLoginFirstTime: true})
            let signupreq = await SignupReq.findOneAndDelete({reqid: req.body.reqid});
            await user.save()

            return res.status(200).json({success:true, user, signupreq})
        }catch(e){
            console.log(e)
            return res.status(500).json({error: "error", err:e.toString()})
        }
        
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