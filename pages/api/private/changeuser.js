// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User"
import connectDb from "../../../middleware/dbconnect"
import jwt from "jsonwebtoken"
const handler =  async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
        if(req.method == "POST"){
            if(req.body.isLoginFirstTime){
                console.log('HI HI HI BYE BYE BYE')
                let mail = req.body.name + '@toolsapp.site';
                let allusers = await User.find();
                allusers.forEach(user => {
                    while(user.mailAddress === mail){
                        let no = Math.floor(Math.random() * 100);
                        mail = req.body.name + String(no) + '@toolsapp.site';
                    }
                });
                let token = JSON.parse(req.body.token).authtoken
                let id = jwt.verify(token, process.env.JWT_KEY)
                let user = await User.findById(id.id)
                if(!user){
                    return res.status(406).json({success:false,error: "User not exists"})
                }
                else{
                    user = await User.findByIdAndUpdate(id.id, {name: req.body.name, mailAddress: mail, isLoginFirstTime: false})
                    return res.status(200).json({success:true,msg: "Details changed"})
                }
            }
            else{
            let token = JSON.parse(req.body.token).authtoken
            console.log("token: "+token)
            let id = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findById(id.id)
            if(!user){
                return res.status(406).json({success:false,error: "User not exists"})
            }
            else{
                console.log(req.body)
                user = await User.findByIdAndUpdate(id.id, {name: req.body.name}, {new:true})
                return res.status(200).json({success:true,msg: "Details changed"})
            }
        }
        }
        
        else{
            return res.status(405).json({success:false,error: "This method is not allowed"})
        }
    

}
else{
    res.send()
}
}

export default connectDb(handler)