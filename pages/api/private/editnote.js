// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/dbconnect"
import User from "../../../models/User"
import Note from "../../../models/Note"
const handler = async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
        const {emailid,title,note,noteid} = req.body
        if(!emailid || emailid == ""){
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else if(!title || title == ""){
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else if(!note || note == ""){
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else if(!noteid || noteid == ""){
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else{
            let user = await User.findOne({email: emailid});
            if(!user){
                return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
            }
            let usernote = await Note.findByIdAndUpdate(noteid, {title, note}, {new:true})
            return res.status(200).json({user, usernote, success:true});

        }
    }
    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        return res.status(200).json({});
    }
    // res.status(200).json({ name: 'John Doe' })
}
else{
    res.send()
}
}


export default connectDb(handler);