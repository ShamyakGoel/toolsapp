// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/dbconnect"
import User from "../../../models/User"
import Note from "../../../models/Note"
const handler = async (req, res)=>{
    // if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
        const {emailid,title,note} = req.body
        if(!emailid || emailid == ""){
            console.log("emailid")
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else if(!title || title == ""){
            console.log("title")
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else if(!note || note == ""){
            console.log("note")
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        else{
            try{
            let user = await User.findOne({email: emailid});
            if(!user){
                return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
            }
            if(user.notesCreated >= user.notesCreatedAllowed){
                return res.status(429).json({err: "You have reached your notes creating limit", success:false})
            }
            
            let usernote = new Note({
                title,
                note,
                userAssociated: emailid
            })
            await usernote.save();
            let notesarray = user.notes;
            notesarray.push(usernote._id);
            user = await User.findOneAndUpdate({email: emailid}, {notes:notesarray, $inc: {notesCreated: 1}}, {new: true});
            return res.status(200).json({user, usernote, success:true});
        }catch(error){
            console.log(error)
            return res.status(500).json({error, success:false});
        }
        }
    }
    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        return res.status(200).json({});
    }
// }
else{
    res.send();
}
    // res.status(200).json({ name: 'John Doe' })
}



    export default connectDb(handler);
