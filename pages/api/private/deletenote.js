// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/dbconnect"
import Note from "../../../models/Note"
import User from "../../../models/User"
const handler = async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "DELETE"){
        try{
        const {noteid,emailid} = req.body
        if(!noteid || noteid == ""){
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        
        const note = await Note.findById(noteid);
        if(!note){
            return res.status(400).json({success:false, error: "Note not found"})
        }
        if(!emailid || emailid == ""){

            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        let user =await User.findOne({email: emailid})
        let n = user.notes;
        let jk = user.notes.find((i)=>{
            if(String(i) == noteid){
                return noteid
            }
        })
        if(jk == undefined){
            console.log("kaak")
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})

        }
        await Note.findByIdAndDelete(noteid)
        if(user.notesCreated == 0){
            let index = n.indexOf(jk)
            n.splice(index, 1)
            await User.findOneAndUpdate({email: emailid}, {notes: n})

        return res.status(200).json({note,success:true});

        }
        else{
            let index = n.indexOf(jk)
            n.splice(index, 1)
            await User.findOneAndUpdate({email: emailid}, {$inc :{notesCreated: -1}, notes: n})
            await User.findOneAndUpdate({email: emailid}, {$inc :{notesCreated: -1}, notes: n})
            
        }   
        return res.status(200).json({note,success:true});
    }catch(error){
        console.log(error)
        return res.status(404).json({success:false});
    }
    }
    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.status(200).json({});
    }
    // res.status(200).json({ name: 'John Doe' })
}
else{
    res.send()
}
}


export default connectDb(handler);